import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroSlider from '../components/HeroSlider';
import CarCard from '../components/CarCard';
import ContactSection from '../components/ContactSection';

const Home = () => {
  const [latestCars, setLatestCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestCars = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/cars?sort=createdAt');
        // Get only the first 4 cars
        setLatestCars(data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestCars();
  }, []);

  return (
    <>
      <Helmet>
        <title>Solid Cars | Premium Second-Hand Dealership</title>
        <meta name="description" content="Find the best deals on premium second-hand cars. Solid Cars offers trusted, inspected, and affordable vehicles." />
      </Helmet>
      
      {/* Hero Section */}
      <HeroSlider />

      {/* Latest Cars Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-dark mb-4"
            >
              Latest Arrivals
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-500 max-w-2xl mx-auto"
            >
              Check out our newest premium vehicles freshly added to our inventory.
            </motion.p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : latestCars.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {latestCars.map((car, index) => (
                  <CarCard key={car._id} car={car} delay={index * 0.1} />
                ))}
              </div>
              <div className="mt-16 text-center">
                <Link 
                  to="/cars" 
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-dark hover:bg-gray-800 transition-colors shadow-lg"
                >
                  View All Cars
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <p>No cars available at the moment. Please check back later.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section (Mini About) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop" 
                alt="Dealership" 
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">Why Choose SolidCars?</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">100+ Point Inspection</h3>
                  <p className="text-gray-600">Every vehicle undergoes a rigorous inspection process by our certified mechanics before hitting the lot.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">Transparent Pricing</h3>
                  <p className="text-gray-600">No hidden fees or surprise charges. The price you see is the price you pay, guaranteed.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">Extended Warranty</h3>
                  <p className="text-gray-600">Drive with peace of mind. We offer comprehensive extended warranty options on all our vehicles.</p>
                </div>
              </div>
              <div className="mt-8">
                <Link to="/about" className="text-primary font-semibold hover:underline flex items-center gap-2">
                  Learn more about us <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </>
  );
};

export default Home;
