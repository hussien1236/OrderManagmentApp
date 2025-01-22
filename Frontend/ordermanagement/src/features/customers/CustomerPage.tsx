import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Customer, Order, useGetCustomerByIdQuery, useDeleteCustomerMutation} from "../../graphql/generated/schema";
import OmLoading from "../../components/elements/OmLoading";
import OmAlert from "../../components/elements/OmAlert";
import { Container} from "@mui/system";
import Grid from '@mui/material/Grid';
import CustomerForm from "./customerForms/CustomerForm";
import OmHeader from "../../components/elements/OmHeader";
import OrderList from "../orders/ordersDashboard/OrderList";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Delete from "@mui/icons-material/Delete";

const CustomerPage = () => {
   const params = useParams();
   const customerId = parseInt(params.customerId || '0');
   const navigate = useNavigate();
   const [open, setOpen] = useState(false);
   const {data:customerData, loading:customerLoading, error:customerError} = useGetCustomerByIdQuery({variables: {id: customerId}});
   const [deleteCustomer,{loading:deleteCustomerLoading, error:deleteCustomerError}] = useDeleteCustomerMutation();
   async function DeleteCustomer(){
    var result = await deleteCustomer({variables: {id: customerId}});
    if(!result.errors){
      navigate('/customers');
    }
   }
   if(customerLoading || deleteCustomerLoading) return <OmLoading/>;
   if(customerError || !customerData || !customerData.customers) return <OmAlert message="Error loading customer data"/>;
   if(deleteCustomerError) return <OmAlert message="Error deleting customer"/>;
    const customer = customerData.customers[0] as Customer;
    const orders = customer.orders as Order[];
    function handleOpen(){
      setOpen(true);
    }
    function handleClose(){
      setOpen(false);
    }
   return (
      <Container>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Customer"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You are about to delete this customer. Are you sure you want to proceed?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={DeleteCustomer} color='error' autoFocus>Delete</Button>
          </DialogActions>
        </Dialog>
      <Grid container spacing={2}>
        <Grid item xs={2}></Grid>
        <Grid item xs={7}>
          <OmHeader header="Customer Details"/>
        </Grid>
        <Grid item xs={3}>
          <Button variant="outlined" onClick={handleOpen} color="error" startIcon={<Delete/>}>Delete Customer</Button>
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