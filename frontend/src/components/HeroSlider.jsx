import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      title: "Premium Cars at Affordable Prices",
      description: "Discover our curated selection of high-quality, inspected used vehicles.",
      image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1964&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Trusted Used Car Dealership",
      description: "Over 10 years of experience providing reliable cars and excellent customer service.",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Browse Our Latest Inventory",
      description: "From efficient sedans to spacious SUVs, find the perfect car for your lifestyle.",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'linear',
    arrows: false,
  };

  return (
    <div className="relative h-[90vh] overflow-hidden bg-dark">
      <Slider {...settings} className="h-full">
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-[90vh] outline-none">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/60"></div>
            </div>
            
            <div className="relative h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto pt-20">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
              >
                {slide.title}
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-2xl text-gray-200 mb-10 font-light max-w-2xl"
              >
                {slide.description}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link 
                  to="/cars" 
                  className="bg-primary hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-colors shadow-lg shadow-red-500/30 inline-flex items-center gap-2"
                >
                  Browse Cars
                </Link>
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;
