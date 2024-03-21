const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()

const connectDB = async () => {
  mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected!'));
}

module.exports = connectDB