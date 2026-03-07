import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const CarCard = ({ car, delay = 0 }) => {
  // Format price
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(car.price);

  const fallbackImage = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2066&auto=format&fit=crop';
  const imageUrl = car.images && car.images.length > 0 
    ? `http://localhost:5000${car.images[0]}` 
    : fallbackImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100"
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={car.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 bg-primary text-white py-1.5 px-3 rounded-full text-xs font-bold shadow-lg">
          {car.category}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors line-clamp-1">
              {car.title}
            </h3>
            <p className="text-gray-500 text-sm mt-1">{car.brand} {car.model}</p>
          </div>
          <div className="text-right">
            <span className="block text-lg font-bold text-primary">{formattedPrice}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-gray-600 mb-6">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="line-clamp-1">{car.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-gray-400 text-xs uppercase tracking-wider">FUEL</span>
            <span>{car.fuel}</span>
          </div>
        </div>
        
        <Link 
          to={`/cars/${car._id}`}
          className="block w-full text-center bg-gray-50 hover:bg-primary hover:text-white text-dark py-3 rounded-xl font-medium transition-colors"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default CarCard;
