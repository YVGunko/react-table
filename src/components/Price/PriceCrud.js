import React, { useContext } from "react";
import TokenContext from '../Token/Token';

const PriceCrud = () => {
  const token = useContext(TokenContext);
  const header = `Price for ${token?.roles}`;
    return (
          <div>
            <h1> {header} </h1> 
          </div>
      );
}
export default PriceCrud;