import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Trash2, Edit, Plus, MessageSquare, Car, LogOut, CheckCircle2 } from 'lucide-react';
import AddCarModal from '../components/AddCarModal';

const AdminDashboard = () => {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('cars'); // 'cars' or 'messages'
  const [cars, setCars] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Add Car State
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [addingCar, setAddingCar] = useState(false);
  const [editingCarId, setEditingCarId] = useState(null);
  const [removeImages, setRemoveImages] = useState(false);
  const [carFormData, setCarFormData] = useState({
    brand: '', model: '', variant: '', year: '', price: '',
    category: 'Sedan', transmission: 'Manual', fuel: 'Petrol',
    ownership: '1st Owner', kmDriven: '', location: '',
    features: '', description: ''
  });
  const [carImages, setCarImages] = useState([]);

  // Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/login`, { username, password });
      setToken(data.token);
      localStorage.setItem('adminToken', data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('adminToken');
  };

  // Fetch Data
  const fetchData = async () => {
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      if (activeTab === 'cars') {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars?sort=createdAt`);
        setCars(data);
      } else {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/contact`, config);
        setMessages(data);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        handleLogout();
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token, activeTab]);

  const handleDeleteCar = async (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/cars/${id}`, config);
        setCars(cars.filter(car => car._id !== id));
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete car');
      }
    }
  };

  const handleEditClick = (car) => {
    setEditingCar(car);
    setShowAddModal(true);
  };

  const markMessageRead = async (id, currentStatus) => {
    if (currentStatus === 'Read') return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(`${import.meta.env.VITE_API_URL}/api/contact/${id}`, { status: 'Read' }, config);
      setMessages(messages.map(msg => msg._id === id ? { ...msg, status: 'Read' } : msg));
    } catch (err) {
      console.error('Failed to update message status', err);
    }
  };

  const deleteMessage = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/contact/${id}`, config);
        setMessages(messages.filter(msg => msg._id !== id));
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete message');
      }
    }
  };

  const handleAddCarSubmit = async (e) => {
    e.preventDefault();
    if (carImages.length > 4) {
      alert('Please select a maximum of 4 images for the car.');
      return;
    }
    setAddingCar(true);
    try {
      const config = { 
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        } 
      };
      
      const formData = new FormData();
      Object.keys(carFormData).forEach(key => {
        if (key === 'features') {
          // split by comma and convert to JSON string array for backend
          const featuresArray = carFormData[key].split(',').map(f => f.trim()).filter(f => f !== '');
          formData.append(key, JSON.stringify(featuresArray));
        } else {
          formData.append(key, carFormData[key]);
        }
      });

      // Append images
      Array.from(carImages).forEach(file => {
        formData.append('images', file);
      });

      if (removeImages) {
        formData.append('removeImages', 'true');
      }

      if (editingCarId) {
        const { data } = await axios.put(`http://localhost:5000/api/cars/${editingCarId}`, formData, config);
        setCars(cars.map(c => c._id === editingCarId ? data : c));
      } else {
        const { data } = await axios.post('http://localhost:5000/api/cars', formData, config);
        setCars([data, ...cars]);
      }

      setShowAddCarModal(false);
      // Reset form
      setCarFormData({
        brand: '', model: '', variant: '', year: '', price: '',
        category: 'Sedan', transmission: 'Manual', fuel: 'Petrol',
        ownership: '1st Owner', kmDriven: '', location: '',
        features: '', description: ''
      });
      setCarImages([]);
      setEditingCarId(null);
      setRemoveImages(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save car');
    } finally {
      setAddingCar(false);
    }
  };

  const handleOpenAddModal = () => {
    setCarFormData({
      brand: '', model: '', variant: '', year: '', price: '',
      category: 'Sedan', transmission: 'Manual', fuel: 'Petrol',
      ownership: '1st Owner', kmDriven: '', location: '',
      features: '', description: ''
    });
    setEditingCarId(null);
    setCarImages([]);
    setRemoveImages(false);
    setShowAddCarModal(true);
  };

  const handleEditCarClick = (car) => {
    setCarFormData({
      brand: car.brand || '',
      model: car.model || '',
      variant: car.variant || '',
      year: car.year || '',
      price: car.price || '',
      category: car.category || 'Sedan',
      transmission: car.transmission || 'Manual',
      fuel: car.fuel || 'Petrol',
      ownership: car.ownership || '1st Owner',
      kmDriven: car.kmDriven || '',
      location: car.location || '',
      features: car.features ? car.features.join(', ') : '',
      description: car.description || ''
    });
    setEditingCarId(car._id);
    setCarImages([]);
    setRemoveImages(false);
    setShowAddCarModal(true);
  };

  const handleCarFormChange = (e) => {
    setCarFormData({ ...carFormData, [e.target.name]: e.target.value });
  };

  // If not logged in, show login form
  if (!token) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex items-center justify-center bg-black px-4">
        <Helmet><title>Admin Login | Solid Cars</title></Helmet>
        <div className="bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800 w-full max-w-md">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Admin Access</h2>
          {error && <div className="bg-red-900/50 text-red-400 border border-red-800 p-3 rounded-lg mb-4 text-sm font-medium">{error}</div>}
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                placeholder="Enter username"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-70"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-black">
      <Helmet><title>Admin Dashboard | Solid Cars</title></Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-800 mb-8 gap-4">
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('cars')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'cars' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              <Car className="w-4 h-4" /> Manage Cars
            </button>
            <button 
              onClick={() => setActiveTab('messages')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'messages' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              <MessageSquare className="w-4 h-4" /> Messages
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-400 hover:text-red-500 px-2 font-medium transition-colors border-l pl-4 border-gray-700"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="bg-gray-900 rounded-2xl shadow-sm border border-gray-800 overflow-hidden">
            {activeTab === 'cars' && (
              <div>
                <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white">Inventory ({cars.length})</h2>
                  {/* Plus button to add car */}
                  <button 
                    onClick={handleOpenAddModal}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add New Car
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-800/50 text-gray-400 text-sm uppercase tracking-wider border-b border-gray-800">
                        <th className="p-4 font-medium">Image</th>
                        <th className="p-4 font-medium">Model</th>
                        <th className="p-4 font-medium">Price</th>
                        <th className="p-4 font-medium">Category</th>
                        <th className="p-4 font-medium">Date Added</th>
                        <th className="p-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {cars.map((car) => (
                        <tr key={car._id} className="hover:bg-gray-800/50 transition-colors">
                          <td className="p-4">
                            <img src={car.images && car.images[0] ? `${import.meta.env.VITE_API_URL}${car.images[0]}` : 'https://via.placeholder.com/80x60'} alt={`${car.brand} ${car.model}`} className="w-16 h-12 object-cover rounded-md" />
                          </td>
                          <td className="p-4">
                            <p className="font-bold text-white">{car.brand} {car.model} {car.variant}</p>
                            <p className="text-xs text-gray-400">{car.year} • {car.kmDriven} km</p>
                          </td>
                          <td className="p-4 font-medium text-primary line-clamp-1 truncate block w-24">
                            ₹{car.price ? (typeof car.price === 'number' ? car.price.toLocaleString('en-IN') : car.price) : '0'}
                          </td>
                          <td className="p-4">
                            <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs font-medium">{car.category}</span>
                          </td>
                          <td className="p-4">
                            <span className="text-gray-400 text-sm font-medium">{new Date(car.createdAt).toLocaleDateString()}</span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-3">
                              <button onClick={() => handleEditCarClick(car)} className="text-blue-400 hover:bg-blue-500/10 p-2 rounded-md transition-colors" title="Edit">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDeleteCar(car._id)} className="text-red-400 hover:bg-red-500/10 p-2 rounded-md transition-colors" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div>
                <div className="p-6 border-b border-gray-800">
                  <h2 className="text-xl font-bold text-white">Customer Messages ({messages.length})</h2>
                </div>
                <div className="divide-y divide-gray-800">
                  {messages.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">No messages found.</div>
                  ) : (
                    messages.map((msg) => (
                      <div key={msg._id} className={`p-6 transition-colors ${msg.status === 'Unread' ? 'bg-primary/10' : ''}`}>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-white text-lg flex items-center gap-2">
                              {msg.name} 
                              {msg.status === 'Unread' && <span className="bg-primary text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">New</span>}
                            </h3>
                            <p className="text-sm text-gray-400 flex gap-4 mt-1">
                              <a href={`mailto:${msg.email}`} className="hover:text-primary transition-colors">{msg.email}</a>
                              <a href={`tel:${msg.phone}`} className="hover:text-primary transition-colors">{msg.phone}</a>
                            </p>
                          </div>
                          <div className="text-xs text-gray-500 font-medium">
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <p className="text-gray-300 bg-gray-800 p-4 rounded-xl border border-gray-700 mb-4 whitespace-pre-wrap">
                          {msg.message}
                        </p>
                        <div className="flex justify-end gap-3">
                          {msg.status !== 'Read' && (
                            <button 
                              onClick={() => markMessageRead(msg._id, msg.status)}
                              className="flex items-center gap-1.5 text-green-400 font-medium text-sm hover:bg-green-500/10 px-3 py-1.5 rounded-md transition-colors"
                            >
                              <CheckCircle2 className="w-4 h-4" /> Mark as Read
                            </button>
                          )}
                          <button 
                            onClick={() => deleteMessage(msg._id)}
                            className="flex items-center gap-1.5 text-red-400 font-medium text-sm hover:bg-red-500/10 px-3 py-1.5 rounded-md transition-colors"
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Car Modal */}
      {showAddCarModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">{editingCarId ? 'Edit Car Details' : 'Add New Car'}</h2>
              <button onClick={() => setShowAddCarModal(false)} className="text-gray-400 hover:text-white transition-colors">
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="add-car-form" onSubmit={handleAddCarSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Brand</label>
                  <input required name="brand" value={carFormData.brand} onChange={handleCarFormChange} className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-primary outline-none" placeholder="Honda" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Model</label>
                    <input required name="model" value={carFormData.model} onChange={handleCarFormChange} className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-primary outline-none" placeholder="City" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Variant</label>
                    <input required name="variant" value={carFormData.variant} onChange={handleCarFormChange} className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-primary outline-none" placeholder="1.5 i-VTEC V" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Year</label>
                    <input required type="number" name="year" value={carFormData.year} onChange={handleCarFormChange} className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-primary outline-none" placeholder="2018" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Price (₹)</label>
                    <input required type="number" name="price" value={carFormData.price} onChange={handleCarFormChange} className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-primary outline-none" placeholder="850000" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                  <select name="category" value={carFormData.category} onChange={handleCarFormChange} className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-primary outline-none">
                    {['Sedan', 'Hatchback', 'SUV', 'Coupe', 'Convertible', 'Wagon', 'Van', 'Truck', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Transmission</label>
                  <select name="transmission" value={carFormData.transmission} onChange={handleCarFormChange} className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-primary outline-none">
                    {['Automatic', 'Manual', 'AMT', 'CVT'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Fuel</label>
                  <select name="fuel" value={carFormData.fuel} onChange={handleCarFormChange} className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-primary outline-none">
                    {['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'].map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Ownership</label>
                  <select name="ownership" value={carFormData.ownership} onChange={handleCarFormChange} className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-primary outline-none">
                    {['1st Owner', '2nd Owner', '3rd Owner', '4th Owner', 'More than 4'].map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">KM Driven</label>
                    <input required type="number" name="kmDriven" value={carFormData.kmDriven} onChange={handleCarFormChange} className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-primary outline-none" placeholder="45000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
                    <input required name="location" value={carFormData.location} onChange={handleCarFormChange} className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-primary outline-none" placeholder="Mumbai" />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Features (Comma separated)</label>
                  <input name="features" value={carFormData.features} onChange={handleCarFormChange} className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-primary outline-none" placeholder="Sunroof, Alloy Wheels, Cruise Control" />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                  <textarea name="description" value={carFormData.description} onChange={handleCarFormChange} rows={3} className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-primary outline-none resize-none" placeholder="Well maintained, low mileage..." />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Upload Images (Max 4){editingCarId ? ' — Selecting new images will append to or replace existing' : ''}</label>
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={(e) => setCarImages(e.target.files)} 
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary/90 outline-none"
                  />
                  {carImages.length > 0 && <p className={`text-xs mt-2 ${carImages.length > 4 ? 'text-red-400' : 'text-gray-400'}`}>{carImages.length} file(s) selected (Max 4).</p>}
                </div>

                {editingCarId && (
                   <div className="md:col-span-2 flex items-center gap-2 mt-2">
                     <input type="checkbox" id="removeImages" checked={removeImages} onChange={(e) => setRemoveImages(e.target.checked)} className="w-4 h-4 text-primary bg-gray-800 border-gray-700 rounded focus:ring-primary" />
                     <label htmlFor="removeImages" className="text-sm font-medium text-red-400">Remove all existing images</label>
                   </div>
                )}
              </form>
            </div>
            
            <div className="p-6 border-t border-gray-800 flex justify-end gap-4">
              <button 
                onClick={() => setShowAddCarModal(false)}
                className="px-6 py-2 rounded-lg font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                disabled={addingCar}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                form="add-car-form"
                disabled={addingCar}
                className="px-6 py-2 rounded-lg font-medium bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-70"
              >
                {addingCar ? 'Saving...' : (editingCarId ? 'Update Car' : 'Add Car')}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
