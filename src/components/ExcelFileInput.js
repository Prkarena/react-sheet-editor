import React from "react";
import { connect, useSelector } from "react-redux";
import XLSX from "xlsx";
import { setTable } from "../reducers";

class ExcelFileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleFile = this.handleFile.bind(this);
  }
  handleFile(file) {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = ({ target: { result } }) => {
      const wb = XLSX.read(result, { type: rABS ? "binary" : "array" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      this.props.setTable(data);
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  }
  render() {
    return <DataInput tableData={this.props.tableData} handleFile={this.handleFile} />;
  }
}

const mapStateToProps = ({ table }) => ({
    tableData: table
  });

const mapDispatchToProps = {
  setTable
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExcelFileInput);

const DataInput = (props) => {
const tableData= useSelector(state => state.table.tableData);
const headers= useSelector(state => state.table.headers);
  const fileInput = React.useRef(null);

  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) props.handleFile(files[0]);
  }

 const exportFile = (opt = 'xlsx') => {
    const newHeader = headers.map(item => item.value);
    tableData[0] = newHeader;
    /* convert state to file */
    const ws = XLSX.utils.aoa_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    if(opt === 'xlsx') XLSX.writeFile(wb, "sheetjs.xlsx",  {bookType: 'xlsx'});
    if(opt === 'csv') XLSX.writeFile(wb, "sheetjs.csv", {bookType: 'csv'});
  }
return (
    <>
    <button
        style={{ marginLeft: 10 }}
        onClick={() => fileInput.current.click()}
    >
        <i className="fas fa-upload" />
        &nbsp; Import File
    </button>
    <input
        ref={fileInput}
        type="file"
        hidden
        accept={SheetJSFT}
        onChange={handleChange}
    />
    <button
        style={{ marginLeft: 10 }}
        onClick={() => exportFile('xlsx')}
    >
        <i className="fas fa-upload" />
        &nbsp; Export XLSX
    </button>
    <button
        style={{ marginLeft: 10 }}
        onClick={() => exportFile('csv')}
    >
        <i className="fas fa-upload" />
        &nbsp; Export CSV
    </button>
    </>
);
}



const SheetJSFT = [
  "xlsx",
  "xlsb",
  "xlsm",
  "xls",
  "xml",
  "csv",
  "txt",
  "ods",
  "fods",
  "uos",
  "sylk",
  "dif",
  "dbf",
  "prn",
  "qpw",
  "123",
  "wb*",
  "wq*",
  "html",
  "htm"
]
  .map(function(x) {
    return "." + x;
  })
  .join(",");
