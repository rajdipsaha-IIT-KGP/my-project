const express = require('express');
const cors = require('cors');
let app = express();

app.use(cors()); 
app.use(express.json()); 

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'secretkey123';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { UserModel } = require('./db');

mongoose.connect('mongodb+srv://rajdipsaha7697:Rajdip%402006@rajdip.r4ziwjt.mongodb.net/Demo')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));
  app.post('/signup',async function(req,res){
    const {name,email,password} = req.body
    if(!name || !email || !password)
        return res.status(400).json({
      message:'All fields are required'
    })
    try{
        let existingUser = await UserModel.findOne({email})
        if(existingUser)
            return res.status(400).json({
        message:'User already exist'
            })
        
        const passwordhash = await bcrypt.hash(password,5)
        const newUser = await UserModel.create({
        name,
        email,
        password:passwordhash
        })
      const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
      return res.json({
        message:"User created successfully",
        token:token,
       user:{
        id: newUser._id,
        name: newUser.name,
        email: newUser.email

       }})
    }
    catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
  })
  app.listen(3000, function () {
  console.log("Server started on port 3000");
});