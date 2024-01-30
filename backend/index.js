const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const dotenv=require('dotenv').config()

const app=express()
app.use(cors())
app.use(express.json({limit : '10mb'}))

const PORT=process.env.PORT || 8080

//mongodb connection
console.log(process.env.MONGODB_URL);
mongoose.set('strictQuery',false);
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log('connected ot database'))
.catch((err)=>console.log(err));

//schema
const userSchema=mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    confirmPassword: String,
    image: String
})

//model
const userModel=mongoose.model("user",userSchema);

app.get("/",(req,res)=>{
    res.send("Server is running");
})
app.post("/signup",async(req,res)=>{
    console.log(req.body)
    try {
        const { email } = req.body;
    
        // Check if the email is already registered
        const result = await userModel.findOne({ email });
    
        if (result) {
          // Email is already registered
          res.send({ message: 'Email id is already registered',alert: false });
        } else {
          // Create a new user and save to the database
          const newUser = new userModel(req.body);
          await newUser.save();
          res.send({ message: 'Successfully signed up',alert: true });
        }
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
      }
    
})

app.listen(PORT,()=>{
    console.log("Server is running at port : "+PORT)
})