import OmAlert from '../../../components/elements/OmAlert';
import OmLoading from '../../../components/elements/OmLoading';
import { Customer, useGetCustomersQuery } from '../../../graphql/generated/schema'
import CustomerList from './CustomerList';

const CustomersDashboard = () => {
    const { data, loading, error } = useGetCustomersQuery();
    if(loading){
        return <OmLoading/>
    }
    if(error || !data){
        return <OmAlert message='Error occured while retrieving Customers data'/>
    }
    const customers = data.customers as Customer[];
  return (
    <div className='flex flex-col gap-5 align-center'>
        <div>
            <h1 className="first-letter:text-orange-600 text-4xl font-bold">CustomerList :</h1>
        </div>
        <div>
             <CustomerList customers={customers}/> 
        </div>
    </div>
  )
}

export default CustomersDashboard