
// Simulated API Service to represent a backend connection
// In a real app, these would be fetch/axios calls to a real server

const SLEEP_TIME = 500; // Simulate network latency

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface Inquiry {
    id: string;
    type: 'advertiser' | 'location';
    name: string;
    businessName: string;
    city: string;
    phone: string;
    email?: string;
    message?: string;
    date: string;
    status: 'new' | 'contacted' | 'resolved';
}

export interface WifiLocation {
    id: string;
    name: string;
    address: string;
    contact: string;
    city: string;
    category: string;
    province: string;
}

// Initial seed data for Inquiries
const initialInquiries: Inquiry[] = [
    {
        id: 'inq_1',
        type: 'advertiser',
        name: 'Ahmed Khan',
        businessName: 'Khan Electronics',
        city: 'Lahore',
        phone: '0300-1234567',
        email: 'fakhirgroupss.smtp@gmail.com',
        message: 'I want to advertise my new store opening.',
        date: new Date(Date.now() - 3600000).toISOString(),
        status: 'new'
    },
    {
        id: 'inq_2',
        type: 'location',
        name: 'Sara Malik',
        businessName: 'The Coffee Bean',
        city: 'Islamabad',
        phone: '0321-7654321',
        email: 'fakhirgroupss.smtp@gmail.com',
        message: 'Interested in providing free wifi to my customers.',
        date: new Date(Date.now() - 86400000).toISOString(),
        status: 'contacted'
    }
];

// Initial seed data for Locations
const initialLocations: WifiLocation[] = [
    {
        id: 'loc_1',
        name: "FG-Free-Wifi Service Provider",
        address: "Federal B Area, Karachi",
        contact: "0300-1234567",
        city: "Karachi",
        category: "On-Demand Internet",
        province: "Sindh"
    },
    {
        id: 'loc_2',
        name: "FG-Free-Wifi Shahrah-e-Jahangir",
        address: "Shahrah-e-Jahangir, Federal B Area, Karachi",
        contact: "0300-1234567",
        city: "Karachi",
        category: "On-Demand Internet",
        province: "Sindh"
    },
    {
        id: 'loc_3',
        name: "FG-Free-Wifi Shifa Medical",
        address: "Shifa Medical, Block L North Nazimabad, Karachi",
        contact: "0300-1234567",
        city: "Karachi",
        category: "Healthcare",
        province: "Sindh"
    },
    {
        id: 'loc_4',
        name: "FG-Free-Wifi Gulshan-e-Iqbal",
        address: "Block 2 Gulshan-e-Iqbal, Karachi",
        contact: "0300-1234567",
        city: "Karachi",
        category: "On-Demand Internet",
        province: "Sindh"
    }
];

// Site Configuration
const initialConfig = {
    companyName: 'Fakhir Group',
    logoUrl: '/logo.png',
    contactEmail: 'fakhirgroupss.smtp@gmail.com',
    contactPhone: '+92 311 1133221',
    contactAddress: 'Suite 204, Business Center, Shahra-e-Faisal, Karachi',
    heroTitlePart1: 'FREE Wi-Fi for Users.',
    heroTitleHighlight1: 'Revenue',
    heroTitlePart2: 'for Businesses.',
    heroTitleHighlight2: 'Visibility',
    heroTitlePart3: 'for Advertisers.',
    heroSubtitle: '',
    heroStat1Value: '50K+',
    heroStat1Label: 'Daily Impressions',
    heroStat2Value: '200+',
    heroStat2Label: 'Active Locations',
    heroStat3Value: '100%',
    heroStat3Label: 'View Rate',
    services: [
        { id: '1', icon: 'MapPin', title: 'Pin-Point Advertising', description: 'Your ads on exact location' },
        { id: '2', icon: 'Wifi', title: 'Free Wifi', description: 'Free Internet services for all' },
        { id: '3', icon: 'BarChart3', title: 'Real-Time Survey', description: '100% Organic survey results' },
        { id: '4', icon: 'Users', title: 'Guest Wifi Management', description: 'Internet for your guests' },
        { id: '5', icon: 'TrendingUp', title: 'On-Demand Internet', description: 'Internet for your events' }
    ],
    adminUsername: 'admin',
    adminPassword: 'admin123'
};

export const api = {
    // Site Config API
    siteConfig: {
        async get() {
            await sleep(SLEEP_TIME);
            const data = localStorage.getItem('siteConfig');
            if (data === null) {
                localStorage.setItem('siteConfig', JSON.stringify(initialConfig));
                return initialConfig;
            }

            const parsed = JSON.parse(data);
            // Validation: if critical fields are missing (due to code updates), reset to initial
            if (!parsed.services || !parsed.heroStat1Value) {
                localStorage.setItem('siteConfig', JSON.stringify(initialConfig));
                return initialConfig;
            }

            return parsed;
        },
        async update(config: any) {
            await sleep(SLEEP_TIME);
            localStorage.setItem('siteConfig', JSON.stringify(config));
            return { success: true };
        }
    },

    // Inquiries API
    inquiries: {
        async getAll(): Promise<Inquiry[]> {
            await sleep(SLEEP_TIME);
            const data = localStorage.getItem('inquiries');
            if (data === null) {
                localStorage.setItem('inquiries', JSON.stringify(initialInquiries));
                return initialInquiries;
            }
            return JSON.parse(data);
        },
        async submit(inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>) {
            await sleep(SLEEP_TIME);
            const current = await this.getAll();
            const newInquiry: Inquiry = {
                ...inquiry,
                id: 'inq_' + Math.random().toString(36).substr(2, 9),
                date: new Date().toISOString(),
                status: 'new'
            };
            const updated = [newInquiry, ...current];
            localStorage.setItem('inquiries', JSON.stringify(updated));
            return { success: true, id: newInquiry.id };
        },
        async updateStatus(id: string, status: Inquiry['status']) {
            await sleep(SLEEP_TIME);
            const current = await this.getAll();
            const updated = current.map(item =>
                item.id === id ? { ...item, status } : item
            );
            localStorage.setItem('inquiries', JSON.stringify(updated));
            return { success: true };
        },
        async delete(id: string) {
            await sleep(SLEEP_TIME);
            const current = await this.getAll();
            const updated = current.filter(item => item.id !== id);
            localStorage.setItem('inquiries', JSON.stringify(updated));
            return { success: true };
        }
    },

    // Locations API
    locations: {
        async getAll(): Promise<WifiLocation[]> {
            await sleep(SLEEP_TIME);
            const data = localStorage.getItem('wifi_locations_v2');
            if (data === null) {
                localStorage.setItem('wifi_locations_v2', JSON.stringify(initialLocations));
                return initialLocations;
            }
            return JSON.parse(data);
        },
        async add(location: Omit<WifiLocation, 'id'>) {
            await sleep(SLEEP_TIME);
            const current = await this.getAll();
            const newLoc: WifiLocation = {
                ...location,
                id: 'loc_' + Math.random().toString(36).substr(2, 9)
            };
            const updated = [...current, newLoc];
            localStorage.setItem('wifi_locations', JSON.stringify(updated));
            return { success: true, id: newLoc.id };
        },
        async update(id: string, location: Partial<WifiLocation>) {
            await sleep(SLEEP_TIME);
            const current = await this.getAll();
            const updated = current.map(item =>
                item.id === id ? { ...item, ...location } : item
            );
            localStorage.setItem('wifi_locations_v2', JSON.stringify(updated));
            return { success: true };
        },
        async delete(id: string) {
            await sleep(SLEEP_TIME);
            const current = await this.getAll();
            const updated = current.filter(item => item.id !== id);
            localStorage.setItem('wifi_locations', JSON.stringify(updated));
            return { success: true };
        }
    },

    // Auth API
    auth: {
        async login(password: string) {
            await sleep(SLEEP_TIME);
            if (password === 'admin123') { // Simple mock auth
                localStorage.setItem('isAdminAuthenticated', 'true');
                return { success: true };
            }
            return { success: false, message: 'Invalid credentials' };
        },
        async logout() {
            await sleep(SLEEP_TIME);
            localStorage.removeItem('isAdminAuthenticated');
            return { success: true };
        }
    }
};
