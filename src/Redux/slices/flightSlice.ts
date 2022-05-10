import { AnyAction, createSlice, ThunkAction } from "@reduxjs/toolkit";
import type { RootState } from "Redux/store";
import { FlightType } from "Interfaces/FlightType";

// The initial state of the slice filters
interface FilterState {
  launchTime: string | null;
  launchTimeUnix: number | null;
  launchStatus: "success" | "failure" | null;
  launchTags: string | null;
  rocketName: string | null;
}

// Define a type for the slice state
interface FlightState {
  loading: boolean;
  data: Array<FlightType> | null;
  filters: FilterState;
}

// Define the initial state using that type
const initialState: FlightState = {
  loading: false,
  data: null,
  filters: {
    launchTime: null,
    launchTimeUnix: null,
    launchStatus: null,
    launchTags: null,
    rocketName: null,
  },
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
      state.filters.rocketName = payload;
    },
    setFilterLaunchTime: (state, { payload }) => {
      state.filters.launchTime = payload;
      const date = new Date();
      switch (payload) {
        case "lastWeek":
          state.filters.launchTimeUnix = Math.round(
            date.setDate(date.getDate() - 7) / 1000
          );
          break;
        case "lastMonth":
          state.filters.launchTimeUnix = Math.round(
            date.setMonth(date.getMonth() - 1) / 1000
          );
          break;
        case "lastYear":
          state.filters.launchTimeUnix = Math.round(
            date.setFullYear(date.getFullYear() - 1) / 1000
          );
          break;
        case "lastTwoYears":
          state.filters.launchTimeUnix = Math.round(
            date.setFullYear(date.getFullYear() - 2) / 1000
          );
          break;
        default:
          state.filters.launchTimeUnix = null;
          state.filters.launchTime = null;
          break;
      }
      // state.filters.launchTime = payload;
    },
    setFilterLaunchStatus: (state, { payload }) => {
      state.filters.launchStatus = payload;
    },
    setFilterTags: (state, { payload }) => {
      state.filters.launchTags = payload;
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
  const { launchTimeUnix, launchStatus, launchTags, rocketName } =
    state.flights.filters;
  if (!(launchTimeUnix || launchStatus || launchTags || rocketName)) {
    return state.flights.data;
  }

  // TL;DR: If any filter is set, filter the data and combine the results
  return state.flights.data?.filter((flight) => {
    const isValid = {
      launchTime: false,
      launchStatus: false,
      launchTags: false,
      rocketName: false,
    };
    if (launchTimeUnix) {
      isValid.launchTime = flight.launch_date_unix > Number(launchTimeUnix);
    }
    if (launchStatus) {
      isValid.launchStatus =
        flight.launch_success ===
        (launchStatus === "success"
          ? true
          : launchStatus === "failure"
          ? false
          : null);
    }
    if (rocketName) {
      isValid.rocketName = flight.rocket.rocket_name
        .toLocaleLowerCase()
        .includes(rocketName.toLocaleLowerCase());
    }
    if (launchTags) {
      isValid.launchTags = flight.upcoming === (launchTags === "upcoming");
    }

    if (launchTimeUnix && launchStatus && launchTags && rocketName) {
      return (
        isValid.launchTime &&
        isValid.launchStatus &&
        isValid.launchTags &&
        isValid.rocketName
      );
    }
    if (launchTimeUnix && launchStatus && launchTags) {
      return isValid.launchTime && isValid.launchStatus && isValid.launchTags;
    }
    if (launchTimeUnix && launchStatus && rocketName) {
      return isValid.launchTime && isValid.launchStatus && isValid.rocketName;
    }
    if (launchTimeUnix && launchTags && rocketName) {
      return isValid.launchTime && isValid.launchTags && isValid.rocketName;
    }
    if (launchStatus && launchTags && rocketName) {
      return isValid.launchStatus && isValid.launchTags && isValid.rocketName;
    }
    if (launchTimeUnix && launchStatus) {
      return isValid.launchTime && isValid.launchStatus;
    }
    if (launchTimeUnix && launchTags) {
      return isValid.launchTime && isValid.launchTags;
    }
    if (launchStatus && launchTags) {
      return isValid.launchStatus && isValid.launchTags;
    }
    if (launchTimeUnix && rocketName) {
      return isValid.launchTime && isValid.rocketName;
    }
    if (launchStatus && rocketName) {
      return isValid.launchStatus && isValid.rocketName;
    }
    if (launchTags && rocketName) {
      return isValid.launchTags && isValid.rocketName;
    }
    if (launchTimeUnix) {
      return isValid.launchTime;
    }
    if (launchStatus) {
      return isValid.launchStatus;
    }
    if (launchTags) {
      return isValid.launchTags;
    }
    if (rocketName) {
      return isValid.rocketName;
    }
  });
};

// Get a flight data by its id from the store
export const selectFlightDetails = (id: string) => (state: RootState) =>
  state.flights.data?.find((flight) => flight.flight_number === Number(id));

// get filter states from the store
export const selectFilterStates = (state: RootState) => state.flights.filters;

export default flightSlice.reducer;

// Export a thunk action creator to fetch data from the API
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
