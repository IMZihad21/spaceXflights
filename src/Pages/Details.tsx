import React from "react";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "Redux/store";
import { selectFlightDetails } from "Redux/slices/flightSlice";
import { useParams } from "react-router-dom";
import Loading from "Components/Loading";

const Details = () => {
  const { id } = useParams();
  const flightInfo = useAppSelector(selectFlightDetails(id || ""));
  return !flightInfo ? (
    <Loading />
  ) : (
    <Box>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{ display: { md: "flex" }, alignItems: "center" }}
      >
        {flightInfo.flight_number} - {flightInfo.mission_name}
        <Typography
          component="span"
          sx={{
            fontSize: "1.75rem",
            fontWeight: "400",
            mx: "1rem",
            px: "5px",
            borderRadius: "5px",
            bgcolor: flightInfo.launch_success
              ? "#64c364"
              : flightInfo.launch_success === false
              ? "#ed6060"
              : "#707070",
          }}
        >
          {flightInfo.launch_success === true
            ? "Successful"
            : flightInfo.launch_success === null
            ? "Unknown"
            : "Failed"}
        </Typography>
        {flightInfo.upcoming && (
          <Typography
            variant="body2"
            component="span"
            sx={{
              bgcolor: "#707070",
              color: "#fff",
              padding: "3px",
              mx: "5px",
              borderRadius: "5px",
            }}
          >
            Upcoming
          </Typography>
        )}
      </Typography>
      {flightInfo.links.video_link && (
        <Box
          component="iframe"
          src={flightInfo.links.video_link?.replace("watch?v=", "embed/")}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title={flightInfo.mission_name}
          sx={{
            width: { xs: "95%", md: "100%" },
            height: { xs: "200px", md: "350px" },
            my: { xs: "1rem", md: "2rem" },
          }}
        />
      )}
      <Typography variant="h5" component="h2" gutterBottom>
        Flight Details
      </Typography>
      <Typography variant="body1" gutterBottom>
        {flightInfo.details}
      </Typography>
      <Typography variant="body1" gutterBottom>
        This mission was launched on{" "}
        {new Date(flightInfo.launch_date_utc).toLocaleString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          timeZone: "Asia/Dhaka",
        })}
        . It was launched from{" "}
        {flightInfo.launch_site && flightInfo.launch_site.site_name_long}
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Rocket Details
      </Typography>
      <Typography variant="body1" gutterBottom>
        Rocket name is {flightInfo.rocket.rocket_name} and type is{" "}
        {flightInfo.rocket.rocket_type}
      </Typography>
      <Typography variant="h6" component="h2" gutterBottom>
        Payload Details
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignItems: "center",
          my: "1rem",
          gap: "1rem",
        }}
      >
        {flightInfo.rocket.second_stage.payloads?.map((payload) => (
          <Box
            key={payload.payload_id}
            sx={{
              bgcolor: "#7d7d7d",
              color: "#fff",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <Typography variant="body1" gutterBottom>
              <Typography component="span" variant="body2">
                Payload ID:{" "}
              </Typography>
              {payload.payload_id}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <Typography component="span" variant="body2">
                Payload Type:{" "}
              </Typography>
              {payload.payload_type}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <Typography component="span" variant="body2">
                Payload Mass in KG:{" "}
              </Typography>
              {payload.payload_mass_kg} kg
            </Typography>
            <Typography variant="body1" gutterBottom>
              <Typography component="span" variant="body2">
                Payload Mass in LBS:{" "}
              </Typography>
              {payload.payload_mass_lbs} lbs
            </Typography>
            <Typography variant="body1" gutterBottom>
              <Typography component="span" variant="body2">
                Payload Orbit:{" "}
              </Typography>
              {payload.orbit}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <Typography component="span" variant="body2">
                Payload Customer:{" "}
              </Typography>
              {payload.customers}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <Typography component="span" variant="body2">
                Payload Nationality:{" "}
              </Typography>
              {payload.nationality}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Details;
