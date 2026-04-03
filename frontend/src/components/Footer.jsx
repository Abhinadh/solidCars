import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-slate-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center font-black text-secondary text-base">
                SC
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                Solid<span className="text-primary">Cars</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 mt-4 leading-relaxed">
              Premium second-hand car dealership providing high-quality, inspected vehicles with transparent pricing. Your trusted partner on the road.
            </p>
            <div className="flex space-x-3 pt-2">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary/20 flex items-center justify-center text-slate-400 hover:text-primary transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-primary text-xs font-bold mb-5 uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'About Us', to: '/about' },
                { label: 'Browse Cars', to: '/cars' },
                { label: 'Contact', to: '/#contact' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="h-px w-4 bg-primary/40 group-hover:w-6 group-hover:bg-primary transition-all" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-primary text-xs font-bold mb-5 uppercase tracking-widest">Categories</h3>
            <ul className="space-y-3">
              {[
                { label: 'Premium Sedans', cat: 'Sedan' },
                { label: 'Family SUVs', cat: 'SUV' },
                { label: 'City Hatchbacks', cat: 'Hatchback' },
                { label: 'Electric Vehicles', cat: 'Electric' },
              ].map(({ label, cat }) => (
                <li key={cat}>
                  <Link
                    to={`/cars?category=${cat}`}
                    className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="h-px w-4 bg-primary/40 group-hover:w-6 group-hover:bg-primary transition-all" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-primary text-xs font-bold mb-5 uppercase tracking-widest">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm leading-relaxed">123 Auto Avenue, Motor City, MC 45678</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm">sales@solidcars.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} SolidCars. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
