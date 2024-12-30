import { Typography } from '@mui/material'

interface OmHeaderProps {
    header:string
};

const OmHeader = ({header}:OmHeaderProps) => {
  return (
    <Typography variant="h5" component="div" align="center" gutterBottom display="block">
              {header}
    </Typography>
  )
}

export default OmHeader