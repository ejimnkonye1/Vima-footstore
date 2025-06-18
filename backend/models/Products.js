 const  mongoose = require("mongoose")

 const Schema = mongoose.Schema

 const ProductSchema =  new Schema({
  name: {
        type: String,
        required: true
    },
     image: { type: String, required: true },
    price: {
        type: Number,
        required: true
    },
        description: {
        type: String,
        required: true
    },
  category: {
    type: String,
    required: [true, "Category is required (men, women, or kids)"], // Custom error message
    enum: {
      values: ["men", "women", "kids"],
      message: "{VALUE} is not supported. Use: men, women, or kids", // Validation error
    },
       trim: true
  },

 });

 module.exports = mongoose.model("Product", ProductSchema)