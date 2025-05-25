const Products = require("../models/Products");

const productSearch = async (req, res) => {
  const { name } = req.query; // Now using query parameters
  
  if (!name) return res.status(400).send('Search term is required');
  
  try {
    const foundProduct = await Products.find({ 
      name: { $regex: name, $options: 'i' } // Case-insensitive partial match
    });
    
    if (!foundProduct.length) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.status(200).json(
      foundProduct.map(product => ({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description
      }))
    );

    
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

module.exports = { productSearch };