import { useState } from "react";
import { Customer, Order } from "../../../graphql/generated/schema";
import OmGrid from "../../../components/elements/OmGrid";
import { IconButton } from "@mui/material";
import LaunchIcon from '@mui/icons-material/Launch';
import { useNavigate } from "react-router-dom";
interface OrderListProps {
    orders: Order[];
}

const OrderList = ({orders}: OrderListProps) => {
    const navigate = useNavigate();
    const [columnDefs] = useState([
        { field: 'id' as keyof Order, headerName: 'ID', width: 100, supressSizeToFit: true,
          cellRenderer: function(params: any) {
            return (
              <IconButton onClick={() => {navigate(`/orders/${params.value}`);}}>
                <LaunchIcon fontSize="small" color="secondary"/>
              </IconButton>
            );
          }
         },
        { field: 'customer' as keyof Order, headerName: 'Customer', width: 200, 
            cellRenderer: function(params: any) {
                const customer = params.data.customer as Customer;
                return `${customer.firstName} ${customer.lastName}`;
            }
         },
        { field: 'totalAmount' as keyof Order, headerName: 'Total', width: 150 },
        { field: 'orderDate' as keyof Order, headerName: 'Order Date', width: 150 },
        { field: 'status' as keyof Order, headerName: 'Status', width: 150 }
    ]);
    return (
    <>
      <OmGrid rowData={orders} columnDefs={columnDefs}/>
    </>
  );
}

export default OrderList