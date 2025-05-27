const path = require('path');
const Products = require("../../models/Products");
const { supabase, supabaseBucket } = require('../../supabase');

const uploadToSupabase = async (files, uid) => {
    const urls = [];
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = path.extname(file.originalname);
        const fileName = `products/${uid}_${Date.now()}${fileExt}`;
        
        const { error } = await supabase.storage
            .from(supabaseBucket) // Use your bucket name
            .upload(fileName, file.buffer, {
                contentType: file.mimetype, // Note: mimetype (not mimeType)
                upsert: false
            });
    
        if (error) {
            console.error(`Error uploading file ${file.originalname}:`, error);
            throw error;
        }
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from(supabaseBucket)
            .getPublicUrl(fileName);
            
        urls.push(publicUrl);
    }
    return urls;
}

const createNewProduct = async (req, res) => {
  if (!req?.body?.name || !req?.file || !req?.body?.price || !req?.body?.description || !req?.body?.category) {
    return res.status(400).json({ message: "All fields including image are required" });
  }

  try {
    // Upload single image (req.file instead of req.files)
    const imageUrl = await uploadToSupabase([req.file], req.user?.uid || 'guest');
    
    // Create product with single image URL (not array)
    const result = await Products.create({
      name: req.body.name,
      image: imageUrl[0], // Take the first (and only) URL
      price: req.body.price,
      description: req.body.description,
      category: req.body.category
    });

    return res.status(201).json(result);
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ message: "Failed to create product", error: err.message });
  }
};

module.exports = {
    createNewProduct,
    uploadToSupabase
};