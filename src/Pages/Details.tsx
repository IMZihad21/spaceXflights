import React from "react";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "Redux/store";
import { selectFlightDetails } from "Redux/slices/flightSlice";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const flightInfo = useAppSelector(selectFlightDetails(id!));
  return <Box>
    <Typography variant="h1">This is details</Typography>
    <Typography variant="subtitle1">
      {JSON.stringify(flightInfo)}
    </Typography>
  </Box>;
};

export default Details;
