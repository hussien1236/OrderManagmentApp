import { Container } from "@mui/system";
import { Order } from "../../graphql/generated/schema";
import Grid from "@mui/material/Grid";
import OmHeader from "../../components/elements/OmHeader";
import OrderForm from "./orderForms/OrderForm";
import { useParams } from "react-router-dom";

const NewOrderPage = () => {
    const params = useParams();
    const customerId = parseInt(params.customerId || '0');
    const order = {
        customerId: customerId,
    } as Order;
  return (
    <Container>
        <Grid item spacing={12}>
            <Grid item xs={12}>
             <OmHeader header="New Order"/>
            </Grid>
            <Grid item xs={12}>
            <OrderForm order={order}/>
            </Grid>
        </Grid>
    </Container>
  )
}

export default NewOrderPage