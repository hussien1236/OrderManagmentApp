import Button from "@mui/material/Button";
import { useFormikContext } from "formik"

interface OmSubmitButtonProps {
    children:any,
    otherProps:any
};

const OmSubmitButton = ({children,otherProps}: OmSubmitButtonProps) => {
    const {submitForm} = useFormikContext();
    function handleSubmit(){
        submitForm();
    }
    const configSubmitButton = {
        ...otherProps,
        color: 'primary',
        variant: 'contained',
        fullwidth: true,
        onClick: handleSubmit
    }
  return (
    <Button {...configSubmitButton} >
        {children}
    </Button>
  )
}

export default OmSubmitButton