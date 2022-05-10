import React, { Fragment } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useAppSelector } from "Redux/store";
import { selectFlights, selectLoadingState } from "Redux/slices/flightSlice";
import FlightCard from "Components/FlightCard";
import Filters from "Components/Filters";
import { FlightType } from "Interfaces/FlightType";
import Loading from "Components/Loading";

const Home = () => {
  const loading = useAppSelector(selectLoadingState);
  const flightData = useAppSelector(selectFlights);

  return (
    <Box>
      <Box
        sx={{
          marginTop: "1rem",
          marginBottom: "3rem",
        }}
      >
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
          variant="body2"
          sx={{
            fontSize: "1.2rem",
          }}
        >
          We are not affiliated, associated, authorized, endorsed by, or in any
          way officially connected with Space Exploration Technologies Corp
          (SpaceX), or any of its subsidiaries or its affiliates. The names
          SpaceX as well as related names, marks, emblems and images are
          registered trademarks of their respective owners.
        </Typography>
      </Box>

      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          {/* Add filter component */}
          <Filters />
          <Grid container spacing={3}>
            {flightData?.map((flight: FlightType, idx: number) => (
              <Grid item key={idx} xs={12} md={4}>
                <FlightCard flight={flight} />
              </Grid>
            ))}
          </Grid>
        </Fragment>
      )}
    </Box>
  );
};

export default Home;
