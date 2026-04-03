import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    if (location.pathname === '/') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = '/#contact';
    }
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Cars', path: '/cars' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-black text-base transition-colors ${
              isScrolled ? 'bg-secondary text-primary' : 'bg-primary text-secondary'
            }`}>
              SC
            </div>
            <span className={`font-bold text-xl tracking-tight transition-colors ${
              isScrolled ? 'text-dark' : 'text-white'
            }`}>
              Solid<span className="text-primary">Cars</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-sm font-medium tracking-wide transition-colors group ${
                  isScrolled ? 'text-slate-600 hover:text-dark' : 'text-white/90 hover:text-white'
                } ${isActive(link.path) ? (isScrolled ? 'text-dark' : 'text-white') : ''}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
            <button
              onClick={scrollToContact}
              className={`relative text-sm font-medium tracking-wide transition-colors group ${
                isScrolled ? 'text-slate-600 hover:text-dark' : 'text-white/90 hover:text-white'
              }`}
            >
              Contact
              <span className="absolute -bottom-1 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-300" />
            </button>
            <Link
              to="/cars"
              className="bg-primary hover:bg-amber-500 text-secondary px-6 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-md hover:shadow-amber-300/40 hover:-translate-y-0.5"
            >
              Browse Cars
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${isScrolled ? 'text-dark' : 'text-white'} hover:text-primary outline-none transition-colors`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-xl absolute top-full w-full left-0 border-t border-slate-100">
          <div className="px-4 pt-3 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive(link.path)
                    ? 'text-secondary bg-amber-50 border-l-2 border-primary'
                    : 'text-slate-700 hover:text-secondary hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={scrollToContact}
              className="block w-full text-left px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-secondary hover:bg-slate-50 rounded-lg transition-colors"
            >
              Contact
            </button>
            <div className="pt-3">
              <Link
                to="/cars"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-primary hover:bg-amber-500 text-secondary px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
              >
                Browse Cars
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
