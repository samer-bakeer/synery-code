import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

interface FormData {
  fullName: string;
  email: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  message?: string;
}

export function ContactSection() {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      setFormData({ fullName: '', email: '', message: '' });
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.info.emailLabel'),
      details: t('contact.info.email'),
      description: t('contact.info.emailDescription')
    },
    {
      icon: Phone,
      title: t('contact.info.phoneLabel'),
      details: t('contact.info.phone'),
      description: t('contact.info.phoneDescription')
    },
    {
      icon: MapPin,
      title: t('contact.info.addressLabel'),
      details: t('contact.info.address'),
      description: t('contact.info.addressDescription')
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-[#0A1A2F] via-[#1B2B4A] to-[#6EC1E4] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#6EC1E4]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
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
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-lg text-white rounded-full mb-4 border border-white/20">
            {t('contact.title')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
            {t('contact.subtitle')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className={`text-2xl sm:text-3xl text-white mb-6 ${isRTL ? 'rtl:text-right' : ''}`}>
                {t('contact.title')}
              </h3>
              <p className={`text-gray-300 leading-relaxed mb-8 ${isRTL ? 'rtl:text-right' : ''}`}>
                {t('contact.subtitle')}
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-12 h-12 bg-gradient-to-br from-[#6EC1E4] to-[#4A9FD1] rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-lg text-white mb-1 ${isRTL ? 'text-right' : ''}`}>{info.title}</h4>
                      <p className={`text-[#6EC1E4] mb-1 ${isRTL ? 'text-right' : ''}`}>{info.details}</p>
                      <p className={`text-sm text-gray-300 ${isRTL ? 'text-right' : ''}`}>{info.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
            >
              <h4 className={`text-lg text-white mb-4 ${isRTL ? 'text-right' : ''}`}>{t('contact.whyChoose.title')}</h4>
              <ul className={`space-y-2 text-gray-300 ${isRTL ? 'text-right' : ''}`}>
                <li className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <CheckCircle className="w-4 h-4 text-[#6EC1E4] flex-shrink-0" />
                  <span>{t('contact.whyChoose.consultation')}</span>
                </li>
                <li className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <CheckCircle className="w-4 h-4 text-[#6EC1E4] flex-shrink-0" />
                  <span>{t('contact.whyChoose.pricing')}</span>
                </li>
                <li className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <CheckCircle className="w-4 h-4 text-[#6EC1E4] flex-shrink-0" />
                  <span>{t('contact.whyChoose.support')}</span>
                </li>
                <li className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <CheckCircle className="w-4 h-4 text-[#6EC1E4] flex-shrink-0" />
                  <span>{t('contact.whyChoose.guarantee')}</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
              <CardHeader className={isRTL ? 'text-right' : ''}>
                <CardTitle className="text-2xl text-white">{t('contact.form.title')}</CardTitle>
                <CardDescription className="text-gray-300">
                  {t('contact.form.subtitle')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-xl text-white mb-2">{t('contact.form.successTitle')}</h3>
                    <p className="text-gray-300 mb-4">
                      {t('contact.form.successMessage')}
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      {t('contact.form.sendAnother')}
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className={`block text-sm text-gray-300 mb-2 ${isRTL ? 'rtl:text-right' : ''}`}>
                        {t('contact.form.fullName')} *
                      </label>
                      <Input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder={t('contact.form.fullNamePlaceholder')}
                        className={`bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-[#6EC1E4] ${isRTL ? 'text-right' : ''} ${
                          errors.fullName ? 'border-red-400' : ''
                        }`}
                      />
                      {errors.fullName && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex items-center mt-1 ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}
                        >
                          <AlertCircle className="w-4 h-4 text-red-400" />
                          <span className="text-sm text-red-400">{errors.fullName}</span>
                        </motion.div>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className={`block text-sm text-gray-300 mb-2 ${isRTL ? 'rtl:text-right' : ''}`}>
                        {t('contact.form.email')} *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder={t('contact.form.emailPlaceholder')}
                        className={`bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-[#6EC1E4] ${isRTL ? 'text-right' : ''} ${
                          errors.email ? 'border-red-400' : ''
                        }`}
                      />
                      {errors.email && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex items-center mt-1 ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}
                        >
                          <AlertCircle className="w-4 h-4 text-red-400" />
                          <span className="text-sm text-red-400">{errors.email}</span>
                        </motion.div>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className={`block text-sm text-gray-300 mb-2 ${isRTL ? 'rtl:text-right' : ''}`}>
                        {t('contact.form.message')} *
                      </label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder={t('contact.form.messagePlaceholder')}
                        rows={4}
                        className={`bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-[#6EC1E4] resize-none ${isRTL ? 'text-right' : ''} ${
                          errors.message ? 'border-red-400' : ''
                        }`}
                      />
                      {errors.message && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex items-center mt-1 ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}
                        >
                          <AlertCircle className="w-4 h-4 text-red-400" />
                          <span className="text-sm text-red-400">{errors.message}</span>
                        </motion.div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#6EC1E4] to-[#4A9FD1] hover:from-[#5BADD8] hover:to-[#3A8FC5] text-white py-3 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <div className={`flex items-center justify-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                          <span>{isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}</span>
                          <Send className="w-4 h-4" />
                        </div>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}