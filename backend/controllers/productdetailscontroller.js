const Products = require("../models/Products");

const productDetails = async (req, res) => {
  const { name } = req.params; // Extract name from params
  
  console.log(`Name: ${name}`);
  
  try {
    // Use findOne to search for the product by name
    const foundProduct = await Products.findOne({ name: name });
    
    if (!foundProduct) return res.status(404).send('Product not found');

    res.status(200).json({
      name: foundProduct.name,
      price: foundProduct.price,
      image: foundProduct.image,
      description: foundProduct.description,
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

module.exports = { productDetails };
