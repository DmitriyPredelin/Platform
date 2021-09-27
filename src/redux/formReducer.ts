import { createSlice } from "@reduxjs/toolkit";
import { TField } from "../common/interfaces";

const initialState = {
  fieldList: [] as Array<TField>,
  checkedField: {} as TField,
};

const slice = createSlice({
  name: "formSlice",
  initialState: initialState,
  reducers: {
    addFieldList(state, action) {
      state.fieldList.push(action.payload);
    },
    /*checkField(state, action) {
      state.fieldList.forEach((field: TField) => {
        field.checked = false;
        if (field.id === action.payload) {
          field.checked = true;
        }
      });
    },
    deleteField(state) {
      state.fieldList = state.fieldList.filter((field: TField) => {
        return field.checked === false;
      });
    },*/
  },
});

export default slice.reducer;
export const { addFieldList/*, checkField, deleteField*/ } = slice.actions;
