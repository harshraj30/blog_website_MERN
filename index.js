const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const app = express();
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const blogRoute = require('./routes/blog');

dotenv.config();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/api/auth', authRoute)
app.use('/api', blogRoute)


app.listen(3000, () => {
  console.log('Server is running on port 3000');
  connectDB();
})