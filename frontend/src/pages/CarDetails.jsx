import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Settings, 
  Droplet, 
  User, 
  Gauge, 
  ChevronLeft, 
  ChevronRight,
  Phone,
  Mail,
  Share2
} from 'lucide-react';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/cars/${id}`);
        setCar(data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen pt-28 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold text-dark mb-4">Car Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md">The vehicle you are looking for might have been sold or removed from our inventory.</p>
        <Link to="/cars" className="bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-red-700 transition-colors">
          Browse All Cars
        </Link>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(car.price);

  const fallbackImage = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2066&auto=format&fit=crop';
  const images = car.images && car.images.length > 0 
    ? car.images.map(img => `http://localhost:5000${img}`) 
    : [fallbackImage, fallbackImage, fallbackImage]; // Fallbacks for gallery

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      <Helmet>
        <title>{`${car.year} ${car.brand} ${car.model}`} | Solid Cars</title>
        <meta name="description" content={`Check out this ${car.year} ${car.brand} ${car.model} available now at Solid Cars.`} />
      </Helmet>
      
      <div className="bg-gray-50 min-h-screen pb-20 pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav className="text-sm font-medium text-gray-500 mb-6 flex items-center gap-2">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/cars" className="hover:text-primary transition-colors">Inventory</Link>
            <span>/</span>
            <span className="text-dark">{car.brand} {car.model}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Left Column (Images & Details) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Image Gallery */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 p-2">
                <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden bg-gray-100 group">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={images[currentImageIndex]}
                      alt={`${car.brand} ${car.model}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>
                  
                  {/* Slider Controls */}
                  {images.length > 1 && (
                    <>
                      <button 
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-dark p-3 rounded-full transition-all shadow-md z-10"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button 
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-dark p-3 rounded-full transition-all shadow-md z-10"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-6 left-6 flex gap-2 z-10">
                    <span className="bg-primary text-white py-1.5 px-4 rounded-full text-xs font-bold shadow-lg uppercase tracking-wider">
                      {car.category}
                    </span>
                  </div>
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-4 mt-4 overflow-x-auto pb-2 px-2 scrollbar-hide">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === idx ? 'border-primary shadow-md opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-dark mb-4">Vehicle Overview</h3>
                <div className="prose max-w-none text-gray-600">
                  <p>{car.description || 'No detailed description available for this vehicle. Contact us for more information.'}</p>
                </div>
              </div>

              {/* Features List */}
              {car.features && car.features.length > 0 && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-2xl font-bold text-dark mb-6">Key Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {car.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column (Price & Specs) */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Header Card */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 sticky top-28">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-dark mb-2">{car.brand} {car.model}</h1>
                  <p className="text-gray-500 text-lg mb-1">{car.year} • {car.variant}</p>
                  <p className="text-gray-500 flex items-center gap-1">
                    <MapPin className="w-4 h-4 overflow-visible" /> 
                    {car.location || "Location not provided"}
                  </p>
                </div>
                
                <div className="py-6 border-y border-gray-100 mb-6">
                  <span className="block text-sm font-medium text-gray-500 uppercase tracking-widest mb-1">Our Price</span>
                  <span className="text-4xl font-bold text-primary">{formattedPrice}</span>
                </div>

                {/* Quick Specs Grid */}
                <h3 className="text-lg font-bold text-dark mb-4">Specifications</h3>
                <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-wider font-semibold">Year</span>
                    </div>
                    <span className="font-bold text-dark text-lg">{car.year}</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <Gauge className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-wider font-semibold">Mileage</span>
                    </div>
                    <span className="font-bold text-dark text-lg">{car.kmDriven.toLocaleString()} km</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <Settings className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-wider font-semibold">Trans.</span>
                    </div>
                    <span className="font-bold text-dark text-lg">{car.transmission}</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <Droplet className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-wider font-semibold">Fuel</span>
                    </div>
                    <span className="font-bold text-dark text-lg">{car.fuel}</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <User className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-wider font-semibold">Owners</span>
                    </div>
                    <span className="font-bold text-dark text-lg">{car.ownership}</span>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-wider font-semibold">Location</span>
                    </div>
                    <span className="font-bold text-dark text-lg">{car.location}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <a href="/#contact" className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-red-700 text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-red-500/30">
                    <Mail className="w-5 h-5" />
                    Contact Seller
                  </a>
                  <a 
                    href="https://wa.me/15551234567" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-xl font-bold transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default CarDetails;
