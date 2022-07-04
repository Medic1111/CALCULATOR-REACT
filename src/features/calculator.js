import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  display: "0",
  previous: "",
  record: [],
};

export const calculator = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    setDisplay: (state, action) => {
      if (state.display === "0") {
        state.display = "";
      }
      let concat = state.display.concat(action.payload);
      state.display = concat;
      console.log("display:", state.display);
    },
    clear: (state) => {
      state.display = initialState.display;
    },
    setPrevious: (state, action) => {
      state.previous = action.payload;
      console.log("previous: ", state.previous);
    },
    pushToRecord: (state, action) => {
      let push = [...state.record, action.payload];
      state.record = push;
      console.log(state.record);
    },
    clearRecord: (state) => {
      state.record = [];
    },
    popRecord: (state) => {
      state.record.pop();
      console.log(state.record);
    },
  },
});

export const actions = calculator.actions;
export default calculator.reducer;
