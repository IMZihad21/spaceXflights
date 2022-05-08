import React from "react";
import { Box, Container } from "@mui/material";
import { Outlet, useRoutes } from "react-router-dom";
import { useAppDispatch } from "Redux/store";
import { thunkFetchFlights } from "Redux/slices/flightSlice";
import NavBar from "Components/NavBar";
import Footer from "Components/Footer";
import Home from "Pages/Home";
import Details from "Pages/Details";

interface RoutesType {
  path: string;
  element: React.ReactNode;
  children?: RoutesType[];
}

function App() {
  // Start fetching flights on mount
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(thunkFetchFlights());
  }, [ dispatch ]);

  // Define routes for the app
  const routes: Array<RoutesType> = [
    {
      path: "/",
      element: <Outlet />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "details/:id",
          element: <Details />,
        }
      ]
    },
  ];

  // Render the routes
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
        component="main"
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
