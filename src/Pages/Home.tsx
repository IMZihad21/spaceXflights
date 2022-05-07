import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useAppSelector } from "Redux/store";
import { selectFlights } from "Redux/slices/flightSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const { loading, data } = useAppSelector(selectFlights);

  return (
    <Box>
      <Typography variant="h1">This is home</Typography>
      {
        loading ?
          <Typography variant="subtitle1">Loading...</Typography> :
          data?.map((flight, idx) => (
            <Button
              component={Link}
              variant="outlined"
              key={idx}
              to={`/details/${flight.flight_number}`}
            >
              {flight.mission_name}
            </Button>
          ))
      }
    </Box>
  );
};

export default Home;
