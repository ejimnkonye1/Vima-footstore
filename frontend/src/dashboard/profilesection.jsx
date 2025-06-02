import { useState } from "react";
import { useSelector } from "react-redux";
import { Toaster, toast } from 'react-hot-toast';
import capitalizeFirstLetter from "../util/cap";
const ProfileSection = ({ editMode, onSave, handleInputChange }) => {
    const user = useSelector((state) => state.user);
    const [userData, setUserData] = useState({
        username: user.username,
        email: user.email,
      phoneNumber: user?.phoneNumber,
      joinDate: user.joinDate || "",
    });
 

    const handleLocalInputChange = (e) => {
        const { name, value } = e.target;
           if (name === 'phoneNumber' && value.length > 11) {
            console.log("value", value.length)
               toast.error("Phone number must be exactly 11 digits");
        return; // Prevent further input
    }
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
        if (handleInputChange) {
            handleInputChange(e);
        }
    };

    return (
        <div className="border-b border-gray-200 pb-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
             <Toaster position="top-center" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    {editMode ? (
                        <input
                            type="text"
                            name="username"
                            value={userData.username}
                            onChange={handleLocalInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          
                        />
                    ) : (
                        <p className="text-gray-600">{capitalizeFirstLetter(userData.username)}</p>
                    )}
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    {editMode ? (
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            readOnly
                            onChange={handleLocalInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          
                        />
                    ) : (
                        <p className="text-gray-600">{userData.email}</p>
                    )}
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    {editMode ? (
                        <input
                            type="tel"
                               name="phoneNumber" // Changed from phone
                        value={userData.phoneNumber}
                            onChange={handleLocalInputChange}
                                maxLength={11}
                                 pattern="\d{11}"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  
                        />
                    ) : (
                       <p className="text-gray-600">
  {userData.phoneNumber || 'Not provided yet'}
</p>
                    )}
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                    <p className="text-gray-600">
                        {new Date(userData.joinDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;