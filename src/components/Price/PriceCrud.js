import React, { useReducer, useState, useCallback, useRef, useContext, createContext } from "react";

import Split from '@uiw/react-split';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import InputBase from '@mui/material/InputBase';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/window-size'

import TokenContext from '../Token/Token';

import {isString, removeSpecials, isStringInValid } from '../../utils/utils';

const PriceCrud = () => {
  //const inputRef = useRef(null);
  const [scrnWidth, scrnHeight] = useWindowSize();
  let NavbarHeight = 100;
  const token = useContext(TokenContext);
  const isOrderMaker = token?.roles.toLowerCase().indexOf("order_maker".toLowerCase()) !== -1 ;


    return (
      <div>

      </div>
    );
}
export default PriceCrud;