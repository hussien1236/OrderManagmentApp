import { useState } from "react";
import { Order, OrderModelInput, Status, useAddOrUpdateOrderMutation } from "../../../graphql/generated/schema"
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { formatDatePicker } from "../../../util/DateFormatter";
import { Container } from "@mui/system";
import { Form, Formik } from "formik";
import Grid from "@mui/material/Grid";
import OmTextField from "../../../components/formUI/OmTextField";
import OmSelect from "../../../components/formUI/OmSelect";
import OmDatePicker from "../../../components/formUI/OmDatePicker";
import { Alert, Snackbar, Typography } from "@mui/material";
import OmCheckBox from "../../../components/formUI/OmCheckBox";
import OmSubmitButton from "../../../components/formUI/OmSubmitButton";
import statuses from "../../../data/statuses.json";
import OmLoading from "../../../components/elements/OmLoading";
interface OrderFormProps {
    order: Order
};
const Form_Validation = yup.object().shape({
    orderDate: yup.date()
    .required('Order date is required'),
    description: yup.string()
    .required('Description is required'),
    depositAmount: yup.string()
    .required('Deposit amount is required'),
    otherNotes: yup.string(),
    totalAmount: yup.string()
    .required('Total amount is required'),
    isDelivery: yup.boolean(),
    status: yup.string()
});
const OrderForm = ({order}: OrderFormProps) => {
  console.log(order); 
  const [open,setOpen]=useState(false);
  const navigate= useNavigate();
  const Initial_Form_State = {
      id: order.id,
      customerId: order.customerId ,
      orderDate: formatDatePicker(order.orderDate) ,
      description: order.description || '',
      depositAmount: order.depositAmount || 0,
      otherNotes: order.otherNotes || '',
      totalAmount: order.totalAmount || 0,
      isDelivery: order.isDelivery || false,
      status: order.status || Status.Draft,
  };
  const [addOrUpdateOrder,{loading:addOrUpdateOrderLoading,error:addOrUpdateOrderError}] = useAddOrUpdateOrderMutation();
  const handleClose = (event:any)=>{
    if(event.reason === "clickaway")
      return;
    setOpen(false);
  }
   async function AddOrUpdateOrderDetails(values: OrderModelInput){ 
      values.orderDate= new Date(values.orderDate);
      console.log(values);
      const response = await addOrUpdateOrder({ 
           variables:{
               order: values
           }
       });
      setOpen(true);
      const order = response.data?.addorUpdateOrder as Order;
       if(order.id)
         navigate(`/orders/${order.id}`);
      }
      if(addOrUpdateOrderLoading)
        return <OmLoading/>
      if(addOrUpdateOrderError){
       // console.log("error: "+addOrUpdateOrderError.stack)
        return ( 
        <Snackbar open={true} autoHideDuration={6000}>
        <Alert severity="error">
          error in retrieving orders data
        </Alert>
      </Snackbar>)}
    return (
     <Container>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="success" onClose={handleClose} className="w-full">
          {!order.id?"Order details successfully added":"Order details successfully updated"}
        </Alert>
      </Snackbar>
      <div>
         <Formik 
          initialValues={Initial_Form_State} 
          validationSchema={Form_Validation} 
         onSubmit={AddOrUpdateOrderDetails}>
            <Form>
             <Grid container spacing={2}>
             <Grid item xs={12}>
                 <OmSelect name="status" otherProps={{label: 'Order Status'}} options={statuses}/>
               </Grid>
               <Grid item xs={12}>
                 <OmDatePicker name="orderDate" otherProps={{label: 'Order Date'}}/>
               </Grid>
               <Grid item xs={12}>
                 <OmTextField name="description" otherProps={{label: 'Description', multiline: true, rows: 4}}/>
               </Grid>
               <Grid item xs={12}>
                 <OmTextField name="otherNotes" otherProps={{label: 'Other Notes'}}/>
               </Grid>
               <Grid>
                 <Typography className="pt-5 bold text-xl">Pricing Information</Typography>
               </Grid>
               <Grid item xs={12}>
                 <OmTextField name="depositAmount" otherProps={{label: 'Deposit Amount', type:'number'}}/>
               </Grid>
               <Grid item xs={12}>
                 <OmTextField name="totalAmount" otherProps={{label: 'Total Amount', type:'number'}}/>
               </Grid>
               <Grid item xs={6}>
                 <OmCheckBox name="isDelivery" legend="Include Delivery" label='Include Delivery' otherProps={{}} />
               </Grid>
               <Grid item xs={12}>
                 <OmSubmitButton otherProps={{}}>{!order.id?"Add Order":"Update Order"}</OmSubmitButton>
               </Grid>
             </Grid>
           </Form> 
         </Formik>
       </div>
    
    </Container>
  )
}

export default OrderForm