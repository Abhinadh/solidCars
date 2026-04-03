import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Gauge, Fuel } from 'lucide-react';
import { motion } from 'framer-motion';

const CarCard = ({ car, delay = 0 }) => {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(car.price);

  const fallbackImage = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2066&auto=format&fit=crop';
  const imageUrl = car.images && car.images.length > 0
    ? `${import.meta.env.VITE_API_URL}${car.images[0]}`
    : fallbackImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-slate-100"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={car.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3 bg-secondary/90 backdrop-blur-sm text-primary py-1 px-3 rounded-md text-xs font-bold uppercase tracking-wider">
          {car.category}
        </div>
        {/* Price overlay */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 right-3 text-white font-bold text-lg drop-shadow">
          {formattedPrice}
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-base font-bold text-dark group-hover:text-secondary transition-colors line-clamp-1">
            {car.title}
          </h3>
          <p className="text-slate-400 text-sm mt-0.5">{car.brand} · {car.model}</p>
        </div>

        {/* Specs row */}
        <div className="grid grid-cols-2 gap-y-2.5 gap-x-2 text-xs text-slate-500 mb-5 bg-slate-50 rounded-xl p-3">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-primary" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span className="line-clamp-1">{car.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel className="w-3.5 h-3.5 text-primary" />
            <span>{car.fuel}</span>
          </div>
        </div>

        <Link
          to={`/cars/${car._id}`}
          className="block w-full text-center bg-secondary hover:bg-primary text-white hover:text-secondary py-2.5 rounded-xl font-semibold text-sm transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default CarCard;
