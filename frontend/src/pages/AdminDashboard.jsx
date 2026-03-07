import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Trash2, Edit, Plus, MessageSquare, Car, LogOut, CheckCircle2 } from 'lucide-react';

const AdminDashboard = () => {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('cars'); // 'cars' or 'messages'
  const [cars, setCars] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post('http://localhost:5000/api/admin/login', { username, password });
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
        const { data } = await axios.get('http://localhost:5000/api/cars?sort=createdAt');
        setCars(data);
      } else {
        const { data } = await axios.get('http://localhost:5000/api/contact', config);
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
        await axios.delete(`http://localhost:5000/api/cars/${id}`, config);
        setCars(cars.filter(car => car._id !== id));
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete car');
      }
    }
  };

  const markMessageRead = async (id, currentStatus) => {
    if (currentStatus === 'Read') return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put(`http://localhost:5000/api/contact/${id}`, { status: 'Read' }, config);
      setMessages(messages.map(msg => msg._id === id ? { ...msg, status: 'Read' } : msg));
    } catch (err) {
      console.error('Failed to update message status', err);
    }
  };

  const deleteMessage = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(`http://localhost:5000/api/contact/${id}`, config);
        setMessages(messages.filter(msg => msg._id !== id));
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete message');
      }
    }
  };

  // If not logged in, show login form
  if (!token) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex items-center justify-center bg-gray-50 px-4">
        <Helmet><title>Admin Login | Solid Cars</title></Helmet>
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md">
          <h2 className="text-3xl font-bold text-dark mb-6 text-center">Admin Access</h2>
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm font-medium">{error}</div>}
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-dark hover:bg-gray-800 text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-70"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <Helmet><title>Admin Dashboard | Solid Cars</title></Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 gap-4">
          <h1 className="text-2xl font-bold text-dark">Dashboard Overview</h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('cars')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'cars' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <Car className="w-4 h-4" /> Manage Cars
            </button>
            <button 
              onClick={() => setActiveTab('messages')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'messages' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <MessageSquare className="w-4 h-4" /> Messages
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-500 hover:text-red-500 px-2 font-medium transition-colors border-l pl-4 border-gray-200"
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
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {activeTab === 'cars' && (
              <div>
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-dark">Inventory ({cars.length})</h2>
                  {/* Plus button to add car (functionality to be implemented, e.g., an AddCarModal component) */}
                  <button className="flex items-center gap-2 bg-dark text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                    <Plus className="w-4 h-4" /> Add New Car
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                        <th className="p-4 font-medium">Image</th>
                        <th className="p-4 font-medium">Model</th>
                        <th className="p-4 font-medium">Price</th>
                        <th className="p-4 font-medium">Category</th>
                        <th className="p-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {cars.map((car) => (
                        <tr key={car._id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4">
                            <img src={car.images && car.images[0] ? `http://localhost:5000${car.images[0]}` : 'https://via.placeholder.com/80x60'} alt={car.title} className="w-16 h-12 object-cover rounded-md" />
                          </td>
                          <td className="p-4">
                            <p className="font-bold text-dark">{car.title}</p>
                            <p className="text-xs text-gray-500">{car.year} • {car.kmDriven} km</p>
                          </td>
                          <td className="p-4 font-medium text-primary line-clamp-1 truncate block w-24">
                            ₹{car.price.toLocaleString('en-IN')}
                          </td>
                          <td className="p-4">
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">{car.category}</span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-3">
                              <button className="text-blue-500 hover:bg-blue-50 p-2 rounded-md transition-colors" title="Edit (Coming soon)">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDeleteCar(car._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors" title="Delete">
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
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-dark">Customer Messages ({messages.length})</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {messages.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No messages found.</div>
                  ) : (
                    messages.map((msg) => (
                      <div key={msg._id} className={`p-6 transition-colors ${msg.status === 'Unread' ? 'bg-primary/5' : ''}`}>
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-dark text-lg flex items-center gap-2">
                              {msg.name} 
                              {msg.status === 'Unread' && <span className="bg-primary text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">New</span>}
                            </h3>
                            <p className="text-sm text-gray-500 flex gap-4 mt-1">
                              <a href={`mailto:${msg.email}`} className="hover:text-primary transition-colors">{msg.email}</a>
                              <a href={`tel:${msg.phone}`} className="hover:text-primary transition-colors">{msg.phone}</a>
                            </p>
                          </div>
                          <div className="text-xs text-gray-400 font-medium">
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <p className="text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4 whitespace-pre-wrap">
                          {msg.message}
                        </p>
                        <div className="flex justify-end gap-3">
                          {msg.status !== 'Read' && (
                            <button 
                              onClick={() => markMessageRead(msg._id, msg.status)}
                              className="flex items-center gap-1.5 text-green-600 font-medium text-sm hover:bg-green-50 px-3 py-1.5 rounded-md transition-colors"
                            >
                              <CheckCircle2 className="w-4 h-4" /> Mark as Read
                            </button>
                          )}
                          <button 
                            onClick={() => deleteMessage(msg._id)}
                            className="flex items-center gap-1.5 text-red-500 font-medium text-sm hover:bg-red-50 px-3 py-1.5 rounded-md transition-colors"
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
    </div>
  );
};

export default AdminDashboard;
