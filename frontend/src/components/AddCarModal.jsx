import React, { useState, useEffect } from 'react';
import { X, Upload, Plus, Trash2, Edit } from 'lucide-react';
import axios from 'axios';

const AddCarModal = ({ isOpen, onClose, onSuccess, token, carToEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    category: 'Sedan',
    transmission: 'Automatic',
    fuel: 'Petrol',
    ownership: '1st Owner',
    kmDriven: '',
    location: '',
    description: '',
    features: ''
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Pre-fill form if editing
  useEffect(() => {
    if (carToEdit && isOpen) {
      setFormData({
        title: carToEdit.title || '',
        brand: carToEdit.brand || '',
        model: carToEdit.model || '',
        year: carToEdit.year || new Date().getFullYear(),
        price: carToEdit.price || '',
        category: carToEdit.category || 'Sedan',
        transmission: carToEdit.transmission || 'Automatic',
        fuel: carToEdit.fuel || 'Petrol',
        ownership: carToEdit.ownership || '1st Owner',
        kmDriven: carToEdit.kmDriven || '',
        location: carToEdit.location || '',
        description: carToEdit.description || '',
        features: Array.isArray(carToEdit.features) ? carToEdit.features.join(', ') : (typeof carToEdit.features === 'string' ? carToEdit.features : '')
      });
    } else if (isOpen) {
      setFormData({
        title: '', brand: '', model: '', year: new Date().getFullYear(),
        price: '', category: 'Sedan', transmission: 'Automatic',
        fuel: 'Petrol', ownership: '1st Owner', kmDriven: '',
        location: '', description: '', features: ''
      });
    }
    setImages([]);
    setError('');
  }, [carToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (key === 'features') {
          const featuresArray = formData.features.split(',').map(f => f.trim()).filter(f => f !== '');
          data.append('features', JSON.stringify(featuresArray));
        } else {
          data.append(key, formData[key]);
        }
      });

      images.forEach(image => {
        data.append('images', image);
      });

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      };

      if (carToEdit) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/cars/${carToEdit._id}`, data, config);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/cars`, data, config);
      }
      
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${carToEdit ? 'update' : 'add'} car.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 className="text-2xl font-bold text-dark">{carToEdit ? 'Edit Car Listing' : 'Add New Car'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-8">
          {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100">{error}</div>}
          
          <form id="add-car-form" onSubmit={handleSubmit} className="space-y-8">
            {/* General Info */}
            <section>
              <h3 className="text-lg font-bold text-dark mb-4 border-l-4 border-primary pl-3">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Listing Title</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Honda Civic ZX 2021" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Brand</label>
                  <input type="text" name="brand" value={formData.brand} onChange={handleChange} required placeholder="e.g. Honda" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Model</label>
                  <input type="text" name="model" value={formData.model} onChange={handleChange} required placeholder="e.g. Civic" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
                  <input type="number" name="year" value={formData.year} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} required placeholder="e.g. 1500000" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none" />
                </div>
              </div>
            </section>

            {/* Specifications */}
            <section>
              <h3 className="text-lg font-bold text-dark mb-4 border-l-4 border-primary pl-3">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none">
                    {['Sedan', 'Hatchback', 'SUV', 'Coupe', 'Convertible', 'Wagon', 'Van', 'Truck'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Transmission</label>
                  <select name="transmission" value={formData.transmission} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none">
                    {['Automatic', 'Manual', 'AMT', 'CVT'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Fuel Type</label>
                  <select name="fuel" value={formData.fuel} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none">
                    {['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Ownership</label>
                  <select name="ownership" value={formData.ownership} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none">
                    {['1st Owner', '2nd Owner', '3rd Owner', '4th Owner', 'More than 4'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">KM Driven</label>
                  <input type="number" name="kmDriven" value={formData.kmDriven} onChange={handleChange} required placeholder="e.g. 25000" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="e.g. Mumbai, MH" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none" />
                </div>
              </div>
            </section>

            {/* Images */}
            <section>
              <h3 className="text-lg font-bold text-dark mb-4 border-l-4 border-primary pl-3">Images</h3>
              <div className="flex flex-wrap gap-4 mb-4">
                {images.map((img, index) => (
                  <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                    <img src={URL.createObjectURL(img)} alt="preview" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full shadow-md">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all text-gray-400 hover:text-primary">
                  <Upload className="w-6 h-6 mb-1" />
                  <span className="text-[10px] font-bold uppercase">Upload</span>
                  <input type="file" multiple onChange={handleImageChange} className="hidden" accept="image/*" />
                </label>
              </div>
            </section>

            {/* Details */}
            <section>
              <h3 className="text-lg font-bold text-dark mb-4 border-l-4 border-primary pl-3">Additional Details</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Features (comma separated)</label>
                  <input type="text" name="features" value={formData.features} onChange={handleChange} placeholder="e.g. Sunroof, Alloy Wheels, Cruise Control" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Describe the car's condition, history, etc." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none resize-none"></textarea>
                </div>
              </div>
            </section>
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex justify-end gap-4 bg-gray-50">
          <button onClick={onClose} type="button" className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button 
            form="add-car-form" 
            type="submit" 
            disabled={loading}
            className="bg-dark hover:bg-gray-800 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-dark/20 disabled:opacity-70 flex items-center gap-2"
          >
            {loading ? (carToEdit ? 'Updating...' : 'Adding...') : <>{carToEdit ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />} {carToEdit ? 'Update Listing' : 'Add Listing'}</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCarModal;
