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
  ArrowLeft,
} from 'lucide-react';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars/${id}`);
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
      <div className="min-h-screen pt-20 flex justify-center items-center bg-light">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-primary" />
          <p className="text-slate-400 text-sm">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen pt-28 flex flex-col items-center justify-center text-center px-4 bg-light">
        <h2 className="text-3xl font-bold text-dark mb-4">Car Not Found</h2>
        <p className="text-slate-500 mb-8 max-w-md">The vehicle you are looking for might have been sold or removed from our inventory.</p>
        <Link to="/cars" className="bg-primary text-secondary px-8 py-3 rounded-xl font-bold hover:bg-amber-400 transition-colors">
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
    ? car.images.map(img => `${import.meta.env.VITE_API_URL}${img}`)
    : [fallbackImage, fallbackImage, fallbackImage];

  const nextImage = () => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const prevImage = () => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const specs = [
    { Icon: Calendar, label: 'Year', value: car.year },
    { Icon: Gauge, label: 'Mileage', value: `${car.kmDriven?.toLocaleString()} km` },
    { Icon: Settings, label: 'Transmission', value: car.transmission },
    { Icon: Droplet, label: 'Fuel Type', value: car.fuel },
    { Icon: User, label: 'Owners', value: car.ownership },
    { Icon: MapPin, label: 'Location', value: car.location },
  ];

  return (
    <>
      <Helmet>
        <title>{`${car.year} ${car.brand} ${car.model}`} | Solid Cars</title>
        <meta name="description" content={`Check out this ${car.year} ${car.brand} ${car.model} available now at Solid Cars. ${car.kmDriven} km, ${car.fuel} fuel, ${car.transmission} transmission.`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={`${car.year} ${car.brand} ${car.model} | Solid Cars`} />
        <meta property="og:description" content={`Find this ${car.year} ${car.brand} ${car.model} at Solid Cars. Price: ${formattedPrice}. Inspect today!`} />
        <meta property="og:image" content={images[0]} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={window.location.href} />
        <meta property="twitter:title" content={`${car.year} ${car.brand} ${car.model} | Solid Cars`} />
        <meta property="twitter:description" content={`Check out this ${car.year} ${car.brand} ${car.model} at Solid Cars. Price: ${formattedPrice}.`} />
        <meta property="twitter:image" content={images[0]} />

        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Car",
            "name": `${car.year} ${car.brand} ${car.model}`,
            "image": images,
            "description": car.description,
            "brand": {
              "@type": "Brand",
              "name": car.brand
            },
            "model": car.model,
            "modelDate": car.year,
            "fuelType": car.fuel,
            "vehicleTransmission": car.transmission,
            "mileageFromOdometer": {
              "@type": "QuantitativeValue",
              "value": car.kmDriven,
              "unitCode": "KMT"
            },
            "offers": {
              "@type": "Offer",
              "url": window.location.href,
              "priceCurrency": "INR",
              "price": car.price,
              "availability": "https://schema.org/InStock",
              "itemCondition": "https://schema.org/UsedCondition"
            }
          })}
        </script>
      </Helmet>

      <div className="bg-light min-h-screen pb-20 pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
            <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/cars" className="hover:text-secondary transition-colors">Inventory</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-dark font-medium">{car.brand} {car.model}</span>
          </nav>

          {/* Back button */}
          <Link
            to="/cars"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-secondary font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Inventory
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left: Images & Info */}
            <div className="lg:col-span-2 space-y-6">

              {/* Image Gallery */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 p-3">
                <div className="relative h-[380px] md:h-[480px] rounded-xl overflow-hidden bg-slate-100 group">
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

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-dark p-2.5 rounded-full md:opacity-0 md:group-hover:opacity-100 transition-all shadow-lg z-10"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-dark p-2.5 rounded-full md:opacity-0 md:group-hover:opacity-100 transition-all shadow-lg z-10"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Badges */}
                  <div className="absolute top-5 left-5 flex gap-2 z-10">
                    <span className="bg-secondary/90 backdrop-blur-sm text-primary py-1.5 px-4 rounded-lg text-xs font-bold uppercase tracking-wider">
                      {car.category}
                    </span>
                  </div>

                  {/* Image counter */}
                  {images.length > 1 && (
                    <div className="absolute bottom-5 right-5 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  )}
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-3 mt-3 overflow-x-auto pb-1 scrollbar-hide px-1">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === idx
                            ? 'border-primary shadow-md opacity-100'
                            : 'border-transparent opacity-50 hover:opacity-80'
                        }`}
                      >
                        <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-dark mb-4">Vehicle Overview</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {car.description || 'No detailed description available for this vehicle. Contact us for more information.'}
                </p>
              </div>

              {/* Features */}
              {car.features && car.features.length > 0 && (
                <div className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold text-dark mb-6">Key Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {car.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-dark text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Price & Specs */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 sticky top-28 overflow-hidden">

                {/* Header strip */}
                <div className="bg-secondary px-7 py-6">
                  <h1 className="text-xl font-bold text-white mb-0.5">{car.title}</h1>
                  <p className="text-slate-400 text-sm">{car.year} · {car.brand} {car.model}</p>
                </div>

                <div className="p-7">
                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-slate-100">
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Our Price</span>
                    <span className="text-4xl font-bold text-primary">{formattedPrice}</span>
                  </div>

                  {/* Specs grid */}
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-5">Specifications</h3>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {specs.map(({ Icon, label, value }) => (
                      <div key={label} className="bg-slate-50 rounded-xl p-3">
                        <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                          <Icon className="w-3.5 h-3.5 text-primary" />
                          <span className="text-xs uppercase tracking-wider font-semibold">{label}</span>
                        </div>
                        <span className="font-bold text-dark text-sm">{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="space-y-3">
                    <a
                      href="/#contact"
                      className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-amber-400 text-secondary py-3.5 rounded-xl font-bold transition-all hover:-translate-y-0.5 shadow-md hover:shadow-amber-200/50"
                    >
                      <Mail className="w-4 h-4" />
                      Contact Seller
                    </a>
                    <a
                      href="https://wa.me/15551234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white py-3.5 rounded-xl font-bold transition-all border border-[#25D366]/30"
                    >
                      <Phone className="w-4 h-4" />
                      WhatsApp
                    </a>
                  </div>
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
