import { useState } from 'react';
import {  FiBox, FiUsers, FiShoppingBag, FiSettings, FiLogOut } from 'react-icons/fi';
import { HiOutlineMenuAlt2, HiOutlineX } from 'react-icons/hi';
import { RiDashboardHorizontalLine } from "react-icons/ri";
import ProductsSection from '../dashboard/productsection';
import AddProductForm from '../dashboard/addproductform';
import UsersSection from '../dashboard/userssection';
import OrdersSection from '../dashboard/orderssection';
import DashboardOverview from '../dashboard/DashboardOverview';
import Sidebar from '../dashboard/sidebar';
import HeaderDashboard from '../dashboard/header';
const AdminDashboard = () => {
    // useEffect(() => {
    //   const getproduct = async () => {
    //     setLoading(true);
    //     try {
    //       const response = await axios.get('http://localhost:4500/products');
    //       console.log('Products:', response.data);
    //       setproD(response.data || []);
    //     } catch (err) {
    //       setError(err.response?.data?.message || 'Failed to fetch products');
    //       console.error('Error:', err);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
    //   getproduct();
    // }, []);
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
  <Sidebar
  mobileMenuOpen={mobileMenuOpen}
  setActiveTab={setActiveTab}
  setMobileMenuOpen={setMobileMenuOpen}
  activeTab={activeTab}

  />
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
     <HeaderDashboard
     activeTab={activeTab}
     editingProduct={editingProduct}
   
     />

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












export default AdminDashboard;