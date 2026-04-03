import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Filter, Search, X, SlidersHorizontal } from 'lucide-react';
import CarCard from '../components/CarCard';

const AllCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const [filters, setFilters] = useState({
    category: '',
    make: '',
    minPrice: '',
    maxPrice: '',
    year: ''
  });
  const [sort, setSort] = useState('newest');

  const categories = ['Sedan', 'Hatchback', 'SUV', 'Coupe', 'Convertible', 'Wagon', 'Van', 'Truck'];
  const makes = ['Toyota', 'Honda', 'Nissan', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz', 'Audi', 'Hyundai', 'Kia'];

  useEffect(() => {
    fetchCars();
  }, [filters, sort]);

  const fetchCars = async () => {
    setLoading(true);
    try {
      let queryString = `?sort=${sort}`;
      if (filters.category) queryString += `&category=${filters.category}`;
      if (filters.make) queryString += `&make=${filters.make}`;
      if (filters.minPrice) queryString += `&minPrice=${filters.minPrice}`;
      if (filters.maxPrice) queryString += `&maxPrice=${filters.maxPrice}`;
      if (filters.year) queryString += `&year=${filters.year}`;

      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars${queryString}`);
      setCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({ category: '', make: '', minPrice: '', maxPrice: '', year: '' });
    setSort('newest');
  };

  const hasActiveFilters = Object.values(filters).some(Boolean) || sort !== 'newest';

  const inputClass = "w-full bg-slate-50 border border-slate-200 text-dark text-sm py-2.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all";
  const labelClass = "block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2";

  return (
    <>
      <Helmet>
        <title>Browse Our Inventory | Solid Cars</title>
        <meta name="description" content="Explore our wide selection of premium second-hand cars. Filter by make, model, year, and price to find your perfect vehicle." />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content="Browse Our Inventory | Solid Cars" />
        <meta property="og:description" content="Explore our wide selection of premium second-hand cars. Filter by make, model, year, and price to find your perfect vehicle." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2066&auto=format&fit=crop" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={window.location.href} />
        <meta property="twitter:title" content="Browse Our Inventory | Solid Cars" />
        <meta property="twitter:description" content="Explore our wide selection of premium second-hand cars. Filter by make, model, year, and price to find your perfect vehicle." />
        <meta property="twitter:image" content="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2066&auto=format&fit=crop" />
      </Helmet>

      {/* Header */}
      <div className="bg-secondary text-white pt-28 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-primary text-xs font-bold uppercase tracking-widest">Our Inventory</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-3">Complete Car Listing</h1>
          <p className="text-slate-400 text-base max-w-xl">
            Find the perfect vehicle that suits your lifestyle, needs, and budget.
          </p>
        </div>
      </div>

      <div className="bg-light py-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Mobile Filter Button */}
            <div className="lg:hidden flex justify-between items-center">
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="flex items-center gap-2 bg-secondary text-white px-4 py-2.5 rounded-xl font-medium text-sm shadow-sm"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
                {hasActiveFilters && (
                  <span className="ml-1 bg-primary text-secondary w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center">
                    !
                  </span>
                )}
              </button>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-white border border-slate-200 text-dark text-sm py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium"
              >
                <option value="newest">Newest First</option>
                <option value="priceLowToHigh">Price: Low → High</option>
                <option value="priceHighToLow">Price: High → Low</option>
              </select>
            </div>

            {/* Sidebar */}
            <div className={`
              fixed inset-0 z-50 bg-black/50 lg:bg-transparent lg:static lg:block lg:w-72 flex-shrink-0
              ${isMobileFiltersOpen ? 'block' : 'hidden'}
            `}>
              <div className={`
                fixed inset-y-0 left-0 w-80 bg-white shadow-2xl lg:static lg:w-full lg:shadow-none lg:bg-transparent
                overflow-y-auto transform transition-transform duration-300 ease-in-out lg:transform-none
                ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
              `}>
                {/* Mobile header */}
                <div className="flex justify-between items-center lg:hidden px-6 py-4 border-b border-slate-100">
                  <h2 className="font-bold text-dark">Filters</h2>
                  <button onClick={() => setIsMobileFiltersOpen(false)} className="text-slate-400 hover:text-dark">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-bold text-dark flex items-center gap-2">
                      <Filter className="w-4 h-4 text-primary" /> Filters
                    </h2>
                    {hasActiveFilters && (
                      <button onClick={clearFilters} className="text-xs text-primary font-semibold hover:underline">
                        Clear All
                      </button>
                    )}
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className={labelClass}>Category</label>
                      <select name="category" value={filters.category} onChange={handleFilterChange} className={inputClass}>
                        <option value="">All Categories</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>Brand</label>
                      <select name="make" value={filters.make} onChange={handleFilterChange} className={inputClass}>
                        <option value="">All Brands</option>
                        {makes.map(make => <option key={make} value={make}>{make}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>Year</label>
                      <input
                        type="number"
                        name="year"
                        placeholder="e.g. 2018"
                        value={filters.year}
                        onChange={handleFilterChange}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Price Range</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          name="minPrice"
                          placeholder="Min"
                          value={filters.minPrice}
                          onChange={handleFilterChange}
                          className={inputClass}
                        />
                        <span className="text-slate-300 font-bold">—</span>
                        <input
                          type="number"
                          name="maxPrice"
                          placeholder="Max"
                          value={filters.maxPrice}
                          onChange={handleFilterChange}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => { clearFilters(); setIsMobileFiltersOpen(false); }}
                      className="w-full py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-secondary transition-colors lg:hidden text-sm"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Grid */}
            <div className="flex-1 min-w-0">
              {/* Top bar */}
              <div className="hidden lg:flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 mb-6 shadow-sm">
                <p className="text-sm text-slate-500">
                  Showing <span className="text-dark font-bold text-base">{cars.length}</span> results
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sort:</span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-dark text-sm py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary font-medium"
                  >
                    <option value="newest">Newest First</option>
                    <option value="priceLowToHigh">Price: Low → High</option>
                    <option value="priceHighToLow">Price: High → Low</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
                </div>
              ) : cars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {cars.map((car, index) => (
                    <CarCard key={car._id} car={car} delay={index * 0.05} />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl p-12 text-center border border-slate-100 flex flex-col items-center min-h-[400px] justify-center"
                >
                  <Search className="w-14 h-14 text-slate-200 mb-4" />
                  <h3 className="text-xl font-bold text-dark mb-2">No cars found</h3>
                  <p className="text-slate-400 max-w-sm mx-auto mb-6 text-sm">
                    We couldn't find any vehicles matching your current filters. Try adjusting your search criteria.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-primary hover:bg-amber-400 text-secondary px-6 py-3 rounded-xl font-bold text-sm transition-colors"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AllCars;
