import { Container } from "@mui/system"
import Grid from "@mui/material/Grid"
import OmHeader from "../../components/elements/OmHeader"
import CustomerForm from "./customerForms/CustomerForm"
import { Customer } from "../../graphql/generated/schema"

const NewCustomerPage = () => {
    const customer = {} as Customer;
  return (
    <Container>
    <Grid item spacing={12}>
    <Grid item xs={12}>
      <OmHeader header="New Customer"/>
    </Grid>
    <Grid item xs={12}>
      <CustomerForm customer={customer}/>
    </Grid>
    </Grid>
    </Container>
  )
}

export default NewCustomerPage