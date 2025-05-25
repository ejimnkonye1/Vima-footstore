import { useState } from 'react';
import {  FiBox, FiUsers, FiShoppingBag, FiSettings, FiLogOut } from 'react-icons/fi';
import { HiOutlineMenuAlt2, HiOutlineX } from 'react-icons/hi';
import { RiDashboardHorizontalLine } from "react-icons/ri";
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState([
    { id: 1, name: 'Premium Headphones', price: 199.99, stock: 45, category: 'Electronics' },
    { id: 2, name: 'Wireless Mouse', price: 29.99, stock: 120, category: 'Electronics' },
    { id: 3, name: 'Organic Cotton T-Shirt', price: 24.99, stock: 78, category: 'Apparel' },
  ]);
  const [editingProduct, setEditingProduct] = useState(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductsSection products={products} onEdit={setEditingProduct} onDelete={handleDeleteProduct} />;
      case 'addProduct':
        return <AddProductForm onAddProduct={handleAddProduct} editingProduct={editingProduct} onUpdateProduct={handleUpdateProduct} />;
      case 'users':
        return <UsersSection />;
      case 'orders':
        return <OrdersSection />;
      default:
        return <DashboardOverview />;
    }
  };

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    setActiveTab('products');
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setEditingProduct(null);
    setActiveTab('products');
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-indigo-600 text-white"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenuAlt2 size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transform fixed md:static inset-y-0 left-0 w-64 bg-indigo-800 text-white transition-transform duration-300 ease-in-out z-40`}>
        <div className="flex items-center justify-center h-16 px-4 border-b border-indigo-700">
          <h1 className="text-xl font-bold">StoreAdmin</h1>
          <span className="ml-2 px-2 py-1 text-xs bg-indigo-600 rounded-full">v3.5</span>
        </div>
        <div className="flex flex-col flex-grow px-4 py-4 overflow-y-auto">
          <nav className="space-y-1">
            <button
              onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
              className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === 'dashboard' ? 'bg-indigo-900 text-white' : 'text-indigo-200 hover:text-white hover:bg-indigo-700'}`}
            >
              {/* <FiDashboard className="mr-3" /> */}
              <RiDashboardHorizontalLine className="mr-3" />
              Dashboard
            </button>
            <button
              onClick={() => { setActiveTab('products'); setMobileMenuOpen(false); }}
              className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === 'products' ? 'bg-indigo-900 text-white' : 'text-indigo-200 hover:text-white hover:bg-indigo-700'}`}
            >
              <FiBox className="mr-3" />
              Products
            </button>
            <button
              onClick={() => { setActiveTab('users'); setMobileMenuOpen(false); }}
              className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === 'users' ? 'bg-indigo-900 text-white' : 'text-indigo-200 hover:text-white hover:bg-indigo-700'}`}
            >
              <FiUsers className="mr-3" />
              Users
            </button>
            <button
              onClick={() => { setActiveTab('orders'); setMobileMenuOpen(false); }}
              className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === 'orders' ? 'bg-indigo-900 text-white' : 'text-indigo-200 hover:text-white hover:bg-indigo-700'}`}
            >
              <FiShoppingBag className="mr-3" />
              Orders
            </button>
          </nav>
          <div className="mt-auto pt-4 border-t border-indigo-700">
            <button className="flex items-center w-full px-4 py-3 text-indigo-200 hover:text-white hover:bg-indigo-700 rounded-lg">
              <FiSettings className="mr-3" />
              Settings
            </button>
            <button className="flex items-center w-full px-4 py-3 text-indigo-200 hover:text-white hover:bg-indigo-700 rounded-lg">
              <FiLogOut className="mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-4 md:px-6 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800 capitalize">
              {activeTab === 'addProduct' 
                ? (editingProduct ? 'Edit Product' : 'Add New Product') 
                : activeTab}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-1 rounded-full bg-gray-100 hover:bg-gray-200">
                  <span className="sr-only">Notifications</span>
                  <div className="relative">
                    <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  </div>
                </button>
              </div>
              <div className="flex items-center">
                <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Admin profile" />
                <span className="ml-2 text-sm font-medium text-gray-700 hidden md:inline">Admin User</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {activeTab === 'products' && (
            <div className="mb-4 flex justify-end">
              <button
                onClick={() => { setActiveTab('addProduct'); setEditingProduct(null); }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center"
              >
                <FiBox className="mr-2" />
                Add Product
              </button>
            </div>
          )}
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// Sub-components
const DashboardOverview = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold">$24,780</p>
            </div>
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold">1,245</p>
            </div>
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Products</p>
              <p className="text-2xl font-bold">187</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Active Users</p>
              <p className="text-2xl font-bold">3,452</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-2025-001</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">John Smith</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Delivered</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$129.99</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-2025-002</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sarah Johnson</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Processing</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$89.99</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-2025-003</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Michael Brown</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Shipped</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$245.50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Top Selling Products</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-md bg-indigo-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-medium text-gray-900">Wireless Earbuds</h4>
                <p className="text-sm text-gray-500">45 sold this week</p>
              </div>
              <div className="ml-auto text-sm font-medium text-gray-900">$79.99</div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-md bg-green-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-medium text-gray-900">Organic Cotton T-Shirt</h4>
                <p className="text-sm text-gray-500">32 sold this week</p>
              </div>
              <div className="ml-auto text-sm font-medium text-gray-900">$24.99</div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-md bg-purple-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="ml-4">
                <h4 className="text-sm font-medium text-gray-900">Smart Watch</h4>
                <p className="text-sm text-gray-500">28 sold this week</p>
              </div>
              <div className="ml-auto text-sm font-medium text-gray-900">$199.99</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductsSection = ({ products, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md"></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.stock > 50 ? 'bg-green-100 text-green-800' : product.stock > 10 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {product.stock} in stock
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AddProductForm = ({ onAddProduct, editingProduct, onUpdateProduct }) => {
  const [product, setProduct] = useState(
    editingProduct || {
      name: '',
      description: '',
      price: '',
      stock: '',
      category: '',
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      onUpdateProduct(product);
    } else {
      onAddProduct(product);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium mb-6">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="name"
                id="name"
                value={product.name}
                onChange={handleChange}
                className="py-2 px-3 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                rows={3}
                value={product.description}
                onChange={handleChange}
                className="py-2 px-3 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                name="price"
                id="price"
                value={product.price}
                onChange={handleChange}
                className="py-2 pl-7 pr-3 block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                required
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
              Stock Quantity
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="stock"
                id="stock"
                value={product.stock}
                onChange={handleChange}
                className="py-2 px-3 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                required
                min="0"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <div className="mt-1">
              <select
                id="category"
                name="category"
                value={product.category}
                onChange={handleChange}
                className="py-2 px-3 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select a category</option>
                <option value="Electronics">Electronics</option>
                <option value="Apparel">Apparel</option>
                <option value="Home & Garden">Home & Garden</option>
                <option value="Sports & Outdoors">Sports & Outdoors</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-6">
            <label className="block text-sm font-medium text-gray-700">Product Image</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {editingProduct ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

const UsersSection = () => {
  const users = [
    { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Customer', joined: '2025-01-15' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Customer', joined: '2025-02-20' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', role: 'Admin', joined: '2024-11-05' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'Customer', joined: '2025-03-10' },
  ];

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200"></div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joined}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const OrdersSection = () => {
  const orders = [
    { id: 1, orderId: '#ORD-2025-001', customer: 'John Smith', date: '2025-01-15', status: 'Delivered', amount: '$129.99' },
    { id: 2, orderId: '#ORD-2025-002', customer: 'Sarah Johnson', date: '2025-02-20', status: 'Processing', amount: '$89.99' },
    { id: 3, orderId: '#ORD-2025-003', customer: 'Michael Brown', date: '2025-03-05', status: 'Shipped', amount: '$245.50' },
    { id: 4, orderId: '#ORD-2025-004', customer: 'Emily Davis', date: '2025-03-10', status: 'Pending', amount: '$75.25' },
  ];

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.orderId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                  <button className="text-red-600 hover:text-red-900">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;