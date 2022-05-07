import { AnyAction, createSlice, ThunkAction } from "@reduxjs/toolkit";
import type { RootState } from "Redux/store";
import { FlightType } from "Interfaces/FlightType";

// Define a type for the slice state
interface FlightState {
  loading: Boolean;
  flights: Array<FlightType> | null;
}

// Define the initial state using that type
const initialState: FlightState = {
  loading: false,
  flights: null,
};

const flightSlice = createSlice({
  name: "flights",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getFlights: (state) => {
      state.loading = true;
    },
    getFlightsSuccess: (state, { payload }) => {
      state.flights = payload;
      state.loading = false;
    },
    getFlightsFailure: (state) => {
      state.flights = null;
      state.loading = false;
    },
  },
});

export const { getFlights, getFlightsSuccess, getFlightsFailure } =
  flightSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectFlights = (state: RootState) => state.flights.flights;

export default flightSlice.reducer;

export const thunkFetchFlights =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    try {
      const response = await fetch("https://api.spacexdata.com/v3/launches");
      const data = await response.json();
      dispatch(getFlightsSuccess(data));
    } catch (error) {
      dispatch(getFlightsFailure());
    }
  };

// export function fetchRecipes() {
//   return async (dispatch) => {
//     dispatch(getFlights());

//     try {
//       const response = await fetch("https://api.spacexdata.com/v3/launches");
//       const data = await response.json();

//       dispatch(getFlightsSuccess(data));
//     } catch (error) {
//       dispatch(getFlightsFailure());
//     }
//   };
// }
