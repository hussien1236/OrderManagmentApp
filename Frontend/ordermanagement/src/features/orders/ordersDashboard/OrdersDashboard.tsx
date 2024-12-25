import { Order, useGetOrdersQuery } from '../../../graphql/generated/schema';
import OrderList from './OrderList';

const OrdersDashboard = () => {
     const { data, loading, error } = useGetOrdersQuery();
        if(loading){
            return <div>Loading...</div>
        }
        if(error || !data){
            return <div>Error</div>
        }
    const orders = data.orders as Order[];
  return (
    <div className='flex flex-col gap-5 align-center'>
        <div>
            <h1 className="first-letter:text-orange-600 text-4xl font-bold">OrderList :</h1>
        </div>
        <div>
            <OrderList orders={orders}/>
        </div>
    </div>
  )
}

export default OrdersDashboard