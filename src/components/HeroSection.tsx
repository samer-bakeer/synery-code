import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

interface HeroSectionProps {
  onViewPortfolio?: () => void;
}

export function HeroSection({ onViewPortfolio }: HeroSectionProps = {}) {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#0A1A2F] via-[#1B2B4A] to-[#6EC1E4]"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#6EC1E4]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0A1A2F]/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-gradient-to-r from-[#6EC1E4]/10 to-[#0A1A2F]/10 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#6EC1E4]/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -100, null],
              x: [null, Math.random() * 100 - 50, null],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-7xl text-white mb-6 leading-tight"
          >
            {t('hero.title')}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}
          >
            <Button
              onClick={() => scrollToSection('contact')}
              className="group bg-gradient-to-r from-[#6EC1E4] to-[#0A1A2F] hover:from-[#5BADD8] hover:to-[#0E2142] text-white px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span>{t('hero.cta')}</span>
                <ArrowRight className={`w-5 h-5 transition-transform duration-200 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
              </div>
            </Button>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#6EC1E4] to-[#4A9FD1] rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
              <Button
                onClick={onViewPortfolio || (() => scrollToSection('services'))}
                className="relative px-10 py-4 rounded-lg bg-white text-[#0A1A2F] hover:bg-gray-50 transition-all duration-300 shadow-xl border-2 border-[#6EC1E4]"
              >
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Sparkles className="w-5 h-5 text-[#6EC1E4]" />
                  <span className="font-semibold">{t('hero.ctaSecondary')}</span>
                </div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/20"
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl text-[#6EC1E4] mb-2">20+</div>
              <div className="text-gray-300">{t('hero.projectsDelivered')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl text-[#6EC1E4] mb-2">💰</div>
              <div className="text-gray-300">{t('hero.affordablePricing')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl text-[#6EC1E4] mb-2">24/7</div>
              <div className="text-gray-300">{t('hero.supportAvailable')}</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-[#6EC1E4] rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-[#6EC1E4] rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}