import { useState } from 'react'
import { Address, Customer } from '../../../graphql/generated/schema';
import OmGrid from '../../../components/elements/OmGrid';
import { IconButton } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
interface CustomerListProps{
    customers: Customer[];
}
const CustomerList = ({customers}: CustomerListProps) => {
    const [columnDefs] = useState([
        { field: 'id' as keyof Customer, headerName: 'ID', width: 100, supressSizeToFit: true,
          cellRenderer : function(params: any){
            return ( 
            <IconButton onClick={()=>window.open(`/customers/${params.value}`,'_black')}>
              <LaunchIcon fontSize="small" color="secondary"/>
            </IconButton>
            )
          }
         },
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
  return (
        <>
        <OmGrid rowData={customers} columnDefs={columnDefs} />
        </>

  )
}

export default CustomerList