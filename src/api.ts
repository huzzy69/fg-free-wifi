
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
        name: "Allama Iqbal Town Campus, Karachi",
        address: "B-09 Block W Allama Iqbal Town paposhnagar (Pre-School)",
        contact: "021-36613835",
        city: "Karachi",
        category: "Education Sector",
        province: "Sindh"
    },
    {
        id: 'loc_2',
        name: "Cinepax Cinema",
        address: "Ocean Mall, Clifton, Karachi",
        contact: "021-111-222-333",
        city: "Karachi",
        category: "Cinemas",
        province: "Sindh"
    },
    {
        id: 'loc_3',
        name: "Gulberg Campus Lahore",
        address: "12-Main Boulevard, Gulberg III, Lahore",
        contact: "042-35712345",
        city: "Lahore",
        category: "Education Sector",
        province: "Punjab"
    }
];

// Site Configuration
const initialConfig = {
    companyName: 'Ads on Wifi',
    logoUrl: '/logo.png',
    contactEmail: 'fakhirgroupss.smtp@gmail.com',
    contactPhone: '+92 311 1133221',
    contactAddress: 'Suite 204, Business Center, Shahra-e-Faisal, Karachi',
    heroTitlePart1: 'Boost Your Brand with',
    heroTitleHighlight1: 'Wifi Advertising',
    heroTitlePart2: 'Reach Thousands of',
    heroTitleHighlight2: 'Active Users',
    heroSubtitle: 'Transform local wifi networks into powerful advertising channels. Engage customers exactly where they are with high-impact, location-based digital ads.'
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
            return JSON.parse(data);
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
            const data = localStorage.getItem('wifi_locations');
            if (data === null) {
                localStorage.setItem('wifi_locations', JSON.stringify(initialLocations));
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
            localStorage.setItem('wifi_locations', JSON.stringify(updated));
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
