import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        SPACEX © 2022
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        Developed by @IMZihad21
      </Typography>
    </Box>
  );
};

export default Footer;
