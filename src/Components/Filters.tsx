import React, { ChangeEvent } from "react";
import { Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useAppDispatch } from "Redux/store";
import {
  setFilterLaunchStatus,
  setFilterLaunchTime,
  setFilterRocketName,
  setFilterTags,
} from "Redux/slices/flightSlice";

const Filters = () => {
  const dispatch = useAppDispatch();

  const handleFilterRocketName = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterRocketName(event.currentTarget.value));
  };

  const handleFilterLaunchTime = (time: string) => {
    const date = new Date();
    switch (time) {
      case "lastWeek":
        dispatch(
          setFilterLaunchTime(
            Math.round(date.setDate(date.getDate() - 7) / 1000)
          )
        );
        break;
      case "lastMonth":
        dispatch(
          setFilterLaunchTime(
            Math.round(date.setMonth(date.getMonth() - 1) / 1000)
          )
        );
        break;
      case "lastYear":
        dispatch(
          setFilterLaunchTime(
            Math.round(date.setFullYear(date.getFullYear() - 1) / 1000)
          )
        );
        break;
      case "lastTwoYears":
        dispatch(
          setFilterLaunchTime(
            Math.round(date.setFullYear(date.getFullYear() - 2) / 1000)
          )
        );
        break;
      default:
        dispatch(setFilterLaunchTime(null));
        break;
    }
  };

  const handleFilterLaunchStatus = (status: string) => {
    if (status !== "all") {
      dispatch(setFilterLaunchStatus(status));
    } else {
      dispatch(setFilterLaunchStatus(null));
    }
  };

  const handleFilterTags = (tags: string) => {
    if (tags !== "all") {
      dispatch(setFilterTags(tags));
    } else {
      dispatch(setFilterTags(null));
    }
  };

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={2.5}
        sx={{
          mb: { md: 5 },
        }}
      >
        <Typography variant="subtitle1">Launch Time:</Typography>
        <Select
          onChange={(e) => handleFilterLaunchTime(e.target.value as string)}
          size="small"
          defaultValue="all"
          sx={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "200px",
            height: "35px",
          }}
        >
          <MenuItem value="all">All Time</MenuItem>
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
          defaultValue="all"
          onChange={(e) => handleFilterLaunchStatus(e.target.value as string)}
          sx={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "200px",
            height: "35px",
          }}
        >
          <MenuItem value="all">All Status</MenuItem>
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
          defaultValue="all"
          onChange={(e) => handleFilterTags(e.target.value as string)}
          sx={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "200px",
            height: "35px",
          }}
        >
          <MenuItem value="all">All Tags</MenuItem>
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
          onChange={handleFilterRocketName}
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
