import React, { useEffect, useState, useCallback, useRef, useContext } from "react";

import Split from '@uiw/react-split';
import TokenContext from '../Token/Token';

import CustomerGrid from "../Customer/CustomerGrid";
import CustomerEdit from "../Customer/CustomerEdit";

const PriceCrud = () => {
  const token = useContext(TokenContext);
  //const customer = useContext(CustomerContext);
  const header = `Price for ${token?.roles}`;

  const [textToSearchFor, setTextToSearchFor] = useState("");

    return (
          <div>
            <Split disable style={{ position: "static", height: '100%', border: '1px solid #d5d5d5' }}>
              <div style={{ minWidth: '35%', maxWidth: '35%', backgroundColor: '#eaeaea' }}>
                <CustomerGrid textToSearchFor={textToSearchFor} />
              </div>

              <div style={{ flex: 1 }}>
              <Split disable mode="vertical">
                <div>
                <CustomerEdit />
                </div>
                <div>
                  Bottom Pane
                </div>
              </Split>
              </div>
            </Split>
          </div>
    );
}
export default PriceCrud;