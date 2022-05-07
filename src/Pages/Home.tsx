import React from "react";
import { Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "Redux/store";
import { selectFlights, thunkFetchFlights } from "Redux/slices/flightSlice";

const Home = () => {
  const flights = useAppSelector(selectFlights);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(thunkFetchFlights());
  }, [dispatch]);

  return (
    <Box>
      <Typography variant="h1">This is home</Typography>
      <Typography variant="subtitle1">{JSON.stringify(flights)}</Typography>
    </Box>
  );
};

export default Home;
