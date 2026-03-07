import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Filter, Search, X } from 'lucide-react';
import CarCard from '../components/CarCard';

const AllCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  // Filter States
  const [filters, setFilters] = useState({
    category: '',
    make: '',
    minPrice: '',
    maxPrice: '',
    year: ''
  });
  const [sort, setSort] = useState('newest');

  // Filter Options
  const categories = ['Sedan', 'Hatchback', 'SUV', 'Coupe', 'Convertible', 'Wagon', 'Van', 'Truck'];
  const makes = ['Toyota', 'Honda', 'Nissan', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz', 'Audi', 'Hyundai', 'Kia'];

  useEffect(() => {
    fetchCars();
  }, [filters, sort]);

  const fetchCars = async () => {
    setLoading(true);
    try {
      // Build query string
      let queryString = `?sort=${sort}`;
      if (filters.category) queryString += `&category=${filters.category}`;
      if (filters.make) queryString += `&make=${filters.make}`;
      if (filters.minPrice) queryString += `&minPrice=${filters.minPrice}`;
      if (filters.maxPrice) queryString += `&maxPrice=${filters.maxPrice}`;
      if (filters.year) queryString += `&year=${filters.year}`;

      const { data } = await axios.get(`http://localhost:5000/api/cars${queryString}`);
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
    setFilters({
      category: '',
      make: '',
      minPrice: '',
      maxPrice: '',
      year: ''
    });
    setSort('newest');
  };

  return (
    <>
      <Helmet>
        <title>Browse Cars | Solid Cars</title>
        <meta name="description" content="Explore our wide selection of premium second-hand cars. Filter by make, model, year, and price to find your perfect vehicle." />
      </Helmet>
      
      {/* Page Header */}
      <div className="bg-dark text-white pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Complete Inventory</h1>
          <p className="text-gray-400 text-lg max-w-2xl">Find the perfect vehicle that suits your lifestyle, needs, and budget.</p>
        </div>
      </div>

      <div className="bg-gray-50 py-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Mobile Filter Button */}
            <div className="lg:hidden flex justify-between items-center mb-4">
              <button 
                onClick={() => setIsMobileFiltersOpen(true)}
                className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 font-medium text-dark"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500">Sort by:</span>
                <select 
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="border-none bg-transparent font-medium text-dark focus:ring-0 cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="priceLowToHigh">Price: Low to High</option>
                  <option value="priceHighToLow">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Sidebar Filters */}
            <div className={`
              fixed inset-0 z-50 bg-black/50 lg:bg-transparent lg:static lg:block lg:w-1/4
              ${isMobileFiltersOpen ? 'block' : 'hidden'}
            `}>
              <div className={`
                fixed inset-y-0 left-0 w-80 bg-white shadow-xl lg:static lg:w-full lg:shadow-none lg:bg-transparent lg:border-none p-6 lg:p-0
                overflow-y-auto transform transition-transform duration-300 ease-in-out lg:transform-none
                ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
              `}>
                <div className="flex justify-between items-center lg:hidden mb-6">
                  <h2 className="text-xl font-bold text-dark">Filters</h2>
                  <button onClick={() => setIsMobileFiltersOpen(false)} className="text-gray-500 hover:text-dark">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="bg-white lg:p-6 lg:rounded-2xl lg:shadow-sm lg:border border-gray-100 mb-6">
                  <div className="flex justify-between items-center mb-6 hidden lg:flex">
                    <h2 className="text-xl font-bold text-dark flex items-center gap-2">
                      <Filter className="w-5 h-5 text-primary" />
                      Filters
                    </h2>
                    <button 
                      onClick={clearFilters}
                      className="text-sm text-primary font-medium hover:underline"
                    >
                      Clear All
                    </button>
                  </div>

                  {/* Filter Sections */}
                  <div className="space-y-6">
                    {/* Category */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Category</label>
                      <select 
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">All Categories</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>

                    {/* Make/Brand */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Brand</label>
                      <select 
                        name="make"
                        value={filters.make}
                        onChange={handleFilterChange}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">All Brands</option>
                        {makes.map(make => <option key={make} value={make}>{make}</option>)}
                      </select>
                    </div>

                    {/* Year */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Year</label>
                      <input 
                        type="number" 
                        name="year"
                        placeholder="e.g. 2018"
                        value={filters.year}
                        onChange={handleFilterChange}
                        className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Price Range</label>
                      <div className="flex items-center gap-2">
                        <input 
                          type="number" 
                          name="minPrice"
                          placeholder="Min"
                          value={filters.minPrice}
                          onChange={handleFilterChange}
                          className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <span className="text-gray-400">-</span>
                        <input 
                          type="number" 
                          name="maxPrice"
                          placeholder="Max"
                          value={filters.maxPrice}
                          onChange={handleFilterChange}
                          className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    <button 
                      onClick={clearFilters}
                      className="w-full py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-colors lg:hidden mt-6"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content: Car Grid */}
            <div className="lg:w-3/4">
              {/* Desktop Top Bar */}
              <div className="hidden lg:flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 mb-8 shadow-sm">
                <p className="font-medium text-gray-600">Showing <span className="text-dark font-bold">{cars.length}</span> results</p>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-500">Sort by:</span>
                  <select 
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="bg-gray-50 border border-gray-200 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-medium"
                  >
                    <option value="newest">Newest First</option>
                    <option value="priceLowToHigh">Price: Low to High</option>
                    <option value="priceHighToLow">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Cars Grid */}
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
                  className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[400px]"
                >
                  <Search className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-2xl font-bold text-dark mb-2">No cars found</h3>
                  <p className="text-gray-500 max-w-md mx-auto mb-6">We couldn't find any vehicles matching your current filters. Try adjusting your search criteria.</p>
                  <button 
                    onClick={clearFilters}
                    className="bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
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
