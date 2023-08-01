import React, { useEffect, useState, useCallback, useRef, useContext } from "react";
import TokenContext from '../Token/Token';
import Split from '@uiw/react-split';
import api from "../http-common/http-common";
import CustomerTable from "../Customer/CustomerTable";

const PriceCrud = () => {
  const token = useContext(TokenContext);
  const header = `Price for ${token?.roles}`;

  const [textToSearchFor, setTextToSearchFor] = useState("");

    return (
          <div>
    <Split disable style={{ height: 500, border: '1px solid #d5d5d5', borderRadius: 3 }}>
      <div style={{ maxWidth: 400, backgroundColor: '#eaeaea' }}>
        <CustomerTable textToSearchFor={textToSearchFor} />
      </div>

      <div style={{ flex: 1 }}>
      <Split disable mode="vertical">
        <div>
          Top Pane
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