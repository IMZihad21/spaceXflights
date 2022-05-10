import React from "react";
import { Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "Redux/store";
import {
  selectFilterStates,
  setFilterLaunchStatus,
  setFilterLaunchTime,
  setFilterRocketName,
  setFilterTags,
} from "Redux/slices/flightSlice";

const Filters = () => {
  const dispatch = useAppDispatch();
  const { launchStatus, launchTime, launchTags, rocketName } =
    useAppSelector(selectFilterStates);

  return (
    <Grid
      container
      sx={{
        mb: 5,
      }}
    >
      <Grid item xs={12} md={2.5}>
        <Typography variant="subtitle1">Launch Time:</Typography>
        <Select
          onChange={(e) =>
            dispatch(setFilterLaunchTime(e.target.value as string))
          }
          size="small"
          value={launchTime}
          sx={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "200px",
            height: "35px",
          }}
        >
          <MenuItem value="" sx={{ fontWeight: 200 }}>
            Clear Filter
          </MenuItem>
          <MenuItem value="lastWeek">Last Week</MenuItem>
          <MenuItem value="lastMonth">Last Month</MenuItem>
          <MenuItem value="lastYear">Last Year</MenuItem>
          <MenuItem value="lastTwoYears">Last Two Year</MenuItem>
        </Select>
      </Grid>
      <Grid
        item
        xs={12}
        md={2.5}
        sx={{
          mb: { md: 5 },
        }}
      >
        <Typography variant="subtitle1">Launch Status:</Typography>
        <Select
          size="small"
          value={launchStatus}
          onChange={(e) =>
            dispatch(setFilterLaunchStatus(e.target.value as string))
          }
          sx={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "200px",
            height: "35px",
          }}
        >
          <MenuItem value="" sx={{ fontWeight: 200 }}>
            Clear Filter
          </MenuItem>
          <MenuItem value="success">Success</MenuItem>
          <MenuItem value="failure">Failure</MenuItem>
        </Select>
      </Grid>
      <Grid
        item
        xs={12}
        md={2.5}
        sx={{
          mb: { md: 5 },
        }}
      >
        <Typography variant="subtitle1">Launch Tags:</Typography>
        <Select
          size="small"
          value={launchTags}
          onChange={(e) => dispatch(setFilterTags(e.target.value as string))}
          sx={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "200px",
            height: "35px",
          }}
        >
          <MenuItem value="" sx={{ fontWeight: 200 }}>
            Clear Filter
          </MenuItem>
          <MenuItem value="upcoming">Upcoming</MenuItem>
        </Select>
      </Grid>
      <Grid
        item
        xs={12}
        md={4.5}
        sx={{
          mb: { md: 5 },
        }}
      >
        <Typography variant="subtitle1">Search rocket name:</Typography>
        <TextField
          variant="outlined"
          size="small"
          value={rocketName}
          onChange={(event) =>
            dispatch(setFilterRocketName(event.currentTarget.value))
          }
          sx={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "100%",
            "& .MuiInputBase-root": {
              height: "35px",
              fontSize: "15px",
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Filters;
