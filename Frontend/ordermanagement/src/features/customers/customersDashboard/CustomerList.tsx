import { useMemo, useState } from 'react'
import { Address, Customer } from '../../../graphql/generated/schema';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
interface CustomerListProps{
    customers: Customer[];
}
const CustomerList = ({customers}: CustomerListProps) => {
    const [columnDefs] = useState([
        { field: 'id' as keyof Customer, headerName: 'ID', width: 100, supressSizeToFit: true },
        { field: 'firstName' as keyof Customer, headerName: 'First Name', width: 200 },
        { field: 'lastName' as keyof Customer, headerName: 'Last Name', width: 200 },
        { field: 'contactNumber' as keyof Customer, headerName: 'Phone', width: 200 },
        { field: 'email' as keyof Customer, headerName: 'Email', width: 200 },
        { field: 'address' as keyof Customer, headerName: 'Address', width: 200 ,
          cellRenderer : function(params: any){
            const address = params.value as Address;
            return address.addressLine1
            +', '+address.addressLine2
            +', '+address.city
            +', '+address.state
            +', '+address.country;
        }},
    ]);
    const defaultColDef = useMemo(()=>({
        sortable: true,
        filter: true,
        resizable: true
    }),[]);
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
            <AgGridReact
                rowData={customers}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
            //    modules={[ClientSideRowModelModule]}
                />
        </div>
  )
}

export default CustomerList