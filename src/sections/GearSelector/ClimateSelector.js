import React from 'react';
import {
    Box,
    Grid,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography
} from '@mui/material';

import DoubleHammockBackground from "../../assets/images/product-backgrounds/DoubleHammockBackground.jpg"

export function ClimateSelector({ selectedClimate, saveClimate }) {
    const allClimates = [
        {
            name: 'Tropical',
            id: 'tropical',
            description: '0°–23.5°',
            backgroundImage: DoubleHammockBackground,
        },
        {
            name: 'Subtropics',
            id: 'subtropics',
            description: '23.5°–40°',
            backgroundImage: DoubleHammockBackground,
        },
        {
            name: 'Temperate',
            id: 'temperate',
            description: '40°–60°',
            backgroundImage: DoubleHammockBackground,
        },
        {
            name: 'Polar',
            id: 'polar',
            description: '60°–90°',
            backgroundImage: DoubleHammockBackground,
        },
    ];

    return (
        <Box>
            <Typography sx={{ marginBottom: 3 }}>
                In which climate do you expect to use this gear primarily?
            </Typography>
            <Grid container spacing={2}>
                {allClimates.map((climate, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <Card
                            elevation={selectedClimate === climate.id ? 4 : 2}
                            sx={{
                                border: selectedClimate === climate.id ? '2px solid #000' : 'none',
                            }}
                        >
                            <CardActionArea onClick={() => saveClimate(climate.id)}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image={DoubleHammockBackground}
                                    title={climate.name}
                                />
                            </CardActionArea>
                            <CardContent>
                                <Typography>
                                    {climate.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box >
    );
}