import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail, Car } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand & About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Car className="h-8 w-8 text-primary" />
              <span className="font-bold text-2xl tracking-tighter text-white">
                SOLID<span className="text-primary">CARS</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 mt-4 leading-relaxed">
              Premium second-hand car dealership providing high-quality, inspected vehicles with flexible financing options. Your trusted partner on the road.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="h-1 w-1 bg-primary rounded-full"></span> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="h-1 w-1 bg-primary rounded-full"></span> About Us
                </Link>
              </li>
              <li>
                <Link to="/cars" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="h-1 w-1 bg-primary rounded-full"></span> Browse Cars
                </Link>
              </li>
              <li>
                <a href="/#contact" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="h-1 w-1 bg-primary rounded-full"></span> Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6 uppercase tracking-wider">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/cars?category=Sedan" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="h-1 w-1 bg-primary rounded-full"></span> Premium Sedans
                </Link>
              </li>
              <li>
                <Link to="/cars?category=SUV" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="h-1 w-1 bg-primary rounded-full"></span> Family SUVs
                </Link>
              </li>
              <li>
                <Link to="/cars?category=Hatchback" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="h-1 w-1 bg-primary rounded-full"></span> City Hatchbacks
                </Link>
              </li>
              <li>
                <Link to="/cars?category=Electric" className="hover:text-primary transition-colors flex items-center gap-2">
                  <span className="h-1 w-1 bg-primary rounded-full"></span> Electric Vehicles
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6 uppercase tracking-wider">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span>123 Auto Avenue, Motor City, MC 45678</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span>sales@solidcars.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} SolidCars. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
