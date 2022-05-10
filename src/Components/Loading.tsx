import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        mx: { md: 30 },
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontSize: "1.2rem",
          fontWeight: "600",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        Please wait while we fetch the latest SpaceX flights.
      </Typography>
      <LinearProgress color="warning" />
    </Box>
  );
};

export default Loading;
