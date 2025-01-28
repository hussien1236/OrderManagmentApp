import '../../../index.css'
import { Link } from 'react-router-dom'
const NavBar = () => {
  return (
    <div className="w-full bg-orange-500 flex flex-wrap items-center justify-center md:justify-between p-5 shadow-lg">
    <Link to="/" className="text-white text-2xl font-bold tracking-wide hover:text-orange-200 transition duration-300">
      Order Management App
    </Link>
    <div className="flex flex-wrap gap-6">
      <Link to="/customers" className="text-white text-lg font-medium hover:text-orange-200 transition duration-300">
        Customers
      </Link>
      <Link to="/orders" className="text-white text-lg font-medium hover:text-orange-200 transition duration-300">
        Orders
      </Link>
      <Link to="/customers/newcustomer" className="text-white text-lg font-medium hover:text-orange-200 transition duration-300">
        New Customer
      </Link>
    </div>
  </div>
  
  )
}

export default NavBar