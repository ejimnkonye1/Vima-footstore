import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiPlus, FiMinus, FiShoppingCart } from "react-icons/fi";
import Recommend from "./recommended";
import toast, { Toaster } from "react-hot-toast";
import formatAsNaira from "../currency/naira";
import axios from "axios";

const ProductDetails = ({ cartItems, setCartItems }) => {
  const { name } = useParams(); // Get the product name from URL parameters
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/product/${name}`);
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error("Failed to fetch product details", {
          position: "bottom-right",
        });
        navigate("/"); // Redirect to home or another page if product not found
      }
    };

    fetchProductDetails();
  }, [name, navigate]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading product details...
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size", {
        position: "bottom-right",
      });
      return;
    }

    const existingProduct = cartItems.find(
      (item) => item.name === product.name && item.size === selectedSize
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
      setCartItems([...cartItems]);
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          size: selectedSize,
          quantity: quantity,
        },
      ]);
    }

    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      style: {
        background: '#10b981',
        color: '#fff',
      },
    });
  };

  const sizeOptions = [39, 40, 41, 42, 43, 44, 45, 46, 47];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Toaster />
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover"
              style={{ maxHeight: "600px" }}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>
          <p className="text-2xl text-emerald-600 font-semibold mb-6">
            {formatAsNaira(product.price)}
          </p>

          <div className="mb-6">
            <p className="text-gray-700 mb-4">{product.description}</p>
          </div>

          <div className="border-t border-b border-gray-200 py-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Select Size
            </h3>
            <div className="flex flex-wrap gap-3">
              {sizeOptions.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size.toString())}
                  className={`px-4 py-2 border rounded-full text-sm font-medium transition-colors ${
                    selectedSize === size.toString()
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center border border-gray-300 rounded-full">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-gray-600 hover:text-emerald-600"
                disabled={quantity <= 1}
              >
                <FiMinus />
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-gray-600 hover:text-emerald-600"
              >
                <FiPlus />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg"
            >
              <FiShoppingCart className="text-lg" />
              Add to Cart
            </button>
          </div>

          <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-full transition-colors">
            Buy It Now
          </button>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          You May Also Like
        </h2>
        <Recommend cartItems={cartItems} setCartItems={setCartItems} />
      </div>
    </div>
  );
};

export default ProductDetails;
