import TextField from '@mui/material/TextField';
import {useField} from 'formik';
interface OmTextFieldProps{
    name:string,
    otherProps:any
};
const OmTextField = ({name, otherProps}: OmTextFieldProps) => {
  const [field, meta] = useField(name);
  const configTextField = {
   ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined'
  };
  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }
    return (
    <TextField {...configTextField}/>
  )
}

export default OmTextField