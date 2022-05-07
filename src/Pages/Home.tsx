import React from "react";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "Redux/store";
import { selectFlights } from "Redux/slices/flightSlice";

const Home = () => {
  const { loading, data } = useAppSelector(selectFlights);

  return (
    <Box>
      <Typography variant="h1">This is home</Typography>
      <Typography variant="subtitle1">
        {!loading &&
          data?.length &&
          JSON.stringify(data![ 0 ])}
      </Typography>
    </Box>
  );
};

export default Home;
