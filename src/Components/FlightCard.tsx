import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  CardActions,
  Link,
  Divider,
} from "@mui/material";
import { FlightType } from "Interfaces/FlightType";
import { Link as RouterLink } from "react-router-dom";

interface FlightCardProps {
  flight: FlightType;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  return (
    <Card
      raised
      sx={{
        width: 1,
        height: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Box>
          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">{flight.mission_name}</Typography>
            {flight.upcoming && (
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
          </Box>
          <Typography
            gutterBottom
            variant="subtitle1"
            color="textSecondary"
            component="div"
            fontWeight="bold"
          >
            {flight.rocket.rocket_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {flight.details
              ? flight.details?.length > 80
                ? flight.details.substring(0, 80) + " ..."
                : flight.details
              : "No details available"}
          </Typography>
        </Box>
        <Box
          component="img"
          src={flight.links?.mission_patch_small}
          sx={{
            height: "100%",
            width: "120px",
          }}
        />
      </CardContent>
      <Divider />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Launch date:
          </Typography>
          <Typography variant="body2">
            {new Date(flight.launch_date_utc).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              timeZone: "Asia/Dhaka",
            })}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Launch status:
          </Typography>
          <Typography variant="body2">
            {flight.launch_success === null
              ? "Unknown"
              : flight.launch_success
              ? "Success"
              : "Failed"}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Launch site:
          </Typography>
          <Typography variant="body2">
            {flight.launch_site?.site_name || "Unknown"}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Rocket Type:
          </Typography>
          <Typography variant="body2">{flight.rocket.rocket_type}</Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ gap: "5px" }}>
        <Button
          component={Link}
          size="small"
          target="_blank"
          href={`https://twitter.com/intent/tweet?text=${flight.mission_name}&url=${flight.links?.article_link}`}
        >
          Share
        </Button>
        <Button
          component={Link}
          size="small"
          target="_blank"
          href={flight.links?.article_link}
        >
          Read Article
        </Button>
        <Button
          component={RouterLink}
          size="small"
          to={`/flight/${flight.flight_number}`}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default FlightCard;
