const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const app = express();
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/auth');
const blogRoute = require('./routes/blog');
const session = require('express-session')


dotenv.config();

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


app.use('/api/auth', authRoute)
app.use('/api', blogRoute)


app.listen(4000, () => {
  console.log('Server is running on port 4000');
  connectDB();
})