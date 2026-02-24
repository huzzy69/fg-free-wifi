
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

export interface TeamMember {
    id: string;
    name: string;
    designation: string;
    bio: string;
    photo: string;   // URL or base64 data URI
    email?: string;
    linkedin?: string;
    order: number;   // display order
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
        email: 'info@fakhirgroup.com',
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
        email: 'info@fakhirgroup.com',
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

// Initial seed data for Team Members (18 cards)
const initialTeamMembers: TeamMember[] = [
    {
        id: 'tm_mss', name: 'Muhammad Saeed Shaikh', designation: 'Chairman & Group President',
        bio: 'Providing visionary leadership and strategic direction as the Chairman and Group President, steering the fakhir group\'s global mission.',
        photo: '', order: 1
    },
    {
        id: 'tm_pg', name: 'Ms. Patricia Garcia', designation: 'Global Head of Audits & Compliance',
        bio: 'CPA from Spain, speaking English and Spanish. Currently a Joint Partner at Baker Tilly, Houston, ensuring the highest standards of transparency for Fakhir Group.',
        photo: '/team/patricia_garcia.jpeg', order: 2
    },
    {
        id: 'tm_hbb', name: 'Hamdan Bin Muhammad Al Balushi', designation: 'Global Director Government Affairs',
        bio: 'Facilitates strategic relationships and collaboration with government entities worldwide to drive the fakhir group\'s digital transformation.',
        photo: '', order: 3
    },
    {
        id: 'tm_nb', name: 'Nabeel Bin Asghar Al Balushi', designation: 'Global Director Supply Chain',
        bio: 'Optimizes the global supply chain and logistics network, ensuring efficient deployment of the fakhir group\'s infrastructure.',
        photo: '', order: 4
    },
    {
        id: 'tm_2', name: 'Saif Saeed Muhammad', designation: 'Global Director Operations',
        bio: 'Oversees the end-to-end deployment and operations of the fakhir group\'s network globally, ensuring high-quality service and strategic growth.',
        photo: '', order: 5
    },
    {
        id: 'tm_b1', name: 'Ms. Azam Sadeghzadeh', designation: 'Global Head of Accounts & Finances',
        bio: 'Persian and English speaker. Directed global expansion strategy in Turkey and international markets, while aligning domestic stakeholders to strengthen financial connectivity and capital flow.',
        photo: '/team/azam_sadeghzadeh.jpeg', order: 6
    },
    {
        id: 'tm_z1', name: 'Zubair Paracha', designation: 'Head of Commercials (Pakistan)',
        bio: 'Leading strategic operations and nationwide expansion in Pakistan, focusing on high-level partnerships and digital inclusion.',
        photo: '', order: 7
    },
    {
        id: 'tm_4', name: 'Ms. Rahima Ejaz', designation: 'Human Resources Manager (Pakistan)',
        bio: 'Champions a culture of innovation and excellence, managing talent acquisition and development across our growing regional teams.',
        photo: '', order: 8
    },
    {
        id: 'tm_5', name: 'Aquib Ali', designation: 'Business Development Manager (SME & Govt. Sector)',
        bio: 'Leading strategic partnerships with small-to-medium enterprises and government bodies to expand the AdsOnWifi footprint.',
        photo: '', order: 9
    },
    {
        id: 'tm_7', name: 'Arhub Hussain', designation: 'Visual Designer',
        bio: 'Crafts the visual identity and user experience of our platforms, ensuring every touchpoint is engaging and visually stunning.',
        photo: '', order: 10
    },
    {
        id: 'tm_8', name: 'Huzaifa Shiraz', designation: 'Business Development Executive (Karachi)',
        bio: 'Drives growth within the Karachi region, identifying new venues and opportunities for the AdsOnWifi network.',
        photo: '/team/huzaifa_shiraz.png', order: 11
    },
    {
        id: 'tm_9', name: 'Zayan Farooq Khan', designation: 'Business Development Executive (Karachi)',
        bio: 'Dedicated to expanding our presence in Karachi, fostering local partnerships and site acquisitions.',
        photo: '', order: 12
    },
    {
        id: 'tm_ms1', name: 'Ms. Misbah Siddiqui', designation: 'Business Development Executive (Karachi)',
        bio: 'Focuses on expanding our reach in Karachi, building relationships with venue partners and driving business growth.',
        photo: '', order: 13
    },
    {
        id: 'tm_hk1', name: 'Hamza Khan', designation: 'Business Development Executive (Karachi)',
        bio: 'Dedicated to identifying and securing high-footfall locations in Karachi to expand the AdsOnWifi network.',
        photo: '', order: 14
    },
    {
        id: 'tm_10', name: 'Syed Hasaan', designation: 'Sites Acquisition Officer (Karachi)',
        bio: 'Expert in securing high-footfall locations for hotspot installations, ensuring optimal network coverage across the city.',
        photo: '', order: 15
    },
    {
        id: 'tm_11', name: 'Mohsin Sabri', designation: 'Sites Acquisition Officer (Karachi)',
        bio: 'Works on the ground to identify and acquire prime sites for our WiFi hotspots, fueling our network expansion strategy.',
        photo: '', order: 16
    },
    {
        id: 'tm_as1', name: 'Ms. Albina Shakirova', designation: 'Business Development Executive (UAE)',
        bio: 'Russian speaker driving business growth and strategic partnerships across the UAE, expanding Fakhir Group\'s global reach.',
        photo: '/team/albina_shakirova.jpeg', order: 17
    },
    {
        id: 'tm_at1', name: 'Ms Amna Tahir', designation: 'Business Development Manager (UAE Real Estate)',
        bio: 'Driving business development and strategic growth in the UAE real estate sector for Fakhir Group.',
        photo: '/team/amna_tahir.jpeg', order: 18
    },
    {
        id: 'tm_ma1', name: 'Muskan Arif', designation: 'Management Trainee',
        bio: 'Supporting strategic operations and learning the ropes of our global network management as a Management Trainee.',
        photo: '', order: 19
    }
];

// Site Configuration
const initialConfig = {
    companyName: 'AdsOnWifi',
    logoUrl: '/team/logo.jpeg',
    contactEmail: 'info@fakhirgroup.com',
    contactPhone: '0334-5588889',
    contactAddress: 'B1-104, UK Square, Federal B. Area, Karachi',
    heroTitlePart1: 'FREE WiFi for Users.',
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
            const data = localStorage.getItem('siteConfig_v4');
            if (data === null) {
                localStorage.setItem('siteConfig_v4', JSON.stringify(initialConfig));
                return initialConfig;
            }

            const parsed = JSON.parse(data);
            // Validation: if critical fields are missing (due to code updates), reset to initial
            if (!parsed.services || !parsed.heroStat1Value) {
                localStorage.setItem('siteConfig_v4', JSON.stringify(initialConfig));
                return initialConfig;
            }

            return parsed;
        },
        async update(config: any) {
            await sleep(SLEEP_TIME);
            localStorage.setItem('siteConfig_v4', JSON.stringify(config));
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
            localStorage.setItem('wifi_locations_v2', JSON.stringify(updated));
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
            localStorage.setItem('wifi_locations_v2', JSON.stringify(updated));
            return { success: true };
        }
    },

    // Team Members API
    team: {
        async getAll(): Promise<TeamMember[]> {
            await sleep(SLEEP_TIME);
            const data = localStorage.getItem('team_members_v20');
            if (data === null) {
                localStorage.setItem('team_members_v20', JSON.stringify(initialTeamMembers));
                return initialTeamMembers;
            }
            const parsed: TeamMember[] = JSON.parse(data);
            return parsed.sort((a, b) => a.order - b.order);
        },
        async add(member: Omit<TeamMember, 'id'>) {
            await sleep(SLEEP_TIME);
            const current = await this.getAll();
            const newMember: TeamMember = {
                ...member,
                id: 'tm_' + Math.random().toString(36).substr(2, 9)
            };
            const updated = [...current, newMember];
            localStorage.setItem('team_members_v20', JSON.stringify(updated));
            return { success: true, id: newMember.id };
        },
        async update(id: string, member: Partial<TeamMember>) {
            await sleep(SLEEP_TIME);
            const current = await this.getAll();
            const updated = current.map(item =>
                item.id === id ? { ...item, ...member } : item
            );
            localStorage.setItem('team_members_v20', JSON.stringify(updated));
            return { success: true };
        },
        async delete(id: string) {
            await sleep(SLEEP_TIME);
            const current = await this.getAll();
            const updated = current.filter(item => item.id !== id);
            localStorage.setItem('team_members_v20', JSON.stringify(updated));
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
