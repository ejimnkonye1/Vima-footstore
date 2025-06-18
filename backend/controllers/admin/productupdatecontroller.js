
const { Types } = require('mongoose');
const Products = require("../../models/Products");

const updateProduct = async (req, res) => {
    const { id, newName, price, description, category } = req.body;
    
    // Validate the ID
    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product ID format' });
    }

    const updates = {};
    if (newName) updates.name = newName;
    if (price !== undefined) updates.price = price;
    if (description !== undefined) updates.description = description;
    if (category !== undefined) updates.category = category;

    if (Object.keys(updates).length === 0) {
        return res.status(400).send('Invalid request: No fields to update');
    }
    
    try {
        const updatedProduct = await Products.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).send('Product not found');
        }

        res.status(200).json({
            message: 'Success',
            updatedProduct: updatedProduct
        });
        
    } catch (err) {
        console.error('Update error:', err);
        res.status(500).json({ 
            message: err.message || 'Internal server error' 
        });
    }
}
module.exports = { updateProduct };