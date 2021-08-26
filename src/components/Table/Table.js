import React from "react";
import Headers from "./Headers";
import Body from "./Body";
import ExcelFileInput from "../ExcelFileInput";

class Table extends React.Component {
  render() {
    return (
      <div>
        <div className={"btn-bar"}>
          <div>
            <ExcelFileInput />
          </div>
        </div>
        <div className={"table-wrapper"}>
          <div className={"table"}>
            <Headers />
            <Body />
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
