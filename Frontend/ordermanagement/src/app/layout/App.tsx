import { ApolloProvider} from '@apollo/client';
import CustomersDashboard from '../../features/customers/customersDashboard/CustomersDashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import HomePage from '../../features/home/HomePage';
import OrdersDashboard from '../../features/orders/ordersDashboard/OrdersDashboard';
import CustomerPage from '../../features/customers/CustomerPage';
import OrderPage from '../../features/orders/OrderPage';
import NewCustomerPage from '../../features/customers/NewCustomerPage';
import NewOrderPage from '../../features/orders/NewOrderPage';
import { AuthProvider } from '../../Authentication/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Login from '../../features/Login/Login';
import { client } from '../../Authentication/ApolloClient';

const App = () => {
  return (
    <AuthProvider>
    <ApolloProvider client={client}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<HomePage/>} />
          <Route path='login' element={<Login/>} />
          <Route path='customers' element={<ProtectedRoute><CustomersDashboard/></ProtectedRoute>} />
          <Route path='customers/:customerId' element={<ProtectedRoute><CustomerPage/></ProtectedRoute>} />
          <Route path='customers/:customerId/neworder' element={<ProtectedRoute><NewOrderPage/></ProtectedRoute>} />
          <Route path='customers/newcustomer' element={<ProtectedRoute><NewCustomerPage/></ProtectedRoute>} />
          <Route path='orders' element={<ProtectedRoute><OrdersDashboard/></ProtectedRoute>} />
          <Route path='orders/:orderId' element={<ProtectedRoute><OrderPage/></ProtectedRoute>} />
        </Route>
      </Routes>
      </BrowserRouter>
    </ApolloProvider>
    </AuthProvider>
  )
}

export default App