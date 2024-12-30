import { useState } from "react";
import { Order, Status } from "../../../graphql/generated/schema"
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { formatDatePicker } from "../../../util/DateFormatter";
import { Container } from "@mui/system";
import { Form, Formik } from "formik";
import Grid from "@mui/material/Grid";
import OmTextField from "../../../components/formUI/OmTextField";
import OmSelect from "../../../components/formUI/OmSelect";
import OmDatePicker from "../../../components/formUI/OmDatePicker";
import { Typography } from "@mui/material";
import OmCheckBox from "../../../components/formUI/OmCheckBox";
import OmSubmitButton from "../../../components/formUI/OmSubmitButton";
import statuses from "../../../data/statuses.json";
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
    return (
     <Container>
      <div>
         <Formik initialValues={Initial_Form_State} validationSchema={Form_Validation} onSubmit={() => {}}>
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
                 <OmTextField name="depositAmount" otherProps={{label: 'Deposit Amount'}}/>
               </Grid>
               <Grid item xs={12}>
                 <OmTextField name="totalAmount" otherProps={{label: 'Total Amount'}}/>
               </Grid>
               <Grid item xs={6}>
                 <OmCheckBox name="isDelivery" legend="Include Delivery" label='Include Delivery' otherProps={{label:'Delivery Included'}} />
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