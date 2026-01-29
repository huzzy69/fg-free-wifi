import React, { createContext, useState, useContext, useEffect, type ReactNode } from 'react';

interface SiteConfig {
    companyName: string;
    logoUrl: string;
    contactEmail: string;
    contactPhone: string;
    contactAddress: string;
    heroTitlePart1: string;
    heroTitleHighlight1: string;
    heroTitlePart2: string;
    heroTitleHighlight2: string;
    heroTitlePart3: string;
    heroSubtitle: string;
    heroStat1Value: string;
    heroStat1Label: string;
    heroStat2Value: string;
    heroStat2Label: string;
    heroStat3Value: string;
    heroStat3Label: string;
    services: ServiceItem[];
}

export interface ServiceItem {
    id: string;
    icon: string;
    title: string;
    description: string;
}

interface SiteConfigContextType {
    config: SiteConfig;
    updateConfig: (newConfig: Partial<SiteConfig>) => void;
}

const defaultConfig: SiteConfig = {
    companyName: 'Fakhir Group',
    logoUrl: '/src/assets/logo.png',
    contactEmail: 'fakhirgroupss.smtp@gmail.com',
    contactPhone: '+1 234 567 8900',
    heroTitlePart1: 'Wi-Fi for Users.',
    heroTitleHighlight1: 'Revenue',
    heroTitlePart2: 'for Businesses.',
    heroTitleHighlight2: 'Visibility',
    heroTitlePart3: 'for Advertisers.',
    heroSubtitle: 'We install premium Wi-Fi infrastructure for locations, providing seamless internet to users in exchange for high-impact, guaranteed ad views.',
    heroStat1Value: '50K+',
    heroStat1Label: 'Daily Users',
    heroStat2Value: '200+',
    heroStat2Label: 'Locations',
    heroStat3Value: '100%',
    heroStat3Label: 'View Rate',
    contactAddress: '123 Business Park, City, Country',
    services: [
        { id: '1', icon: 'MapPin', title: 'Pin-Point Advertising', description: 'Your ads on exact location' },
        { id: '2', icon: 'Wifi', title: 'Free Wifi', description: 'Free Internet services for all' },
        { id: '3', icon: 'BarChart3', title: 'Real-Time Survey', description: '100% Organic survey results' },
        { id: '4', icon: 'Users', title: 'Guest Wifi Management', description: 'Internet for your guests' },
        { id: '5', icon: 'TrendingUp', title: 'On-Demand Internet', description: 'Internet for your events' }
    ]
};

import { api } from '../api';

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export const SiteConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [config, setConfig] = useState<SiteConfig>(() => {
        const savedConfig = localStorage.getItem('siteConfig');
        return savedConfig ? JSON.parse(savedConfig) : defaultConfig;
    });

    useEffect(() => {
        const fetchRemoteConfig = async () => {
            try {
                const remoteConfig = await api.siteConfig.get();
                if (remoteConfig) {
                    setConfig(remoteConfig);
                }
            } catch (error) {
                console.error('Failed to fetch config:', error);
            }
        };
        fetchRemoteConfig();
    }, []);

    const updateConfig = async (newConfig: Partial<SiteConfig>) => {
        try {
            const updated = { ...config, ...newConfig };
            // Update local state first for instant feedback (Optimistic Update)
            setConfig(updated);
            // Then sync with simulated API
            await api.siteConfig.update(updated);
        } catch (error) {
            console.error('Failed to update config:', error);
        }
    };

    return (
        <SiteConfigContext.Provider value={{ config, updateConfig }}>
            {children}
        </SiteConfigContext.Provider>
    );
};

export const useSiteConfig = () => {
    const context = useContext(SiteConfigContext);
    if (context === undefined) {
        throw new Error('useSiteConfig must be used within a SiteConfigProvider');
    }
    return context;
};
