import { MenuItem, TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";

interface OmSelectProps {
  name:string,
  options: any, 
  otherProps: any
};
const OmSelect = ({name, options, otherProps}: OmSelectProps) => {
    const {setFieldValue} = useFormikContext();
    const [field, meta] = useField(name);

    function handleChange(event :any){
        const selectedValue = event.target.value;
        setFieldValue(name, selectedValue);
    };
    const configSelect = {
        ...field,
        ...otherProps,
        select:true,
        fullwidth:true,
        variant: 'outlined',
        onChange: handleChange
    };
    if (meta && meta.touched && meta.error) {
        configSelect.error = true;
        configSelect.helperText = meta.error;
    }
    return (
    <TextField {...configSelect} style={{width:'100%'}}>
        {Object.keys(options).map((item, pos) => {
            return (
                <MenuItem key={pos} value={item}>
                    {options[item]}
                </MenuItem>
            )
        })}
    </TextField>
  )
}

export default OmSelect