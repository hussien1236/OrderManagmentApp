import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Customer, Order, useGetOrderByIdQuery, useDeleteOrderMutation } from '../../graphql/generated/schema';
import OmLoading from '../../components/elements/OmLoading';
import OmAlert from '../../components/elements/OmAlert';
import { Container } from '@mui/system';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';
import OrderForm from './orderForms/OrderForm';
import OmHeader from '../../components/elements/OmHeader';
import Delete from '@mui/icons-material/Delete';

const OrderPage = () => {
    const params = useParams();
    const orderId = parseInt(params.orderId || '0');
    const [open,setOpen]=useState(false);
    const navigate= useNavigate();
    const {data: orderData,loading: orderLoading, error: orderError} = useGetOrderByIdQuery({variables:{id: orderId}});
    const [deleteOrder,{loading: deleteOrderLoading, error: deleteOrderError}] = useDeleteOrderMutation();
    async function DeleteOrder(){
        var result = await deleteOrder({variables:{id: orderId}});
        if(!result.errors){
            navigate('/orders');
        }
    }
    if(orderLoading || deleteOrderLoading)
        return <OmLoading/>;
    if(orderError || !orderData || !orderData.orders)
        return <OmAlert message="Error loading order data"/>;
    if(deleteOrderError)
        return <OmAlert message="Error deleting order"/>;
    function handleOpen(){
        setOpen(true);
    }
    function handleClose(){
        setOpen(false);
    }
    const order = orderData.orders[0] as Order;
    const customer = order.customer as Customer;
    return (
        <Container>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Order"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You are about to delete this order. Are you sure you want to proceed?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={DeleteOrder} color='error' autoFocus>Delete</Button>
          </DialogActions>
        </Dialog>
        <Grid container spacing={2}>
          <Grid item xs={2}></Grid>
          <Grid item xs={7}>
            <OmHeader header={`Order Details - ${customer.firstName} ${customer.lastName}`}/>
          </Grid>
          <Grid item xs={3}>
            <Button variant="outlined" onClick={handleOpen} startIcon={<Delete/>} color='error'>Delete Order</Button>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={12}>
            <OrderForm order={order} />
          </Grid>
        </Grid>
      </Container>
  )
}

export default OrderPage