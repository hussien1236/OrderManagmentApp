import '../../../index.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../../Authentication/AuthContext';

const NavBar = () => {
  const authContext = useContext(AuthContext);
  var token = authContext?.token;
  function handleLogout() {
    if (authContext) {
     authContext.logout();
    }
  }
  return (
    <div className="w-full bg-orange-500 flex flex-wrap items-center justify-center md:justify-between p-5 shadow-lg">
    <Link to="/" className="text-white text-2xl font-bold tracking-wide hover:text-orange-200 transition duration-300">
      Order Management App
    </Link>
    {token?<div className="flex flex-wrap gap-6">
      <Link to="/customers" className="text-white text-lg font-medium hover:text-orange-200 transition duration-300">
        Customers
      </Link>
      <Link to="/orders" className="text-white text-lg font-medium hover:text-orange-200 transition duration-300">
        Orders
      </Link>
      <Link to="/customers/newcustomer" className="text-white text-lg font-medium hover:text-orange-200 transition duration-300">
        New Customer
      </Link>
      <button
        onClick={handleLogout}
        className="px-3 py-1 bg-white text-lg text-orange-500 font-semibold rounded-lg shadow-md hover:bg-orange-600 hover:text-white transition duration-300">
         Logout
      </button>
    </div>:''}
  </div>
  
  )
}

export default NavBar