import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Tag, Award, ArrowRight } from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import CarCard from '../components/CarCard';
import ContactSection from '../components/ContactSection';

const Home = () => {
  const [latestCars, setLatestCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestCars = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars?sort=createdAt`);
        setLatestCars(data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestCars();
  }, []);

  const whyUsItems = [
    {
      Icon: ShieldCheck,
      title: '100+ Point Inspection',
      desc: 'Every vehicle undergoes a rigorous inspection process by our certified mechanics before hitting the lot.',
    },
    {
      Icon: Tag,
      title: 'Transparent Pricing',
      desc: 'No hidden fees or surprise charges. The price you see is the price you pay, guaranteed.',
    },
    {
      Icon: Award,
      title: 'Extended Warranty',
      desc: 'Drive with peace of mind. We offer comprehensive extended warranty options on all our vehicles.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Solid Cars | Premium Second-Hand Dealership</title>
        <meta name="description" content="Find the best deals on premium second-hand cars. Solid Cars offers trusted, inspected, and affordable vehicles." />
        <meta name="keywords" content="used cars, second hand cars, buy cars, premium cars, car dealership" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content="Solid Cars | Premium Second-Hand Dealership" />
        <meta property="og:description" content="Find the best deals on premium second-hand cars. Solid Cars offers trusted, inspected, and affordable vehicles." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={window.location.href} />
        <meta property="twitter:title" content="Solid Cars | Premium Second-Hand Dealership" />
        <meta property="twitter:description" content="Find the best deals on premium second-hand cars. Solid Cars offers trusted, inspected, and affordable vehicles." />
        <meta property="twitter:image" content="https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop" />
      </Helmet>

      {/* Hero */}
      <HeroSlider />

      {/* Stats bar */}
      <div className="bg-secondary text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '500+', label: 'Cars Sold' },
              { value: '10+', label: 'Years Experience' },
              { value: '98%', label: 'Satisfied Clients' },
              { value: '24/7', label: 'Support' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl md:text-3xl font-bold text-primary">{value}</div>
                <div className="text-slate-400 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Arrivals */}
      <section className="py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary text-xs font-bold uppercase tracking-widest"
            >
              Fresh Stock
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-dark mt-2 mb-4"
            >
              Latest Arrivals
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 max-w-xl mx-auto"
            >
              Check out our newest premium vehicles freshly added to our inventory.
            </motion.p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            </div>
          ) : latestCars.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {latestCars.map((car, index) => (
                  <CarCard key={car._id} car={car} delay={index * 0.1} />
                ))}
              </div>
              <div className="mt-14 text-center">
                <Link
                  to="/cars"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-secondary hover:bg-primary text-white hover:text-secondary font-semibold rounded-lg transition-all shadow-md text-sm"
                >
                  View All Cars <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center text-slate-400 py-12">
              <p>No cars available at the moment. Please check back later.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop"
                alt="Dealership"
                className="rounded-2xl shadow-2xl w-full object-cover"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-secondary text-white rounded-2xl p-5 shadow-xl hidden md:block">
                <div className="text-3xl font-bold text-primary">10+</div>
                <div className="text-xs text-slate-400 mt-1">Years of Trust</div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary text-xs font-bold uppercase tracking-widest">Why Us</span>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mt-2 mb-8">
                Why Choose<br />
                <span className="text-secondary">SolidCars?</span>
              </h2>

              <div className="space-y-7">
                {whyUsItems.map(({ Icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-dark mb-1">{title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-secondary font-semibold hover:text-primary transition-colors text-sm"
                >
                  Learn more about us <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <ContactSection />
    </>
  );
};

export default Home;
