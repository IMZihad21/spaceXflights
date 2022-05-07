import React from "react";
import { Box, Container } from "@mui/material";
import NavBar from "Components/NavBar";
import Footer from "Components/Footer";

function App() {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <NavBar />
      <Container
        sx={{
          flexGrow: 1,
        }}
      >
        {" "}
      </Container>
      <Footer />
    </Box>
  );
}

export default App;
