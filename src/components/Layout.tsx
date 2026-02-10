import React, { type ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTopButton from './BackToTopButton';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
                {children}
            </main>
            <Footer />
            <BackToTopButton />
        </div>
    );
};

export default Layout;
