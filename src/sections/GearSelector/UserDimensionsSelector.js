import React from 'react';
import {
    Box,
    Grid,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';

import DoubleHammockBackground from "../../assets/images/product-backgrounds/DoubleHammockBackground.jpg"

export function UserDimensionsSelector({ selectedActivity, saveActivity }) {
    const activities = [
        {
            name: 'General Use',
            id: 'general-use',
            description: 'General use gear is designed to be used in a variety of conditions and environments. It is typically heavier and less expensive than gear designed for specific activities.',
            backgroundImage: DoubleHammockBackground,
        },
        {
            name: 'Hiking',
            id: 'hiking',
            description: 'General use gear is designed to be used in a variety of conditions and environments. It is typically heavier and less expensive than gear designed for specific activities.',
            backgroundImage: DoubleHammockBackground,
        },
        {
            name: 'Overnight Camping',
            id: 'overnight-camping',
            description: 'General use gear is designed to be used in a variety of conditions and environments. It is typically heavier and less expensive than gear designed for specific activities.',
            backgroundImage: DoubleHammockBackground,
        },
        {
            name: 'Multiple Night Camping',
            id: 'multiple-night-camping',
            description: 'General use gear is designed to be used in a variety of conditions and environments. It is typically heavier and less expensive than gear designed for specific activities.',
            backgroundImage: DoubleHammockBackground,
        },
        {
            name: 'Backpacking',
            id: 'backpacking',
            description: 'General use gear is designed to be used in a variety of conditions and environments. It is typically heavier and less expensive than gear designed for specific activities.',
            backgroundImage: DoubleHammockBackground,
        },
        {
            name: 'Weight Critical',
            id: 'weight-critical',
            description: 'General use gear is designed to be used in a variety of conditions and environments. It is typically heavier and less expensive than gear designed for specific activities.',
            backgroundImage: DoubleHammockBackground,
        },
        {
            name: 'Military Deployment',
            id: 'military-deployment',
            description: 'General use gear is designed to be used in a variety of conditions and environments. It is typically heavier and less expensive than gear designed for specific activities.',
            backgroundImage: DoubleHammockBackground,
        },
        {
            name: 'Other',
            id: 'other',
            description: 'General use gear is designed to be used in a variety of conditions and environments. It is typically heavier and less expensive than gear designed for specific activities.',
            backgroundImage: DoubleHammockBackground,
        },
    ];

    return (
        <Box>
            <Typography sx={{ marginBottom: 3 }}>
                What will you be using this gear for primarily?
            </Typography>
            <Grid container spacing={2}>
                {activities.map((activity, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <Card
                            elevation={selectedActivity === activity.id ? 4 : 2}
                            sx={{
                                border: selectedActivity === activity.id ? '2px solid #000' : 'none',
                            }}
                        >
                            <CardActionArea onClick={() => saveActivity(activity.id)}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image={DoubleHammockBackground}
                                    title={activity.name}
                                />
                            </CardActionArea>
                            <CardContent>
                                <Typography>
                                    {activity.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box >
    );
}