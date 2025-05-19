const Products = require("../models/Products");

const updateProduct = async (req, res) => {
    const { oldName, newName, price } = req.body; // Extract old name, new name, and price from the request body

    const updates = {};
    if (newName) updates.name = newName; // Update name if provided
    if (price !== undefined) updates.price = price; // Update price if provided

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

        res.status(200).json({
            message: 'Success',
            updatedProduct: updatedProduct
        });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

module.exports = { updateProduct };
