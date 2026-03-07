import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Shield, Award, Users, CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Solid Cars</title>
        <meta name="description" content="Learn more about Solid Cars, our mission, and why we are the trusted choice for premium used vehicles." />
      </Helmet>
      
      {/* Header */}
      <div className="bg-dark text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          >
            Redefining the <span className="text-primary">Pre-Owned</span> Experience
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed"
          >
            We are committed to providing unparalleled quality, rigorous inspections, and transparent pricing in the pre-owned automotive market.
          </motion.p>
        </div>
      </div>

      {/* Our Story section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop" 
                  alt="Dealership Showroom" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-primary text-white p-8 rounded-2xl shadow-xl hidden md:block">
                <span className="block text-5xl font-bold mb-2">10+</span>
                <span className="text-lg font-medium">Years of Excellence</span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Our Story</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-dark mb-6">Building Trust Since 2013</h3>
              
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Solid Cars began with a simple idea: buying a used car shouldn't feel like a gamble. We wanted to create an environment where transparency, trust, and quality intersected perfectly.
                </p>
                <p>
                  Over the past decade, we've developed one of the industry's most rigorous inspection protocols. Our team of certified master mechanics examines every vehicle across 150+ different points before it ever sees our showroom floor.
                </p>
                <p>
                  Today, we're proud to be the premier destination for high-quality pre-owned vehicles, having helped over 5,000 customers find their perfect ride without the traditional dealership stress.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">The SolidCars Difference</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-dark">Why We're the Trusted Choice</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 text-center"
            >
              <div className="w-16 h-16 bg-red-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-dark mb-3">Certified Quality</h4>
              <p className="text-gray-500">Every vehicle undergoes our rigorous 150-point inspection and reconditioning process.</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 text-center"
            >
              <div className="w-16 h-16 bg-red-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-dark mb-3">Extended Warranty</h4>
              <p className="text-gray-500">Drive with absolute peace of mind with our comprehensive 6-month limited warranty included.</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 text-center"
            >
              <div className="w-16 h-16 bg-red-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-dark mb-3">No Hidden Fees</h4>
              <p className="text-gray-500">100% transparent pricing. The price you see is the price you pay, guaranteed.</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 text-center"
            >
              <div className="w-16 h-16 bg-red-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-dark mb-3">Dedicated Support</h4>
              <p className="text-gray-500">Our relationship doesn't end at the sale. Enjoy exceptional post-purchase customer service.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
