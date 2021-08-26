import React from "react";
import { connect } from "react-redux";
import Row from "./Row";

import { addRow } from "../../reducers";

class Body extends React.Component {
  render() {
    const { rows, tableData } = this.props;
    console.log('tableData', tableData)
    return (
      <div className={"body"}>
        {rows.length ?
          rows.map((cells, i) => (
            <Row
              cells={cells}
              row={i}
              key={"row-" + i}
              isLastRow={i === rows.length - 1}
            />
          )) : <>Import xlsx / csv file</>}
      </div>
    );
  }
}

const mapStateToProps = ({ table }) => ({
  rows: table.rows,
  tableData: table
});

const mapDispatchToProps = {
  addRow
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Body);
