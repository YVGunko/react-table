import React, { useEffect, useState, useCallback, useRef, useContext, createContext } from "react";
import { Select } from "antd";

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

import  api  from "../http-common/http-common";
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/window-size'

import TokenContext from '../Token/Token';

import {isString, removeSpecials, isStringInValid } from '../../utils/utils';


const PriceCrud = () => {
  const [data, setData] = useState([]);
  const productURL = `/products/all?division_code=`;
  const divCode = `00-000025`;
  const productDefaultValues = ["303 хаки","LS3 №291 св.серый облег."]
useEffect(() => {
    api(`${productURL}${divCode}`, 'GET', token)
    .then((data) => {
      const userData = data.map((item) => ({
        label: item.name,
        value: item.id,
        text: item.division.division_code
      }));
      setData(userData);
    });
}, []);

  const [scrnWidth, scrnHeight] = useWindowSize();
  let NavbarHeight = 100;
  const token = useContext(TokenContext);
  const isOrderMaker = token?.roles.toLowerCase().indexOf("order_maker".toLowerCase()) !== -1 ;
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const handleInput = (value) => {
    console.log(`inputed ${value}`);
  };

    return (
      <div>
      <Select mode="multiple" style={{ width: 250 }}
      onChange={handleChange}
      onInput={handleInput}
      defaultValue={productDefaultValues}>
        {data.map(({ label, value, text }) => (
          <Select.Option value={label} key={value} text={text}>
            {label}
          </Select.Option>
        ))}
      </Select>
      </div>
    );
}
export default PriceCrud;