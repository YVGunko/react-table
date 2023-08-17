import React, { useContext } from "react";
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
import useComment from "./useComment";
import { OrderContext } from "./order-context";
import {CustomerContext} from '../Customer/CustomerCrud';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
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
    const comments = useComment().comments;
    const {selectedCustomer} = useContext(CustomerContext);
    const {selectedOrderData, setSelectedOrderData} = useContext(OrderContext);
    const customer = `Клиент : ${selectedCustomer ? selectedCustomer.name : "Не выбран"}`;
    const order = `Заказ : ${selectedOrderData ? selectedCustomer.id : "Новый"}`;


    const { control, handleSubmit } = useForm({
      reValidateMode : 'onBlur',
        defaultValues: {
            "id": "",
            "comment": "",
            "division":{"division_code": "0",
            "division_name": "..."},
            "sample": false,
            "date": ""
        }
      });
    const onSubmit = data => console.log(data);
    
    const [open, setOpen] = React.useState(false);

    const inputHelper = {
      box : {
        required : "Должно быть заполнено",
        pattern : "Заполнено не верно"
      } 
    }
    return (
      <div>
        {divisions && (<IconButton color="primary" sx={{ p: '10px' }} aria-label="orderAdd" onClick={handleOpen} title="Cоздать заказ">
                <AddCardOutlinedIcon />
        </IconButton>)}
        <Modal open={open} onClose={handleClose} >
          <Box sx={{ ...style, width: 400 }} component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Typography noWrap>{customer}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography noWrap>{order}</Typography>
              </Grid>
              {comments && (<Grid item xs={12}>
                <Controller
                  control={control}
                  name="comment"
                  defaultValue={comments[0]}
                  rules={{required : true,}}
                  render={({ field: { ref, onChange, ...field },
                    fieldState: { error } }) => (
                    <Autocomplete
                      options={comments}
                      onChange={(_, data) => onChange(data)}

                      renderInput={(params) => (
                        <TextField
                          {...params}
                          {...field}
                          fullWidth
                          inputRef={ref}
                          variant="filled"
                          label="Заказ создан: "
                          error = {error !== undefined}
                          helperText = { error ? inputHelper.box[error.type] : ""}
                        />
                      )}
                    />
                  )}
                />
                </Grid>)}
              {divisions && (<Grid item xs={12}>
                  <Controller
                  control={control}
                  name="division"
                  defaultValue={ [ divisions[0] ] }
                  rules={{required : true,}}
                  render={({ field: { ref, onChange, ...field },
                    fieldState: { error } }) => (
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
                              error = {error !== undefined}
                              helperText = { error ? inputHelper.box[error.type] : ""}
                              />
                          )}
                      />
                  )}
                  />
                </Grid>)}
                <Grid item xs={12}>
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
                <Grid item xs={6}>
                    <Button type="submit">Сохранить</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button type="close">Закрыть</Button>
                </Grid>
            </Grid >
          </Box>
        </Modal>
      </div>
    );
  }




