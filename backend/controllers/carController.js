const Car = require('../models/Car');

// @desc    Fetch all cars
// @route   GET /api/cars
// @access  Public
const getCars = async (req, res) => {
  try {
    const { category, make, minPrice, maxPrice, year, sort } = req.query;

    let query = {};

    if (category) query.category = category;
    if (make) query.brand = { $regex: make, $options: 'i' };
    if (year) query.year = year;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortObj = { createdAt: -1 }; // Default: Newest
    if (sort === 'priceLowToHigh') sortObj = { price: 1 };
    if (sort === 'priceHighToLow') sortObj = { price: -1 };

    const cars = await Car.find(query).sort(sortObj);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Fetch single car
// @route   GET /api/cars/:id
// @access  Public
const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ message: 'Car not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a car
// @route   POST /api/cars
// @access  Private/Admin
const createCar = async (req, res) => {
  try {
    const {
      brand, model, variant, year, price, category,
      transmission, fuel, ownership, kmDriven, location,
      features, description
    } = req.body;

    // Handle uploaded images
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    const car = new Car({
      brand,
      model,
      variant,
      year,
      price,
      category,
      transmission,
      fuel,
      ownership,
      kmDriven,
      location,
      features: features ? JSON.parse(features) : [],
      description,
      images
    });

    const createdCar = await car.save();
    res.status(201).json(createdCar);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a car
// @route   PUT /api/cars/:id
// @access  Private/Admin
const updateCar = async (req, res) => {
  try {
    const {
      brand, model, variant, year, price, category,
      transmission, fuel, ownership, kmDriven, location,
      features, description, removeImages
    } = req.body;

    const car = await Car.findById(req.params.id);

    if (car) {
      car.brand = brand || car.brand;
      car.model = model || car.model;
      car.variant = variant || car.variant;
      car.year = year || car.year;
      car.price = price || car.price;
      car.category = category || car.category;
      car.transmission = transmission || car.transmission;
      car.fuel = fuel || car.fuel;
      car.ownership = ownership || car.ownership;
      car.kmDriven = kmDriven || car.kmDriven;
      car.location = location || car.location;
      
      if (features) car.features = JSON.parse(features);
      if (description) car.description = description;

      if (removeImages === 'true') {
        car.images = [];
      }

      // Handle new uploaded images
      if (req.files && req.files.length > 0) {
        const newImages = req.files.map(file => `/uploads/${file.filename}`);
        car.images = [...car.images, ...newImages];
      }

      const updatedCar = await car.save();
      res.json(updatedCar);
    } else {
      res.status(404).json({ message: 'Car not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a car
// @route   DELETE /api/cars/:id
// @access  Private/Admin
const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (car) {
      // In a real app we might want to delete the images from the file system too using fs.unlink
      await car.deleteOne();
      res.json({ message: 'Car removed' });
    } else {
      res.status(404).json({ message: 'Car not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};
