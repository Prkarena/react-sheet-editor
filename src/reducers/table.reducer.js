const UPDATE_CELL = "UPDATE_CELL";
const SET_TABLE = "SET_TABLE";

export const updateCell = (row, column, value) => ({
  type: UPDATE_CELL,
  row,
  column,
  value,
});
export const setTable = (rows) => (dispatch) => {
  dispatch({ type: SET_TABLE, rows });
};

const getNewCell = ({ value = "", readOnly = false, type = "text" } = {}) => {
  const cell = {
    id: Math.random(),
    type,
    value,
    readOnly,
  };
  return cell;
};

const initialState = {
  headers: [
  ],
  rows: [],
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CELL: {
      const { row, column, value } = action;

      // update cell
      if (typeof row !== "undefined") {
        const rows = JSON.parse(JSON.stringify(state.rows));
        rows[row][column].value = value;
        return { ...state, rows };
      }

      // update header
      const headers = state.headers.map((h, i) => {
        if (i === column) {
          h.value = value;
        }
        return h;
      });
      return { ...state, headers };
    }
    case SET_TABLE: {
      const { rows } = action;
      const headers = rows[0];
      const row1 = rows[1];
      const newHeaders = headers.map((h, i) => getNewCell({ value: h }));
      const tmp = [];
      for (let i = 0; i < newHeaders.length; i++) {
        const type = "text";
        const value = row1[i];
        tmp.push(getNewCell({ type, value, readOnly: true }));
      }
      return { ...state, tableData: rows, headers: newHeaders, rows: [tmp] };
    }
    default:
      return state;
  }
};

export default tableReducer;
