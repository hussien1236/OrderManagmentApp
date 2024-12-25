import { useMemo, useState } from "react";
import { Customer, Order } from "../../../graphql/generated/schema";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
interface OrderListProps {
    orders: Order[];
}

const OrderList = ({orders}: OrderListProps) => {
    const [columnDefs] = useState([
        { field: 'id' as keyof Order, headerName: 'ID', width: 100, supressSizeToFit: true },
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
   
    const defaultColDef = useMemo(()=>({
        sortable: true,
        filter: true,
        resizable: true
    }),[]);
    return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
            rowData={orders}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
           // modules={[ClientSideRowModelModule]}
            />
    </div>
  );
}

export default OrderList