import React from "react";
import { connect } from "react-redux";
import UncontrolledCell from "./CellUncontrolled";
import SelectSurvey from "./SelectSurvey";

import {
  updateCell
} from "../../reducers";

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const value = e.target.value;
    if (this.props.onCellChange) {
      this.props.onCellChange(this.props.row, this.props.column, value);
    }
  }

  render() {
    const {
      readOnly,
      value,
      id,
      type,
      errors,
    } = this.props;
    const hasErrors = Array.isArray(errors) && errors.length > 0;

    return (
      <div
        key={"cell" + id}
        className={"cell " + (hasErrors ? "has-errors" : "")}
      >
        {type === "survey" && (
          <SelectSurvey onChange={this.onChange} defaultValue={value} />
        )}

        {type === "text" && (
          <UncontrolledCell
            id={id}
            readOnly={readOnly}
            value={value}
            onChange={this.onChange}
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  onCellChange: updateCell
};

export default connect(
  null,
  mapDispatchToProps
)(Cell);
