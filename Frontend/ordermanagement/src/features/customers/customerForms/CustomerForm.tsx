import { useState } from "react";
import { Form, Formik } from "formik";
import { Customer, CustomerModelInput, useAddOrUpdateCustomerMutation } from "../../../graphql/generated/schema";
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import {Container} from "@mui/system";
import Grid from "@mui/material/Grid";
import OmTextField from "../../../components/formUI/OmTextField";
import { Alert, Snackbar, Typography } from "@mui/material";
import OmSelect from "../../../components/formUI/OmSelect";
import OmSubmitButton from "../../../components/formUI/OmSubmitButton";
import countries from "../../../data/countries.json";
import OmLoading from "../../../components/elements/OmLoading";
interface CustomerFormProps{
    customer: Customer;
};

const Form_Validation = yup.object().shape({
    firstName: yup.string()
    .required('First Name is required'),
    lastName: yup.string()
    .required('Last Name is required'),
    contactNumber: yup.string()
    .required('Contact Number is required'),
    email: yup.string()
    .email('Invalid email')
    .required('Email is required'),
    addressLine1: yup.string()
    .required('Address Line 1 is required'),
    addressLine2: yup.string(),
    city: yup.string()
    .required('City is required'),
    state: yup.string()
    .required('State is required'),
    country: yup.string()
    .required('Country is required'),
});
const CustomerForm = ({customer} : CustomerFormProps) => {
    const [open,setOpen]=useState(false);
    const navigate= useNavigate();
    const Initial_Form_State = {
        id: customer.id,
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        contactNumber: customer.contactNumber || '',
        email: customer.email || '',
        addressLine1: customer.address?.addressLine1 || '',
        addressLine2: customer.address?.addressLine2 || '',
        city: customer.address?.city || '',
        state: customer.address?.state || '',
        country: customer.address?.country || '',
    };
    const [addOrUpdateCustomer,{loading:addOrUpdateCustomerLoading,error:addOrUpdateCustomerError}] = useAddOrUpdateCustomerMutation();
    const handleClose = (event:any)=>{
      if(event.reason === "clickaway")
        return;
    setOpen(false);
    }
    async function AddOrUpdateCustomerDetails(values: CustomerModelInput){
        const response = await addOrUpdateCustomer({
            variables:{
                customer:values
            }
        });
        setOpen(true);
        const customer = response.data?.addorUpdateCustomer as Customer;
        if(customer.id){
            navigate(`/customers/${customer.id}`);
        }
    }
    if(addOrUpdateCustomerLoading)
        return  <OmLoading/>;
    if(addOrUpdateCustomerError)
        return (
        <Snackbar open={true} autoHideDuration={6000}>
            <Alert severity="error">Error retreiving customer data</Alert>
        </Snackbar>
        );

    return (
     <Container>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
           <Alert severity="success" onClose={handleClose} className="w-full">
            {!customer.id?"Customer details successfully added":"Customer details successfully updated"}
           </Alert>
        </Snackbar>
        <div>
        <Formik initialValues={Initial_Form_State} 
        validationSchema={Form_Validation} 
        onSubmit={AddOrUpdateCustomerDetails}>
          <Form>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <OmTextField name="firstName" otherProps={{label: 'First Name'}}/>
                </Grid>
                <Grid item xs={6}>
                    <OmTextField name="lastName" otherProps={{label: 'Last Name'}}/>
                </Grid>
                <Grid item xs={12}>
                    <OmTextField name="email" otherProps={{label: 'Email'}}/>
                </Grid>
                <Grid item xs={12}>
                    <OmTextField name="contactNumber" otherProps={{label: 'Contact Number'}}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Address</Typography>
                </Grid>
                <Grid item xs={12}>
                    <OmTextField name="addressLine1" otherProps={{label: 'Address Line 1'}}/>
                </Grid>
                <Grid item xs={12}>
                    <OmTextField name="addressLine2" otherProps={{label: 'Address Line 2'}}/>
                </Grid>
                <Grid item xs={6}>
                    <OmTextField name="city" otherProps={{label: 'City'}}/>
                </Grid>
                <Grid item xs={6}>
                    <OmTextField name="state" otherProps={{label: 'State'}}/>
                </Grid>
                
                <Grid item xs={12}>
                    <OmSelect name="country" otherProps={{label: 'Country'}} options={countries} />
                </Grid>
                <Grid item xs={12}>
                    <OmSubmitButton otherProps={{}} >{!customer.id?"Add Customer":"Update Customer"}</OmSubmitButton>
                </Grid>
            </Grid>
          </Form>
        </Formik>
        </div>
     </Container>
  )
}

export default CustomerForm