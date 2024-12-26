import { Alert, Box } from '@mui/material'

interface OmAlertProps{
  message:string
}
const OmAlert = ({message}: OmAlertProps) => {
  return (
    <Box className='flex justify-center items-center h-96'>
    <Alert severity='error'>{message}</Alert>
    </Box>
  )
}

export default OmAlert