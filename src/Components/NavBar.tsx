import React from "react";
import {
  AppBar,
  Button,
  Fab,
  Toolbar,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import { useAppDispatch } from "Redux/store";
import { switchThemeMode } from "Redux/slices/themeModeSlice";
import NavigationIcon from "@mui/icons-material/Navigation";
import { Link } from "react-router-dom";

const NavBar = () => {
  const trigger = useScrollTrigger();
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <React.Fragment>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar
          component="nav"
          sx={{
            boxShadow: "none",
            backgroundImage: "none",
          }}
        >
          <Toolbar
            sx={{
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" component={Link} to="/">
              SpaceX
            </Typography>
            <Button
              variant="contained"
              onClick={() => dispatch(switchThemeMode())}
            >
              Switch Mode
            </Button>
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar id="back-to-top-anchor" />
      <Zoom in={trigger}>
        <Tooltip
          onClick={handleClick}
          role="presentation"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          title="Scroll to Top"
          arrow
          placement="left"
        >
          <Fab color="secondary" size="small">
            <NavigationIcon />
          </Fab>
        </Tooltip>
      </Zoom>
    </React.Fragment>
  );
};

export default NavBar;
