import { useState, useEffect } from 'react';
import { FiHeart, FiStar, FiCheck, FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi';
import { BiLeaf } from 'react-icons/bi';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useCart } from '../context/cartcontext';
import formatAsNaira from '../currency/naira';
import capitalizeFirstLetter from '../util/cap';

const ProductDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const staticProductData = {
    discountPrice: 1799.98,
    stock: 15,
    rating: 4.5,
    reviews: 24,
    colors: ['black', 'navy', 'gray'],
    sizes: ['S', 'M', 'L', 'XL'],
    brand: "FashionHub",
    category: "men"
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/product/${name}`);
        setProduct({
          ...response.data,
          ...staticProductData,
          discountPrice: response.data.price * 0.9
        });
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error("Failed to fetch product details");
      }
    };

    fetchProductDetails();
  }, [name]);

  const addtoCart = () => {
    try {
      if (!product || !selectedSize || !selectedColor) {
        toast.error("Please select color and size");
        return;
      }
      
      const cartItem = {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: selectedColor,
        size: selectedSize,
        quantity: quantity,
        category: product.category,
        description: product.description
      };

      addToCart(cartItem);
      toast.success(`${quantity} × ${product.name} added to cart`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    }
  };
    const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      toast.error(`Only ${product.stock} available in stock`);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const buyNow = () => {
    addtoCart();
    navigate('/checkout');
  };

  if (!product) {
    return (
      <div className="container mx-auto py-20 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
            </div>
            <div className="space-y-6">
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Toaster position="bottom-right" />
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4 border-b border-gray-100">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-700 hover:text-indigo-600 text-sm">Home</Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="text-gray-400 mx-2">/</span>
                <a href="#" className="text-gray-700 hover:text-indigo-600 text-sm capitalize">{product.category}</a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="text-gray-400 mx-2">/</span>
                <span className="text-gray-500 text-sm font-medium">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
      <div className="space-y-4">
  <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden shadow-sm">
    <div className="w-full h-full flex items-center justify-center">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-full object-cover" // Changed to object-cover for better fitting
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/500x500?text=Product+Image";
        }}
      />
    </div>
  </div>
</div>


          {/* Product Info */}
          <div className="space-y-6">
            {/* Header with title and badges */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  New Arrival
                </span>
                <span className="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full flex items-center">
                  <BiLeaf className="mr-1" /> Sustainable
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{capitalizeFirstLetter(product.name)}</h1>
              <div className="flex items-center mt-2">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i} 
                      fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} 
                      className="w-4 h-4" 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="py-4 border-t border-b border-gray-100">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-gray-900">{formatAsNaira(product.price.toFixed(0))}</span>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Color: <span className="capitalize font-semibold">{selectedColor}</span></h3>
              <div className="flex space-x-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${selectedColor === color ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-gray-200 hover:border-gray-300'}`}
                    style={{ 
                      backgroundColor: color === 'black' ? '#000' :
                                      color === 'navy' ? '#001f3f' :
                                      color === 'gray' ? '#808080' : color
                    }}
                    title={color.charAt(0).toUpperCase() + color.slice(1)}
                  >
                    {selectedColor === color && (
                      <FiCheck className="text-white w-4 h-4" />
                    )}
                    <span className="sr-only">{color}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium text-gray-900">Size: <span className="font-semibold">{selectedSize}</span></h3>
                <button className="text-sm text-indigo-600 hover:underline">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 px-3 border rounded-md text-center transition-all ${selectedSize === size ? 
                      'bg-indigo-600 text-white border-indigo-600' : 
                      'bg-white text-gray-700 border-gray-300 hover:border-gray-400'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex w-32">
                <button 
                   onClick={decreaseQuantity}
                  className="px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <div className="px-4 py-2 border-t border-b border-gray-300 bg-white text-center w-full">
                  {quantity}
                </div>
                <button 
    onClick={increaseQuantity}
    disabled={quantity >= product.stock}
                  className="px-3 py-2 border border-gray-300 rounded-r-md bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {product.stock} items left in stock
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3 pt-2">
              <button
                onClick={addtoCart}
                className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 font-medium flex items-center justify-center transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={buyNow}
                className="bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-800 font-medium transition-colors"
              >
                Buy Now
              </button>
            </div>

            {/* Product Details */}
            <div className="pt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Product Details</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Shipping Info */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <FiTruck className="flex-shrink-0 h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Free Shipping</h4>
                    <p className="text-xs text-gray-500">On orders over {formatAsNaira(50000)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FiRefreshCw className="flex-shrink-0 h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Easy Returns</h4>
                    <p className="text-xs text-gray-500">30-day policy</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FiShield className="flex-shrink-0 h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Secure Payment</h4>
                    <p className="text-xs text-gray-500">100% protected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;