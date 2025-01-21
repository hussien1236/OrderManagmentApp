import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Customer, Order, useGetCustomerByIdQuery } from "../../graphql/generated/schema";
import OmLoading from "../../components/elements/OmLoading";
import OmAlert from "../../components/elements/OmAlert";
import { Container} from "@mui/system";
import Grid from '@mui/material/Grid';
import CustomerForm from "./customerForms/CustomerForm";
import OmHeader from "../../components/elements/OmHeader";
import OrderList from "../orders/ordersDashboard/OrderList";
import { Button } from "@mui/material";

const CustomerPage = () => {
   const params = useParams();
   const customerId = parseInt(params.customerId || '0');
   const navigate = useNavigate();
   const [open, setOpen] = useState(false);
   const {data:customerData, loading:customerLoading, error:customerError} = useGetCustomerByIdQuery({variables: {id: customerId}});
   if(customerLoading) return <OmLoading/>;
   if(customerError || !customerData || !customerData.customers) return <OmAlert message="Error loading customer data"/>;
    const customer = customerData.customers[0] as Customer;
    const orders = customer.orders as Order[];
   return (
      <Container>
      <Grid container spacing={2}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <OmHeader header="Customer Details"/>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={12}>
          <CustomerForm customer={customer} />
        </Grid>
        <Grid item xs={8}>
          <OmHeader header="Customer Orders"/>
        </Grid>
        <Grid item xs={12}>
          <OrderList orders={orders} />
        </Grid>
        <Grid item xs={12}>
           <Button variant="contained" href={`/customers/${customer.id}/neworder`}>New Order</Button>   
         </Grid>
      </Grid>
    </Container>
  )
}

export default CustomerPage