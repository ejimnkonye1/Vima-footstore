import { useState, useEffect } from 'react';
import { FiHeart, FiShare2, FiChevronLeft, FiChevronRight, FiStar, FiCheck, FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaPinterest, FaWhatsapp } from 'react-icons/fa';
import { BiLeaf } from 'react-icons/bi';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetailsNew = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ show: false, x: 0, y: 0 });

  // Sample product data - in a real app this would come from an API
  useEffect(() => {
    const sampleProducts = [
      {
        id: '1',
        name: 'Premium Eco-Tech Running Shoes',
        price: 149.99,
        discountPrice: 129.99,
        category: 'men',
        colors: ['black', 'white', 'green'],
        sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
        rating: 4.7,
        reviews: 128,
        description: 'Our most advanced running shoes featuring eco-friendly materials and responsive cushioning for maximum comfort and performance.',
        details: [
          '100% recycled polyester upper',
          'Bio-based foam midsole',
          'Carbon-neutral production',
          'Vegan-friendly materials'
        ],
        images: [
          '/shoe-front.jpg',
          '/shoe-side.jpg',
          '/shoe-back.jpg',
          '/shoe-top.jpg',
          '/shoe-detail.jpg'
        ],
        isNew: true,
        isSustainable: true,
        isBestSeller: true,
        stock: 15,
        sku: 'RUN2025-ECO',
        brand: 'EcoAthletic'
      }
    ];
    
    const foundProduct = sampleProducts.find(p => p.id === id);
    setProduct(foundProduct);
    if (foundProduct) {
      setSelectedColor(foundProduct.colors[0]);
      setSelectedSize(foundProduct.sizes[2]); // Default to middle size
    }
  }, [id]);

  const handleImageHover = (e, index) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPosition({ show: true, x, y });
    setActiveImage(index);
  };

  const handleImageLeave = () => {
    setZoomPosition({ ...zoomPosition, show: false });
  };

  const handleImageMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPosition({ ...zoomPosition, x, y });
  };

  const addToCart = () => {
    // Add to cart logic
    console.log(`Added to cart: ${product.name} - ${selectedSize} - ${selectedColor} - Qty: ${quantity}`);
  };

  const buyNow = () => {
    addToCart();
    navigate('/checkout');
  };

  if (!product) {
    return <div className="container mx-auto py-20 text-center">Product not found</div>;
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4 border-b border-gray-100">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="#" className="text-gray-700 hover:text-indigo-600 text-sm">Home</a>
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
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image with Zoom */}
            <div 
              className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden cursor-zoom-in"
              onMouseMove={handleImageMove}
              onMouseEnter={(e) => handleImageHover(e, activeImage)}
              onMouseLeave={handleImageLeave}
            >
              <img 
                src={product.images[activeImage]} 
                alt={product.name}
                className="w-full h-full object-contain"
              />
              {zoomPosition.show && (
                <div 
                  className="absolute inset-0 bg-white bg-opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: `url(${product.images[activeImage]})`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    backgroundSize: '200%',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-5 gap-3">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  className={`aspect-square bg-gray-50 rounded-md overflow-hidden border-2 ${activeImage === index ? 'border-indigo-600' : 'border-transparent'}`}
                  onClick={() => setActiveImage(index)}
                  onMouseEnter={(e) => handleImageHover(e, index)}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* AR Try-On (Future Feature) */}
            <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-100 rounded-full mr-3">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Try it in AR</h4>
                  <p className="text-sm text-gray-600">See how it looks in your space with our augmented reality viewer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Header with title and badges */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {product.isNew && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    New Arrival
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                    Bestseller
                  </span>
                )}
                {product.isSustainable && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full flex items-center">
                    <BiLeaf className="mr-1" /> Sustainable
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
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
                  {product.rating} ({product.reviews} reviews) | <a href="#reviews" className="text-indigo-600 hover:underline">Write a review</a>
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="my-6">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-gray-900">${product.discountPrice.toFixed(2)}</span>
                {product.discountPrice < product.price && (
                  <>
                    <span className="ml-2 text-lg text-gray-500 line-through">${product.price.toFixed(2)}</span>
                    <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                      Save ${(product.price - product.discountPrice).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
              {product.discountPrice > 100 && (
                <p className="text-sm text-gray-500 mt-1">
                  or 4 interest-free payments of ${(product.discountPrice / 4).toFixed(2)} with <span className="font-medium">Klarna</span>
                </p>
              )}
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Color: <span className="capitalize">{selectedColor}</span></h3>
              <div className="flex space-x-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 ${selectedColor === color ? 'border-indigo-600' : 'border-gray-200'} ${color === 'white' ? 'bg-white' : `bg-${color}-500`}`}
                    style={{ 
                      backgroundColor: color === 'white' ? '#fff' : 
                                      color === 'green' ? '#10B981' : 
                                      color
                    }}
                    title={color.charAt(0).toUpperCase() + color.slice(1)}
                  >
                    <span className="sr-only">{color}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-900">Size: {selectedSize}</h3>
                <button className="text-sm text-indigo-600 hover:underline">Size Guide</button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 border rounded-md text-center ${selectedSize === size ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
              <div className="flex">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <div className="px-4 py-2 border-t border-b border-gray-300 bg-white text-center w-12">
                  {quantity}
                </div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 border border-gray-300 rounded-r-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {product.stock} items left in stock
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3 mb-8">
              <button
                onClick={addToCart}
                className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 font-medium flex items-center justify-center"
              >
                Add to Cart
              </button>
              <button
                onClick={buyNow}
                className="bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-800 font-medium"
              >
                Buy Now
              </button>
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex items-center text-sm ${isWishlisted ? 'text-red-500' : 'text-gray-500'} hover:text-red-500`}
                >
                  <FiHeart className={`mr-1 ${isWishlisted ? 'fill-current' : ''}`} />
                  {isWishlisted ? 'Saved' : 'Save'}
                </button>
                <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                  <FiShare2 className="mr-1" /> Share
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Product Details</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <ul className="space-y-2">
                {product.details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <FiCheck className="flex-shrink-0 h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping Info */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <FiTruck className="flex-shrink-0 h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Free Shipping</h4>
                    <p className="text-xs text-gray-500">On orders over $50</p>
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

        {/* Share Modal */}
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Share this product</h3>
            <div className="flex justify-center space-x-6 mb-6">
              <a href="#" className="text-blue-600 hover:text-blue-800">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-600">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-red-600 hover:text-red-800">
                <FaPinterest size={24} />
              </a>
              <a href="#" className="text-green-500 hover:text-green-700">
                <FaWhatsapp size={24} />
              </a>
            </div>
            <div className="flex">
              <input
                type="text"
                value={`https://fashionhub.com/products/${product.id}`}
                readOnly
                className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm"
              />
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-md text-sm">
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button className="border-b-2 border-indigo-500 text-indigo-600 px-1 py-4 text-sm font-medium">
                Description
              </button>
              <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 px-1 py-4 text-sm font-medium">
                Specifications
              </button>
              <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 px-1 py-4 text-sm font-medium">
                Reviews ({product.reviews})
              </button>
              <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 px-1 py-4 text-sm font-medium">
                Shipping & Returns
              </button>
            </nav>
          </div>

          {/* Description Content */}
          <div className="py-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">About the {product.name}</h3>
            <div className="prose prose-sm text-gray-500">
              <p>
                Our {product.name} represents the pinnacle of {product.category}'s fashion technology, combining 
                style with sustainability. Designed for the modern consumer who values both aesthetics and 
                environmental responsibility.
              </p>
              <p className="mt-4">
                The {product.brand} collection is crafted with attention to detail and a commitment to reducing 
                our carbon footprint. Each piece is designed to last, reducing the need for frequent replacements 
                and minimizing waste.
              </p>
              <h4 className="text-gray-900 mt-6">Key Features:</h4>
              <ul>
                <li>Premium eco-friendly materials sourced responsibly</li>
                <li>Designed for comfort and durability</li>
                <li>Carbon-neutral production process</li>
                <li>Vegan-friendly and cruelty-free</li>
                <li>Recyclable packaging</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Viewed */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {/* Sample related products would go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsNew;