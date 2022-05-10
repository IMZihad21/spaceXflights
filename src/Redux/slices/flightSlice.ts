import { AnyAction, createSlice, ThunkAction } from "@reduxjs/toolkit";
import type { RootState } from "Redux/store";
import { FlightType } from "Interfaces/FlightType";

interface FilterState {
  launchTime: number | null;
  launchStatus: "success" | "failure" | null;
  launchTags: string | null;
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
  launchTime: null,
  launchStatus: null,
  launchTags: null,
  rocketName: null,
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
    },
    setFilterLaunchTime: (state, { payload }) => {
      state.launchTime = payload;
    },
    setFilterLaunchStatus: (state, { payload }) => {
      state.launchStatus = payload;
    },
    setFilterTags: (state, { payload }) => {
      state.launchTags = payload;
    },
  },
});

export const {
  getFlights,
  getFlightsSuccess,
  getFlightsFailure,
  setFilterRocketName,
  setFilterLaunchTime,
  setFilterLaunchStatus,
  setFilterTags,
} = flightSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLoadingState = (state: RootState) => state.flights.loading;
export const selectFlights = (state: RootState) => {
  const { launchTime, launchStatus, launchTags, rocketName, data } =
    state.flights;
  if (!(launchTime || launchStatus || launchTags || rocketName)) {
    return state.flights.data;
  }

  return data?.filter((flight) => {
    if (launchTime && flight.launch_date_unix > Number(launchTime)) {
      return true;
    }
    if (launchStatus) {
      return (
        flight.launch_success ===
        (launchStatus === "success"
          ? true
          : launchStatus === "failure"
          ? false
          : null)
      );
    }
    if (
      rocketName &&
      flight.rocket.rocket_name
        .toLocaleLowerCase()
        .includes(rocketName.toLocaleLowerCase())
    ) {
      return true;
    }
    if (launchTags) {
      return flight.upcoming === (launchTags === "upcoming");
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
