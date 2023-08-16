import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';

import { submitCustomer } from './Customer';
import TokenContext from '../Token/Token';
import { CustomerContext } from './CustomerCrud';

export default function CustomerDialog() {
  const [open, setOpen] = React.useState(false);
  const token = React.useContext(TokenContext);
  const {selectedCustomer, setSelectedCustomer, textToSearchFor, setTextToSearchFor} = React.useContext(CustomerContext);
  const [customer, setCustomer] = React.useState(selectedCustomer);
  const [submitting, setSubmitting] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    //TODO useMemo ?
  React.useEffect(() => {
    setCustomer((prevCustomer) => 
    selectedCustomer !== undefined
        ? selectedCustomer
        : prevCustomer,
    );
    console.log(`CustomerDialog: useEffect selectedCustomer${JSON.stringify(selectedCustomer)}`);
  }, [selectedCustomer, setCustomer]);

  const handleChange = event => {
    const target = event.currentTarget;
    setCustomer({
      ...customer, 
        [target.name]: target.value});
    //console.log(`handleChangeCustomer: ${JSON.stringify(target)}`); 
  }
  const handleCancel = event => {
    if (event.preventDefault) event.preventDefault();
    setCustomer(selectedCustomer);
  }
  const handleSubmit = React.useCallback(( event ) => {
    if (event.preventDefault) event.preventDefault();
    
    submitCustomer (customer, token).then(res => {
      setTextToSearchFor(customer?.name)
      console.log(`CustomerDialog handleSubmit setTextToSearchFor = ${JSON.stringify(customer)}`);
    });
  }, [customer, token]);

  return (
    <div>
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="personAdd" onClick={handleClickOpen}>
                <AccountBoxOutlinedIcon />
        </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Данные клиента</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Введите данные клиента.
          </DialogContentText>
            <TextField
                value={customer.name || ''} 
                autoFocus
                margin="normal"
                required
                fullWidth
                id="name"
                label="Наименование клиента"
                name="name"
                placeholder="name"
                onChange={handleChange} 
                />
            <TextField
                value={customer.phone || ''} 
                margin="dense"
                fullWidth
                id="phone"
                label="номер телефона"
                name="phone"             
                type="phone"              
                placeholder="+7"
                onChange={handleChange} 
                />
            <TextField
                value={customer.email || ''}          
                margin="dense"
                fullWidth
                variant="standard"
                id="email"
                label="адрес email"
                name="email"
                type="email" 
                placeholder="ivanov@ivan.ru"
                onChange={handleChange} 
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Отменить</Button>
          <Button onClick={handleSubmit}>Сохранить</Button>
          <Button onClick={handleClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}