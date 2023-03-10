import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSpreadsheetData } from './counterAPI';

const initialState = {
  traits: {
  },
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async () => {
    const response = await fetchSpreadsheetData();
    const data = await response.json();
    let traits = {};
    data.sheets.forEach((sht) => {
      let sheetProcessed = false;
      traits[sht.properties.title] = [];
      sht.data.forEach((row) => {
        if (sheetProcessed) return;
        let vals = {};
        row.rowData.forEach((cell, index) => {
          if (sheetProcessed) return;
          cell.values.forEach((val) => {
            if (sheetProcessed) return;
            if (!val.hasOwnProperty("formattedValue")) {
              sheetProcessed = true;
              return;
            }
            console.log(val);
            cell.values.forEach((val) => {
              if (sheetProcessed) return;
              if (!val.hasOwnProperty("formattedValue")) {
                sheetProcessed = true;
                return;
              }
              console.log(val);
              let key = val.formattedValue;
              let trait = {
                name: "",
                pos: index + 1,
                isInitialRelease: false,
                isRetired: false,
                isLimitedRelease: false,
              };
              if (key.includes("*")) {
                trait.isInitialRelease = true;
               key = key.replace("*", "");
              }
              if(key.includes("(Retired)")){
                trait.isRetired = true;
                key = key.replace("(Retired)", "");
              }

              if(key.includes("(Ltd. Release)")){
                trait.isLimitedRelease = true;
                key = key.replace("(Ltd. Release)", "");
              }
              key = key.trim();
              trait.name = key;
              vals[key] = trait;
            });
            });
          });
          traits[sht.properties.title] = vals;
        });
      });
      // The value we return becomes the `fulfilled` action payload
      return traits;
    }
    );

    export const counterSlice = createSlice({
      name: 'counter',
      initialState,
      // The `reducers` field lets us define reducers and generate associated actions
      reducers: {
              },
      // The `extraReducers` field lets the slice handle actions defined elsewhere,
      // including actions generated by createAsyncThunk or in other slices.
      extraReducers: (builder) => {
        builder
          .addCase(incrementAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(incrementAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.traits = action.payload;
          });
      },
    });

    export const { increment, decrement, incrementByAmount } = counterSlice.actions;

    // The function below is called a selector and allows us to select a value from
    // the state. Selectors can also be defined inline where they're used instead of
    // in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
    export const selectCount = (state) => state.counter.value;

    // We can also write thunks by hand, which may contain both sync and async logic.
    // Here's an example of conditionally dispatching actions based on current state.
    export const incrementIfOdd = (amount) => (dispatch, getState) => {
      const currentValue = selectCount(getState());
      if (currentValue % 2 === 1) {
        dispatch(incrementByAmount(amount));
      }
    };

    export default counterSlice.reducer;
