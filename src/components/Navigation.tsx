import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Code2, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

interface NavigationProps {
  onViewPortfolio?: () => void;
}

export function Navigation({ onViewPortfolio }: NavigationProps = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, isRTL } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A1A2F]/95 backdrop-blur-lg border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`flex items-center gap-2 cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`}
            onClick={() => scrollToSection('hero')}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6EC1E4] to-[#0A1A2F] flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl text-white">
              Synery <span className="text-[#6EC1E4]">Code</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={() => scrollToSection('hero')}
              className="text-white hover:text-[#6EC1E4] transition-colors duration-200"
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-white hover:text-[#6EC1E4] transition-colors duration-200"
            >
              {t('nav.services')}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-white hover:text-[#6EC1E4] transition-colors duration-200"
            >
              {t('nav.about')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-[#6EC1E4] transition-colors duration-200"
            >
              {t('nav.contact')}
            </button>
            {onViewPortfolio && (
              <button
                onClick={onViewPortfolio}
                className="text-white hover:text-[#6EC1E4] transition-colors duration-200"
              >
                {t('portfolio.title')}
              </button>
            )}
          </div>

          {/* Right side: Language Switcher, CTA Button, Mobile Menu */}
          <div className={`flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Language Switcher */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-1 text-white hover:text-[#6EC1E4] transition-colors duration-200 p-2 rounded-lg border border-white/20 hover:border-[#6EC1E4]/50"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm">{language === 'en' ? 'العربية' : 'English'}</span>
            </motion.button>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-[#6EC1E4] to-[#0A1A2F] hover:from-[#5BADD8] hover:to-[#0E2142] text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                {t('nav.getStarted')}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A1A2F]/95 backdrop-blur-lg border-t border-white/10 mt-2 rounded-lg"
          >
            <div className="px-4 py-6 space-y-4">
              <button
                onClick={() => scrollToSection('hero')}
                className={`block w-full text-white hover:text-[#6EC1E4] transition-colors duration-200 ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {t('nav.home')}
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className={`block w-full text-white hover:text-[#6EC1E4] transition-colors duration-200 ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {t('nav.services')}
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`block w-full text-white hover:text-[#6EC1E4] transition-colors duration-200 ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {t('nav.about')}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`block w-full text-white hover:text-[#6EC1E4] transition-colors duration-200 ${isRTL ? 'text-right' : 'text-left'}`}
              >
                {t('nav.contact')}
              </button>
              {onViewPortfolio && (
                <button
                  onClick={() => {
                    onViewPortfolio();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-white hover:text-[#6EC1E4] transition-colors duration-200 ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  {t('portfolio.title')}
                </button>
              )}
              
              {/* Language Switcher Mobile */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className={`flex items-center gap-2 text-white hover:text-[#6EC1E4] transition-colors duration-200 p-2 rounded-lg border border-white/20 hover:border-[#6EC1E4]/50 w-full ${isRTL ? 'justify-end flex-row-reverse' : 'justify-start'}`}
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">{language === 'en' ? 'العربية' : 'English'}</span>
              </motion.button>
              
              <Button
                onClick={() => scrollToSection('contact')}
                className="w-full bg-gradient-to-r from-[#6EC1E4] to-[#0A1A2F] hover:from-[#5BADD8] hover:to-[#0E2142] text-white"
              >
                {t('nav.getStarted')}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}