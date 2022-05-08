import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useAppSelector } from "Redux/store";
import { selectFlights } from "Redux/slices/flightSlice";
import FlightCard from 'Components/FlightCard';

const Home = () => {
  const { loading, data } = useAppSelector(selectFlights);

  return (
    <Box>
      <Box sx={{
        marginTop: "1rem",
        marginBottom: "3rem",
      }}>
        <Typography
          component="h1"
          variant="body1"
          sx={{
            fontSize: "2rem",
          }}
        >
          Space X Flights 🚀
        </Typography>
        <Typography
          variant='body2'
          sx={{
            fontSize: "1.2rem",
          }}
        >
          We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with Space Exploration Technologies Corp (SpaceX), or any of its subsidiaries or its affiliates. The names SpaceX as well as related names, marks, emblems and images are registered trademarks of their respective owners.
        </Typography>
      </Box>
      {
        loading ?
          <Typography variant="subtitle1">Loading...</Typography> :
          <Grid container spacing={3} >
            {
              data?.map((flight, idx) => (
                <Grid item key={idx} xs={12} md={4}>
                  <FlightCard flight={flight} />
                </Grid>
              ))
            }
          </Grid>
      }
    </Box>
  );
};

export default Home;
