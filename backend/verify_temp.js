const axios = require('axios');

async function verify() {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars`);
    console.log('Total cars in DB:', res.data.length);
    console.log('First car model:', res.data[0]?.model);
  } catch (err) {
    console.error('Verification failed:', err.message);
  }
}

verify();
