import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageSquare, CheckCircle2, MapPin } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, formData);
      setStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    { Icon: Phone, label: 'Call Us', value: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { Icon: Mail, label: 'Email Us', value: 'sales@solidcars.com', href: 'mailto:sales@solidcars.com' },
    { Icon: MapPin, label: 'Visit Us', value: '123 Auto Avenue, Motor City, MC 45678', href: '#' },
  ];

  return (
    <section id="contact" className="py-24 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-primary text-xs font-bold uppercase tracking-widest">Get In Touch</span>
          <h2 className="text-3xl md:text-5xl font-bold text-dark mt-2 mb-4">
            We'd Love to Hear<br />
            <span className="text-secondary">From You</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-base">
            Have questions about a vehicle or want to schedule a test drive?
            Fill out the form below or contact us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Contact Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-secondary rounded-2xl p-8 h-full text-white">
              <h3 className="text-xl font-bold mb-2">Contact Information</h3>
              <p className="text-slate-400 text-sm mb-8">Fill out the form and our team will get back to you within 24 hours.</p>

              <div className="space-y-6">
                {contactItems.map(({ Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-secondary transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{label}</p>
                      <p className="text-white font-medium text-sm mt-0.5 group-hover:text-primary transition-colors">{value}</p>
                    </div>
                  </a>
                ))}

                {/* WhatsApp */}
                <a
                  href="https://wa.me/15551234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#25D366]/15 flex items-center justify-center text-[#25D366] flex-shrink-0 group-hover:bg-[#25D366] group-hover:text-white transition-all">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">WhatsApp</p>
                    <p className="text-[#25D366] font-medium text-sm mt-0.5">Chat with us</p>
                  </div>
                </a>
              </div>

              {/* Decorative dots */}
              <div className="mt-12 grid grid-cols-6 gap-2 opacity-20">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary" />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all text-sm text-dark placeholder-slate-300"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all text-sm text-dark placeholder-slate-300"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="phone" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all text-sm text-dark placeholder-slate-300"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all text-sm text-dark placeholder-slate-300 resize-none"
                  placeholder="I'm interested in..."
                />
              </div>

              {status.message && (
                <div className={`mb-5 p-4 rounded-xl flex items-start gap-3 text-sm ${
                  status.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {status.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />}
                  <p className="font-medium">{status.message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-amber-400 text-secondary font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-amber-200/60 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
