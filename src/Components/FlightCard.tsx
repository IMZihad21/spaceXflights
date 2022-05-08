import * as React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import { FlightType } from 'Interfaces/FlightType';

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
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
            />
            <CardContent sx={{
                flexGrow: 1,
            }}>
                <Typography gutterBottom variant="h5" component="div">
                    {flight.mission_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {
                        flight.details ?
                            flight.details?.length > 100 ?
                                flight.details.substring(0, 90) + ' ...' :
                                flight.details : 'No details available'
                    }
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default FlightCard;
