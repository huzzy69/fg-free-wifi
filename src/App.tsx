import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
// Import pages (we will act as if they exist, or create empty ones first to avoid errors if I run dev, but I will write them next)
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Advertisers from './pages/Advertisers';

import About from './pages/About';
import Contact from './pages/Contact';
import FreeWifiLocations from './pages/FreeWifiLocations';
import LocationDetail from './pages/LocationDetail';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

// Context
import { SiteConfigProvider } from './context/SiteConfigContext';

import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <SiteConfigProvider>
        <ScrollToTop />
        <Routes>
          {/* Admin Routes - No Public Layout */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Public Routes - Wrapped in Layout */}
          <Route path="*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/advertisers" element={<Advertisers />} />
                <Route path="/locations" element={<FreeWifiLocations />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/free-wifi-locations" element={<FreeWifiLocations />} />
                <Route path="/location/:id" element={<LocationDetail />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </SiteConfigProvider>
    </Router>
  );
}

export default App;
