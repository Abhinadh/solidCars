import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5500,
    fade: true,
    cssEase: 'ease-in-out',
    arrows: false,
  };

  return (
    <div className="relative h-[92vh] overflow-hidden bg-secondary">
      <Slider {...settings} className="h-full">
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-[92vh] outline-none">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center scale-105"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Premium gradient overlay — navy on left, transparent on right */}
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/70 to-black/30" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-center px-6 max-w-7xl mx-auto pt-20">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="max-w-2xl"
              >
                {/* Gold accent bar */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="block h-0.5 w-10 bg-primary" />
                  <span className="text-primary text-sm font-semibold uppercase tracking-widest">
                    Solid Cars Dealership
                  </span>
                </div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.25 }}
                  className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.45 }}
                  className="text-lg md:text-xl text-slate-300 mb-10 font-light max-w-xl leading-relaxed"
                >
                  {slide.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link
                    to="/cars"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-amber-400 text-secondary px-8 py-4 rounded-lg font-bold text-base transition-all hover:-translate-y-0.5 shadow-xl shadow-amber-900/30"
                  >
                    Browse Cars <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="/#contact"
                    className="inline-flex items-center gap-2 border border-white/30 hover:border-primary text-white hover:text-primary px-8 py-4 rounded-lg font-medium text-base transition-all backdrop-blur-sm"
                  >
                    Contact Us
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;
