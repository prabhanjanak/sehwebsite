import React, { useState, useEffect } from 'react';
import { DatabaseProvider, useDatabase } from './context/DatabaseContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AppointmentModal } from './components/modals/AppointmentModal';
import { DonationModal } from './components/modals/DonationModal';
import { EyePledgeModal } from './components/modals/EyePledgeModal';
import { AnnouncementPromoModal } from './components/modals/AnnouncementPromoModal';
import { NewsletterReaderModal } from './components/modals/NewsletterReaderModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { HospitalsPage } from './pages/HospitalsPage';
import { HospitalDetailPage } from './pages/HospitalDetailPage';
import { SocialImpactPage } from './pages/SocialImpactPage';
import { EducationPage } from './pages/EducationPage';
import { NewsPage } from './pages/NewsPage';
import { EventsPage } from './pages/EventsPage';
import { BlogPage } from './pages/BlogPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { CareersPage } from './pages/CareersPage';
import { DonatePage } from './pages/DonatePage';
import { PledgeEyesPage } from './pages/PledgeEyesPage';
import { AnnualReportsPage } from './pages/AnnualReportsPage';
import { AwardsPage } from './pages/AwardsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { BookAppointmentPage } from './pages/BookAppointmentPage';
import { CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.hash ? window.location.hash.replace('#', '') : '/';
  });

  const { toastMessage } = useDatabase();

  useEffect(() => {
    const handleHashChange = () => {
      const route = window.location.hash ? window.location.hash.replace('#', '') : '/';
      setCurrentRoute(route);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (route: string) => {
    window.location.hash = route;
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    // Route matching
    if (currentRoute === '/' || currentRoute === '') {
      return <HomePage navigate={navigate} />;
    }

    if (currentRoute === '/about' || currentRoute === '/about/founder') {
      return <AboutPage navigate={navigate} />;
    }

    if (currentRoute === '/services' || currentRoute === '/services/') {
      return <ServicesPage navigate={navigate} />;
    }

    if (currentRoute.startsWith('/services/')) {
      const specialtyId = currentRoute.replace('/services/', '');
      return <ServiceDetailPage specialtyId={specialtyId} navigate={navigate} />;
    }

    if (currentRoute === '/hospitals' || currentRoute === '/hospitals/') {
      return <HospitalsPage navigate={navigate} />;
    }

    if (currentRoute.startsWith('/hospitals/')) {
      const hospitalId = currentRoute.replace('/hospitals/', '');
      return <HospitalDetailPage hospitalId={hospitalId} navigate={navigate} />;
    }

    if (currentRoute === '/social-impact') {
      return <SocialImpactPage navigate={navigate} />;
    }

    if (currentRoute === '/education') {
      return <EducationPage navigate={navigate} />;
    }

    if (currentRoute === '/news' || currentRoute === '/press') {
      return <NewsPage navigate={navigate} />;
    }

    if (currentRoute === '/events' || currentRoute === '/conferences') {
      return <EventsPage navigate={navigate} />;
    }

    if (currentRoute === '/blog') {
      return <BlogPage navigate={navigate} />;
    }

    if (currentRoute === '/testimonials') {
      return <TestimonialsPage navigate={navigate} />;
    }

    if (currentRoute === '/careers') {
      return <CareersPage navigate={navigate} />;
    }

    if (currentRoute === '/donate' || currentRoute === '/donate-sefusa') {
      return <DonatePage navigate={navigate} />;
    }

    if (currentRoute === '/pledge-your-eyes') {
      return <PledgeEyesPage navigate={navigate} />;
    }

    if (currentRoute === '/annual-reports') {
      return <AnnualReportsPage navigate={navigate} />;
    }

    if (currentRoute === '/awards' || currentRoute === '/dr-rvr-awards' || currentRoute.startsWith('/awards')) {
      return <AwardsPage navigate={navigate} />;
    }

    if (currentRoute === '/contact') {
      return <ContactPage navigate={navigate} />;
    }

    if (currentRoute === '/admin' || currentRoute === '/admin/login' || currentRoute === '/admin/dashboard') {
      return <AdminDashboardPage navigate={navigate} />;
    }

    if (
      currentRoute === '/book-appointment' || 
      currentRoute === '/appointment' || 
      currentRoute.startsWith('/book-appointment') ||
      currentRoute.startsWith('/bookappointment')
    ) {
      return <BookAppointmentPage navigate={navigate} />;
    }

    if (currentRoute === '/privacy-policy') {
      return <PrivacyPolicyPage navigate={navigate} />;
    }

    // Default Fallback
    return <HomePage navigate={navigate} />;
  };

  const isAdminRoute = currentRoute.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-orange-500 selection:text-white">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white border-2 border-orange-500 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-200 max-w-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Global Modals */}
      <AppointmentModal />
      <DonationModal />
      <EyePledgeModal />
      <AnnouncementPromoModal />
      <NewsletterReaderModal />

      {/* Main Header Navbar (Hidden on standalone admin pages for clean focused workspace) */}
      {!isAdminRoute && <Navbar currentRoute={currentRoute} navigate={navigate} />}

      {/* Dynamic Page Content */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Footer */}
      {!isAdminRoute && <Footer navigate={navigate} />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <DatabaseProvider>
      <AppContent />
    </DatabaseProvider>
  );
};

export default App;
