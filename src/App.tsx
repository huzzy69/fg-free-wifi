import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Advertisers from './pages/Advertisers';
import About from './pages/About';
import Contact from './pages/Contact';
import Locations from './pages/Locations';
import FreeWifiLocations from './pages/FreeWifiLocations';
import LocationDetail from './pages/LocationDetail';
import AdminLogin from './pages/nimda/AdminLogin';
import AdminDashboard from './pages/nimda/AdminDashboard';
import { SiteConfigProvider, useSiteConfig } from './context/SiteConfigContext';
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/Loader';

function AppContent() {
  const { isLoading } = useSiteConfig();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Nimda Routes - No Public Layout */}
        <Route path="/nimda" element={<AdminLogin />} />
        <Route path="/nimda/dashboard" element={<AdminDashboard />} />

        {/* Public Routes - Wrapped in Layout */}
        <Route path="*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/advertisers" element={<Advertisers />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/free-wifi-locations" element={<FreeWifiLocations />} />
              <Route path="/location/:id" element={<LocationDetail />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <SiteConfigProvider>
        <AppContent />
      </SiteConfigProvider>
    </Router>
  );
}

export default App;
