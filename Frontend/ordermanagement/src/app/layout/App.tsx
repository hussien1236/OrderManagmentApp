import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import CustomersDashboard from '../../features/customers/customersDashboard/CustomersDashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import HomePage from '../../features/home/HomePage';
import OrdersDashboard from '../../features/orders/ordersDashboard/OrdersDashboard';
import CustomerPage from '../../features/customers/CustomerPage';
import OrderPage from '../../features/orders/OrderPage';
import NewCustomerPage from '../../features/customers/NewCustomerPage';
import NewOrderPage from '../../features/orders/NewOrderPage';

const client = new ApolloClient({
  cache : new InMemoryCache({ typePolicies: {}}),
  uri: import.meta.env.VITE_API_SCHEMA_URL
});
const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<HomePage/>} />
          <Route path='customers' element={<CustomersDashboard/>} />
          <Route path='customers/:customerId' element={<CustomerPage/>} />
          <Route path='customers/:customerId/neworder' element={<NewOrderPage/>} />
          <Route path='customers/newcustomer' element={<NewCustomerPage/>} />
          <Route path='orders' element={<OrdersDashboard/>} />
          <Route path='orders/:orderId' element={<OrderPage/>} />
        </Route>
      </Routes>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App