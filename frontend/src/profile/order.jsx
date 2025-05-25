// OrderPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const OrderPage = ({formData}) => {
  // Replace this with actual order data (e.g., from your backend)

  const navigate = useNavigate();
  const orderTotal = localStorage.getItem('orderTotal');
  const handleNavigate = (path) => {
    navigate(path);
  }
  const getTodayDate = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString(); // Adjust the formatting if needed
    return formattedDate;
  };
  
  if (!formData) {
    getTodayDate(false)
    // If formData is undefined, you can handle it accordingly.
    // For example, you might want to redirect the user or show an error message.
    return (
      <div>
        <p>Error: Form data is missing.</p>
      </div>
    );
  }
  return (
    <div className='container mt-5 p-2'>
        <div className='row'>
        <div className="col border ">
      <div className='mt-3 pointer border-bottom' onClick={() => handleNavigate('/account')}>Dashboard</div>
        <div className='mt-3 pointer  border-bottom' onClick={() => handleNavigate('/order')}>My Orders</div>
        <div className='mt-3 pointer  border-bottom' onClick={() => handleNavigate('/dashboard/profile')}>Edit Profile</div>
        <div className='mt-3 pointer  border-bottom' onClick={() => handleNavigate('/dashboard/change-password')}>Change Password</div>
      </div>

      <div className='col-md-9'>
     
      <table className="table">
        <thead>
          <tr>
           
            <th>Billing Name</th>
            <th>Phone</th>
            <th>Order Total</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          
            <tr>
              <td> {formData.firstName} {formData.lastName} </td>
              <td>{formData.number} </td>
              {formData.firstName && <td>{orderTotal}</td>}
             
               {formData.firstName && <td>{getTodayDate()}</td>}
            </tr>
          
          
        </tbody>
      </table>
    </div>
        </div>
    </div>
  
  );
};

export default OrderPage;
