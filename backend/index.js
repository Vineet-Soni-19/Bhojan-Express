const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require('dotenv').config()
const Stripe = require("stripe")

const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' }))

const PORT = process.env.PORT || 8080

//mongodb connection
// console.log(process.env.MONGODB_URL);
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('connected ot database'))
  .catch((err) => console.log(err));

//schema
const userSchema = mongoose.Schema({
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
const userModel = mongoose.model("user", userSchema);

//api
app.get("/", (req, res) => {
  res.send("Server is running");
})

//signup
app.post("/signup", async (req, res) => {
  // console.log(req.body)
  try {
    const { email } = req.body;

    // Check if the email is already registered
    const result = await userModel.findOne({ email });

    if (result) {
      // Email is already registered
      res.send({ message: 'Email id is already registered', alert: false });
    } else {
      // Create a new user and save to the database
      const newUser = new userModel(req.body);
      await newUser.save();
      res.send({ message: 'Successfully signed up', alert: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }

})


//login api
app.post('/login', async (req, res) => {
  // console.log(req.body);
  try {
    const { email } = req.body
    const result = await userModel.findOne({ email });
    if (result) {
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
      }
      // console.log(dataSend);
      res.send({ message: "Login is successful", alert: true, data: dataSend })
    }
    else {
      res.send({ message: 'Email is not available, please sign up', alert: false })
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error', alert: false });
  }
})

//product section
const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String
})
const productModel = mongoose.model('product', schemaProduct);

//save product in database
app.post('/uploadProduct', async (req, res) => {
  // console.log(req.body);
  const data = await productModel(req.body);
  const datasave = await data.save();
  res.send({ message: 'Upload successfully' })
})

//
app.get('/product', async (req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
})


/******* Payment *********/
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
app.post("/checkout-payment", async (req, res) => {
  // console.log(req.body);

  try {
    const params = {
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_options: [{shipping_rate: "shr_1P5NAWSDUNOc4BzWwsNyxMAn"}],
      line_items: req.body.map((item)=>{
        return{
          price_data: {
            currency : 'inr',
            product_data :{
              name: item.name,
              // images: [item.image]
            },
            unit_amount: item.price*100,
          },
          adjustable_quantity:{
            enabled: true,
            minimum: 1,
          },
          quantity: item.qty
        }
      }),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`
    }
    const session = await stripe.checkout.sessions.create(params);
    res.status(200).json(session.id);
  }
  catch(error){
    res.status(error.statusCode || 500).json(error.message);
  }
})


app.listen(PORT, () => {
  console.log("Server is running at port : " + PORT)
})