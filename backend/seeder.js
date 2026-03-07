const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Car = require('./models/Car');
const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/solidcars')
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

const mockCars = [
  {
    title: 'Honda Civic ZX 2021',
    brand: 'Honda',
    model: 'Civic',
    year: 2021,
    price: 1850000,
    category: 'Sedan',
    transmission: 'CVT',
    fuel: 'Petrol',
    ownership: '1st Owner',
    kmDriven: 25000,
    location: 'Mumbai, MH',
    description: 'Immaculate condition Honda Civic ZX. Fully loaded with sunroof, leather interior, and advanced safety features. Zero depreciation insurance valid till Dec 2024.',
    features: ['Sunroof', 'Leather Seats', 'Apple CarPlay', 'Cruise Control', 'Push Button Start'],
    images: []
  },
  {
    title: 'Mercedes-Benz GLC 300 2019',
    brand: 'Mercedes-Benz',
    model: 'GLC',
    year: 2019,
    price: 4500000,
    category: 'SUV',
    transmission: 'Automatic',
    fuel: 'Diesel',
    ownership: '1st Owner',
    kmDriven: 48000,
    location: 'Delhi, DL',
    description: 'Premium SUV with panoramic sunroof and Burmester audio. Showroom condition, always serviced at authorized Mercedes service center.',
    features: ['Panoramic Sunroof', 'Burmester Audio', 'Ambient Lighting', '360 Camera', 'Air Suspension'],
    images: []
  },
  {
    title: 'Hyundai i20 Asta(O) 2022',
    brand: 'Hyundai',
    model: 'i20',
    year: 2022,
    price: 920000,
    category: 'Hatchback',
    transmission: 'Manual',
    fuel: 'Petrol',
    ownership: '1st Owner',
    kmDriven: 12000,
    location: 'Bangalore, KA',
    description: 'Top end i20 Asta(O) variant. Extremely peppy engine, great mileage, and modern tech features including BlueLink connected car tech.',
    features: ['Sunroof', 'Wireless Charging', 'BlueLink', 'Bose Premium Sound', 'Digital Instrument Cluster'],
    images: []
  },
  {
    title: 'BMW 3 Series 330i M Sport 2020',
    brand: 'BMW',
    model: '3 Series',
    year: 2020,
    price: 4100000,
    category: 'Sedan',
    transmission: 'Automatic',
    fuel: 'Petrol',
    ownership: '2nd Owner',
    kmDriven: 32000,
    location: 'Pune, MH',
    description: 'The ultimate driving machine. Portimao Blue exterior. Thrilling performance with excellent handling.',
    features: ['M Sport Package', 'Head-Up Display', 'Harman Kardon Audio', 'Laser Lights', 'Gesture Control'],
    images: []
  },
  {
    title: 'Toyota Fortuner Legender 2021',
    brand: 'Toyota',
    model: 'Fortuner',
    year: 2021,
    price: 4250000,
    category: 'SUV',
    transmission: 'Automatic',
    fuel: 'Diesel',
    ownership: '1st Owner',
    kmDriven: 41000,
    location: 'Chennai, TN',
    description: 'Aggressive styling and unmatched reliability. The Fortuner Legender comes with premium interior and powerful diesel engine.',
    features: ['Ventilated Seats', 'Wireless Charger', 'Kick Sensor Tailgate', 'JBL Audio', 'Dual Tone Roof'],
    images: []
  }
];

const seedData = async () => {
  try {
    // Clear existing data
    await Car.deleteMany();
    await Admin.deleteMany();
    console.log('Data Cleared');

    // Insert Cars
    await Car.insertMany(mockCars);

    // Insert Admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    await Admin.create({
      username: 'admin',
      password: hashedPassword
    });

    console.log('Data Imported Successfully');
    console.log('Admin login -> username: admin, password: admin123');
    process.exit();
  } catch (error) {
    console.error('Error importing data: ', error);
    process.exit(1);
  }
};

seedData();
