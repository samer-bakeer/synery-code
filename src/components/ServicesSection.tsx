import { motion } from 'motion/react';
import { Code2, Smartphone, Palette, ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';



export function ServicesSection() {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();

  const services = [
    {
      icon: Code2,
      titleKey: 'services.webDev.title',
      descriptionKey: 'services.webDev.description',
      image: 'https://images.unsplash.com/photo-1554306274-f23873d9a26c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZyUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NTk1MzA5NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      features: [
        'Responsive Design',
        'SEO Optimization', 
        'Fast Loading Speed',
        'Modern Frameworks'
      ],
      gradient: 'from-[#6EC1E4] to-[#4A9FD1]'
    },
    {
      icon: Smartphone,
      titleKey: 'services.webApp.title',
      descriptionKey: 'services.webApp.description',
      image: 'https://images.unsplash.com/photo-1633250391894-397930e3f5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudCUyMHVpJTIwZGVzaWdufGVufDF8fHx8MTc1OTUzMDk3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      features: [
        'React Native',
        'Cross-Platform',
        'App Store Optimization',
        'Push Notifications'
      ],
      gradient: 'from-[#4A9FD1] to-[#2E7DB3]'
    },
    {
      icon: Palette,
      titleKey: 'services.uiUx.title',
      descriptionKey: 'services.uiUx.description',
      image: 'https://images.unsplash.com/photo-1618788372246-79faff0c3742?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx1eCUyMGRlc2lnbiUyMHdpcmVmcmFtZSUyMHNrZXRjaGluZ3xlbnwxfHx8fDE3NTk1MzA5Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      features: [
        'User Research',
        'Wireframing',
        'Prototyping',
        'Design Systems'
      ],
      gradient: 'from-[#2E7DB3] to-[#0A1A2F]'
    }
  ];
  return (
    <section id="services" className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0A1A2F]/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#6EC1E4]/10 to-[#0A1A2F]/10 text-[#0A1A2F] rounded-full mb-4">
            {t('services.title')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#0A1A2F] mb-6">
            {t('services.subtitle')}
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {services.map((service, index) => (
            <motion.div
              key={service.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group flex"
            >
              <Card className="w-full bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden rounded-2xl flex flex-col">
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20`}></div>
                  <ImageWithFallback
                    src={service.image}
                    alt={t(service.titleKey)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                <CardHeader className={`pb-4 ${isRTL ? 'text-right' : ''}`}>
                  <CardTitle className="text-xl text-[#0A1A2F] group-hover:text-[#2E7DB3] transition-colors duration-300">
                    {t(service.titleKey)}
                  </CardTitle>
                  <CardDescription className={`text-gray-600 leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                    {t(service.descriptionKey)}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0 flex-1 flex flex-col justify-end">
                  {/* Features List */}
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: (index * 0.2) + (featureIndex * 0.1) }}
                        viewport={{ once: true }}
                        className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                      >
                        <CheckCircle className="w-5 h-5 text-[#6EC1E4] flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-[#0A1A2F] to-[#6EC1E4] rounded-2xl p-8 sm:p-12 text-white">
            <h3 className="text-2xl sm:text-3xl mb-4">
              {t('hero.ctaTitle')}
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              {t('hero.ctaSubtitle')}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-[#0A1A2F] px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              {t('hero.cta')}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}