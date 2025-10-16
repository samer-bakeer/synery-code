import { useState } from 'react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PortfolioSection } from './components/PortfolioSection';
import { ProjectDetail, Project } from './components/ProjectDetail';

type View = 'home' | 'portfolio' | 'projectDetail';

function AppContent() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { isRTL } = useLanguage();

  const showPortfolio = () => setCurrentView('portfolio');
  const showHome = () => {
    setCurrentView('home');
    setSelectedProject(null);
  };
  const showProjectDetail = (project: Project) => {
    setSelectedProject(project);
    setCurrentView('projectDetail');
  };
  const backToPortfolio = () => {
    setSelectedProject(null);
    setCurrentView('portfolio');
  };

  return (
    <div className={`min-h-screen bg-white ${isRTL ? 'rtl' : ''}`}>
      {currentView === 'home' && (
        <>
          <Navigation onViewPortfolio={showPortfolio} />
          <main>
            <HeroSection onViewPortfolio={showPortfolio} />
            <ServicesSection />
            <AboutSection />
            <ContactSection />
          </main>
          <Footer />
        </>
      )}
      
      {currentView === 'portfolio' && (
        <PortfolioSection onBack={showHome} onProjectClick={showProjectDetail} />
      )}
      
      {currentView === 'projectDetail' && selectedProject && (
        <ProjectDetail project={selectedProject} onBack={backToPortfolio} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}