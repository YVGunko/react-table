import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    Dialog,
    FormControlLabel,
    Grid,
    Icon,
    IconButton, 
    Modal,
    TextField,
    Select,
    MenuItem,
    DialogContent,
    Typography
  } from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import { teal, grey } from "@mui/material/colors";
import useDivision from "../Division/useDivision";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  export default function OrderDialog() {
    const handleOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };

    const divisions = useDivision().fetchedData;

    const { control, handleSubmit } = useForm({
        defaultValues: {
            "id": "",
            "comment": "",
            "customer_id": "",
            "division_code": "",
            "division_name": "...",
            "user_id": "",
            "user_name": "",
            "sample": false,
            "date": ""
        }
      });
      const onSubmit = data => console.log(data);
    
    const [open, setOpen] = React.useState(false);

  
    return (
      <div>
        {divisions && (<IconButton color="primary" sx={{ p: '10px' }} aria-label="orderAdd" onClick={handleOpen} title="Cоздать заказ">
                <AddCardOutlinedIcon />
        </IconButton>)}
        <Modal open={open} onClose={handleClose} >
          <Box sx={{ ...style, width: 800 }} component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                {divisions && (<Grid item xs={6}>
                    <Controller
                    control={control}
                    name="division"
                    defaultValue={[divisions[0]]}
                    render={({ field: { ref, onChange, ...field } }) => (
                        <Autocomplete
                            options={divisions}
                            getOptionLabel={(divisions) => divisions.division_name}
                            onChange={(_, data) => onChange(data)}
                            renderInput={(params) => (
                                <TextField
                                {...field}
                                {...params}
                                fullWidth
                                inputRef={ref}
                                variant="filled"
                                label="Подразделение"
                                />
                            )}
                        />
                    )}
                    />
                </Grid>)}
                <Grid item xs={6}>
                    <Controller
                    control={control}
                    name="sample"
                    defaultValue={false}
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormControlLabel
                        control={
                            <Checkbox onChange={onChange} checked={value} {...field} />
                        }
                        label="Образцы"
                        />
                    )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit">Submit</Button>
                </Grid>

            </Grid >
          </Box>
        </Modal>
      </div>
    );
  }




