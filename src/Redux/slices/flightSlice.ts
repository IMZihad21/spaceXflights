import { AnyAction, createSlice, ThunkAction } from "@reduxjs/toolkit";
import type { RootState } from "Redux/store";
import { FlightType } from "Interfaces/FlightType";

interface FilterState {
  lunchTime: string | null;
  lunchStatus: string | null;
  lunchTags: string | null;
  rocketName: string | null;
}

// Define a type for the slice state
interface FlightState extends FilterState {
  loading: boolean;
  data: Array<FlightType> | null;
}

// Define the initial state using that type
const initialState: FlightState = {
  loading: false,
  data: null,
  lunchTime: "",
  lunchStatus: "",
  lunchTags: "",
  rocketName: "",
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
    setFilterRocketName: (state, { payload }) => {
      state.rocketName = payload;
      console.log(state.rocketName);
    },
  },
});

export const {
  getFlights,
  getFlightsSuccess,
  getFlightsFailure,
  setFilterRocketName,
} = flightSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLoadingState = (state: RootState) => state.flights.loading;
export const selectFlights = (state: RootState) => {
  const { lunchTime, lunchStatus, lunchTags, rocketName, data } = state.flights;
  if (!(lunchTime || lunchStatus || lunchTags || rocketName)) {
    return state.flights.data;
  }

  return data?.filter((flight) => {
    // if (lunchTime && flight.lunchTime !== lunchTime) {
    //   return false;
    // }
    // if (lunchStatus && flight.lunchStatus !== lunchStatus) {
    //   return false;
    // }
    // if (lunchTags && flight.lunchTags !== lunchTags) {
    //   return false;
    // }
    if (
      rocketName &&
      flight.rocket.rocket_name
        .toLocaleLowerCase()
        .includes(rocketName.toLocaleLowerCase())
    ) {
      return true;
    }
  });
};
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
