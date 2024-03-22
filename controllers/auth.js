const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET = process.env.SECRET_KEY;

// controller for login a user
const login = async (req, res) => {
  const { name, password } = req.body;
  const userDoc = await User.findOne({ username:name });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      // logged in
      jwt.sign({ name, id: userDoc._id }, SECRET, {}, (err, token) => {
        if (err) throw err;
        req.session.user = userDoc
        return res.send({status:"success" , userDoc , token})
      });
    } else {
      return res.status(400).json('wrong credentials');
    }
  }
  else {
    return res.status(400).json('no user found')
  }
}


const getSession = async (req,res)=>{
  const user = await User.findOne({username : req.params.username})
  res.send(user)
}



// controller for register a user
const register = async (req, res) => {
  const { name, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const userDoc = await User.create({
      username:name,
      password: bcrypt.hashSync(password, salt),
    });
    // jwt.sign({ username, id: userDoc._id }, SECRET, {}, (err, token) => {
    //     if (err) throw err;
    //     res.cookie('token', token).json({
    //       id: userDoc._id,
    //       username,
    //     });
    //   });
    return res.send({status:"success" ,userDoc});
  } catch (e) {
    console.log(e);
    return res.send({status:"fail" , msg:"something went wrong"});
  }
}

// Controller for retrieving user profile
const profile = (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, SECRET, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
}

//controller for logging out a user
const logout = (req, res) => {
  res.cookie('token', '').json('ok');
}

module.exports = { login, register, profile, logout , getSession };
