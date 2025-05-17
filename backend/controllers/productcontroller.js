const  Products = require("../models/Products")


const getAllProducts = async (req, res) => {
    try  {
  const Product = await Products.find()
  if(!Product) return res.status(204).json({"message":"No products was found"})

  return  res.json(Product)
    }catch(err){
        console.error(err); // Use console.error for errors
        return res.status(500).json({ error: err.message }); 
    }
}






module.exports = {
   getAllProducts,
}