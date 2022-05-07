import { AnyAction, createSlice, ThunkAction } from "@reduxjs/toolkit";
import type { RootState } from "Redux/store";
import { FlightType } from "Interfaces/FlightType";

// Define a type for the slice state
interface FlightState {
  loading: Boolean;
  data: Array<FlightType> | null;
}

// Define the initial state using that type
const initialState: FlightState = {
  loading: false,
  data: null,
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
      state.data = payload;
      state.loading = false;
    },
    getFlightsFailure: (state) => {
      state.data = null;
      state.loading = false;
    },
  },
});

export const { getFlights, getFlightsSuccess, getFlightsFailure } =
  flightSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectFlights = (state: RootState) => state.flights;
// Get a flight data by its id from the store
export const selectFlightDetails = (id: string) => (state: RootState) =>
  state.flights.data?.find((flight) => flight.flight_number === Number(id));

export default flightSlice.reducer;

export const thunkFetchFlights =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch(getFlights());
    try {
      const response = await fetch("https://api.spacexdata.com/v3/launches");
      const data = await response.json();
      dispatch(getFlightsSuccess(data));
    } catch (error) {
      dispatch(getFlightsFailure());
    }
  };
