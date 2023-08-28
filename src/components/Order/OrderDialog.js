import React, { useContext, useEffect, setValue } from "react";
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
import { orderService } from "./orderService";
import {CustomerContext} from '../Customer/CustomerCrud';
import { isObjectEmpty } from "../../utils/utils";
import TokenContext from '../Token/Token';

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

  export default function OrderDialog( inputedOrder, extOpen ) {
    const [open, setOpen] = React.useState(extOpen ? extOpen : false);
    const [order, setOrder] = React.useState(inputedOrder ? inputedOrder : {});
    console.log(`OrderDialog order = ${JSON.stringify(order)}, extOpen = ${extOpen}`)
    const isAddMode = isObjectEmpty(order);

    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const divisions = useDivision().fetchedData;
    const comments = useComment().comments;
    const {selectedCustomer} = useContext(CustomerContext);
    //const {selectedOrderData, setSelectedOrderData} = useContext(OrderContext);
    const customer = `Клиент : ${selectedCustomer ? selectedCustomer.name : "Не выбран"}`;
    
    //console.log(`OrderDialog order = ${JSON.stringify(order)}`)
    
    const orderTitle = `Заказ : ${isObjectEmpty(order) ? "Новый" : order.id}`;
    const token = useContext(TokenContext);

    const inputHelper = {
      box : {
        required : "Должно быть заполнено",
        pattern : "Заполнено не верно"
      } 
    }
    /*      "id": "",
      "comment": "",
      "details": "",
      "division_code": "",
      "division_name": "",
      "user_id": token.id,
      "user_name": "",
      "sample": false,
      "date": "" */
    const orderOne = {
        "id": String,
        "comment": String,
        "division_code": String,
        "sample": Boolean,
      }
    const defaultValues = {
      "id": "",
      "comment": "",
      "division_code": "",
      "sample": false,
    }
    const { control, handleSubmit, reset, setValue, getValues, errors, formState } = useForm({
      reValidateMode : 'onBlur',
      defaultValues,
      });
    const onSubmit = data => {
      console.log(`onSubmit data = ${data}`);
      /*return isAddMode
          ? createOrder(data)
          : updateOrder(id, data);*/
    }
    /*function createOrder(data) {
      return orderService.create(data, token)
          .then(() => {
              alertService.success('User added', { keepAfterRouteChange: true });
              history.push('.');
          })
          .catch(alertService.error);
    }
    function getValue(key, prop) {
      return order[key][prop]
    }
    useEffect(() => {
      //console.log(`OrderDialog isAddMode, !isObjectEmpty(order) = ${isAddMode}, ${!isObjectEmpty(order)}`)
      const fields = ['id', 'comment', 'details', "customer_id",
      'division_code', 'division_name', 
      "user_id", "user_name",
      "sample", "date"];
      if (!isAddMode & !isObjectEmpty(order)) {
        
            fields.forEach((field) => setValue(field, order[field]));
            setOrder(order);
            fields.forEach((field) => console.log(`!isAddMode field, ${getValues(order[field])}`));
        };
        if (isAddMode & !isObjectEmpty(order)) {
          fields.forEach((field) => console.log(`***** isAddMode field, ${(field)}`));
      };
    }, [order]);

    /*
    if (!isObjectEmpty(extOpen) && extOpen === true) setOpen(true);
    console.log(`OrderDialog extOpen = ${extOpen}`)*/

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
                <Typography noWrap>{orderTitle}</Typography>
              </Grid>
              {comments && (<Grid item xs={12}>
                <Controller
                  control={control}
                  name="comment"

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
                          label="Филиал: "
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
                  name="division_code"

                  rules={{required : true,}}
                  render={({ field: { ref, onChange, ...field },
                    fieldState: { error } }) => (
                      <Autocomplete
                          options={divisions}
                          getOptionLabel={(divisions) => divisions.division_name}
                          
                          onChange={(_, data) => onChange(data.division_code)}
                          renderInput={(params) => (
                              <TextField
                              {...field}
                              {...params}
                              fullWidth
                              inputRef={ref}
                              variant="filled"
                              label="Подразделение: "
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




