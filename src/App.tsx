import React from "react";
import { Box, Container } from "@mui/material";
import { useRoutes } from "react-router-dom";
import NavBar from "Components/NavBar";
import Footer from "Components/Footer";
import Home from "Pages/Home";

interface RoutesType {
  path: string;
  element: React.ReactNode;
  children?: RoutesType[];
}

function App() {
  const routes: Array<RoutesType> = [
    {
      path: "/",
      element: <Home />,
    },
  ];

  const allRoutes = useRoutes(routes);

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
        {allRoutes}
      </Container>
      <Footer />
    </Box>
  );
}

export default App;
