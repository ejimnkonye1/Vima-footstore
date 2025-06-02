require('dotenv').config()
const http = require("http")
const express = require("express")
const app = express()
const cors  = require("cors")
const corsOption = require("./config/corOption")
const errorHandler = require("./middleware/errorHandler")
const verifyJWT = require('./middleware/verifyjwt')
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const connectDB = require('./config/dbConn')
const bodyParser = require('body-parser');
const { handlePaystackWebhook } = require('./controllers/ordercontroller')

const PORT = process.env.PORT || 4500


// connectDB

connectDB()

// cors 
app.use(cors(corsOption));
app.use(express.urlencoded({extended:false}))

// built in middleware for json
app.use(express.json());

// middlewRE FOR COOKIES
app.use(cookieParser())
app.use(bodyParser.json());

 app.get("/",(req, res) => {
  res.send("Hello world")
})

// routes
app.use("/login", require("./routes/login"))
app.use("/register", require("./routes/register"))
app.use("/refresh", require("./routes/refresh"))

// free routes
app.use("/products", require("./routes/product"))
app.use('/product', require('./routes/productdetails'));
app.use('/search', require('./routes/searchproduct'));
app.use('/user', require('./routes/userprofile'));
app.use('/api/updateuser', require('./routes/userupdate'));
// app.use('/updateproduct', require('./routes/updateproduct'));
// app.use('/deleteproduct', require('./routes/deleteproduct'));
app.use('/api/orders', require('./routes/order'));

// Paystack webhook needs raw body for signature verification
app.post('/api/orders/webhook', 
  bodyParser.raw({ type: 'application/json' }), 
  handlePaystackWebhook
);


// verify token
app.use(verifyJWT)
//admin route
app.use('/api/admin/getallusers', require('./routes/admin/getallusers'));
app.use('/api/admin/getallorders', require('./routes/admin/getallorders'));
app.use('/api/admin/products', require('./routes/admin/products'));

//error handler
app.use(errorHandler)

//port
mongoose.connection.once("open", () => {
    console.log("connected to MonogoDB")
    app.listen(PORT, () => {
        console.log(`server is running on ${PORT}`)
    });
})
