const axios = require('axios');

async function verify() {
  try {
    const res = await axios.get('http://localhost:5000/api/cars');
    console.log('Total cars in DB:', res.data.length);
    console.log('First car model:', res.data[0]?.model);
  } catch (err) {
    console.error('Verification failed:', err.message);
  }
}

verify();
