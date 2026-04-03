const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  variant: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Sedan', 'Hatchback', 'SUV', 'Coupe', 'Convertible', 'Wagon', 'Van', 'Truck', 'Other']
  },
  transmission: {
    type: String,
    required: true,
    enum: ['Automatic', 'Manual', 'AMT', 'CVT']
  },
  fuel: {
    type: String,
    required: true,
    enum: ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid']
  },
  ownership: {
    type: String,
    required: true,
    enum: ['1st Owner', '2nd Owner', '3rd Owner', '4th Owner', 'More than 4']
  },
  kmDriven: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  features: [{
    type: String
  }],
  description: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Car', carSchema);
