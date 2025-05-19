const Products = require("../models/Products");

const deleteProduct = async (req, res) => {
  const { name } = req.body; // Extract the product name from the request body
  
  try {
    // Find the product by name
    const foundProduct = await Products.findOne({ name });
    
    if (!foundProduct) {
      return res.status(404).json({ 
        message: "Product not found",
      });
    }
    
    // Delete the product
    const deletedProduct = await Products.findOneAndDelete({ name });
    
    return res.status(200).json({
      message: `Product ${name} deleted successfully`,
      deletedProduct: deletedProduct
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

module.exports = { deleteProduct };
