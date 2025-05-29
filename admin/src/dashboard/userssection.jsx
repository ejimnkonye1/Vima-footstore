import { useState, useEffect } from "react";
import axios from 'axios';
import { ErrorDisplay, LoadingSpinner } from "../component/reuse";

const UsersSection = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://nique-backend.vercel.app/api/admin/getallusers',{
          //     headers: {
          //   'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          // }
            credentials: 'include'  
        });
        setUsers(response.data.users); // Changed from response.data.Users to response.data.users
        console.log("Users", response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch Users');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

        if (loading) return <LoadingSpinner />;
    if (error) return <ErrorDisplay message={error} />;
  

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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      {user.username?.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.username}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.roles?.includes('Admin') ? 'bg-purple-100 text-purple-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {user.roles?.includes('Admin') ? 'Admin' : 'User'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.createdAt ? formatDate(user.createdAt) : 'N/A'}
                </td>
       
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersSection;