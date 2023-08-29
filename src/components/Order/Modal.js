import React, { useContext, useEffect, setValue } from "react";
import ReactDOM from 'react-dom';
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
    TextField,
    Select,
    MenuItem,
    DialogContent,
    Typography
  } from "@mui/material";
  import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';

  import useDivision from "../Division/useDivision";
import useComment from "./useComment";
import { OrderContext } from "./order-context";
import { orderService } from "./orderService";
import {CustomerContext} from '../Customer/CustomerCrud';
import { isObjectEmpty } from "../../utils/utils";
import TokenContext from '../Token/Token';

function Modal({ children }) {
  return ReactDOM.createPortal(children, document.body);
}
function ModalButton(props) {
    const {order} = props;
    console.log(`ModalButton order = ${JSON.stringify(order)}`)
    const divisions = useDivision().fetchedData;
    const comments = useComment().comments;
    const {selectedCustomer} = useContext(CustomerContext);
    const curDate = new Date().toLocaleString();
  const [visible, setVisible] = React.useState(false);
  return (
    <div>

      {divisions && (<IconButton color="primary" sx={{ p: '10px' }} aria-label="orderAdd" onClick={() => setVisible(true)} title="Cоздать заказ">
                <AddCardOutlinedIcon />
        </IconButton>)}
      {visible && (
        <Modal>
          <div
            className="overlay"
            style={{ position: 'fixed', inset: '0 0 0 0' }}
          ></div>
          <div
            style={{
              top: '30%',
              left: '30%',
              position: 'fixed',
              width: '300px',
              height: '300px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <div style={{ textAlign: 'right' }}>
              <button
                style={{ width: '100px' }}
                onClick={() => setVisible(false)}
              >
                Close
              </button>
            </div>
            <h1>{JSON.stringify(order)}</h1>
          </div>
        </Modal>
      )}
    </div>
  );
}

export { Modal, ModalButton };