const Products = require("../../models/Products");

const updateProduct = async (req, res) => {
    const { oldName, newName, price, description, category } = req.body; // Extract old name, new name, and price from the request body
  console.log("name",oldName, "new", newName)
    const updates = {};
    if (newName) updates.name = newName; // Update name if provided
    if (price !== undefined) updates.price = price; // Update price if provided
 if (description !== undefined) updates.description= description; 
  if (category !== undefined) updates.category = category; 
    if (Object.keys(updates).length === 0) {
        return res.status(400).send('Invalid request: No fields to update');
    }
    
    try {
        // Find the product by the old name and update it
        const updatedProduct = await Products.findOneAndUpdate(
            { name: oldName }, // Find by the old name
            updates,
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).send('Product not found');
        }
 console.log(updateProduct)
        res.status(200).json({
            message: 'Success',
            updatedProduct: updatedProduct
        });
        
    } catch (err) {
        console.error(err);
        console.log(err.message)
        res.status(500).json({ message: err.message });
    }
}

module.exports = { updateProduct };
