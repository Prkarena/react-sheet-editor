import { request } from "../services/api.service";

const DELETE_COLUMN = "DELETE_COLUMN";
const ADD_ROW = "ADD_ROW";
const DELETE_ROW = "DELETE_ROW";
const UPDATE_CELL = "UPDATE_CELL";
const SET_HEADERS = "SET_HEADERS";
const SET_BODY = "SET_BODY";
const SET_TABLE = "SET_TABLE";

export const deleteColumn = (column) => ({ type: DELETE_COLUMN, column });
export const addRow = (after) => ({ type: ADD_ROW, after });
export const deleteRow = (row) => ({ type: DELETE_ROW, row });
export const updateCell = (row, column, value) => ({
  type: UPDATE_CELL,
  row,
  column,
  value,
});
export const setHeaders = (headers) => ({ type: SET_HEADERS, headers });
export const setBody = (body) => ({ type: SET_BODY, body });
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
  surveys: [],
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_COLUMN: {
      const { column = 0 } = action;
      const headersLeft = [...state.headers].slice(0, column);
      const headersRight = [...state.headers].slice(column + 1);
      const headers = [...headersLeft, ...headersRight];

      const rows = state.rows.map((row) => {
        const cellsLeft = [...row].slice(0, column);
        const cellsRight = [...row].slice(column + 1);
        return [...cellsLeft, ...cellsRight];
      });

      return {
        ...state,
        headers,
        rows,
      };
    }
    case ADD_ROW: {
      const { after = 0 } = action;
      const newColumns = state.headers.map((h) => {
        const isSurvey = h.value === "Survey";
        const type = isSurvey ? "survey" : "text";
        const value =
          isSurvey && state.surveys.length === 1 ? state.surveys[0].name : "";
        return getNewCell({ type, value });
      });
      const newRow = [newColumns];
      const rowsBefore = [...state.rows].slice(0, after);
      const rowsAfter = [...state.rows].slice(after);
      const rows = [...rowsBefore, ...newRow, ...rowsAfter];
      return { ...state, rows };
    }
    case DELETE_ROW: {
      const { row } = action;
      const rowsBefore = [...state.rows].slice(0, row);
      const rowsAfter = [...state.rows].slice(row + 1);
      return { ...state, rows: [...rowsBefore, ...rowsAfter] };
    }
    case UPDATE_CELL: {
      const { row, column, value } = action;

      // update cell
      if (typeof row !== "undefined") {
        const rows = JSON.parse(JSON.stringify(state.rows));
        rows[row][column].value = value;
        // const rows = state.rows.map((r, i) => {
        //   return r.map((cell, j) => {
        //     if (i === row && j === column) {
        //       cell.value = value;
        //     }
        //     return cell;
        //   });
        // });
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
