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

export function RecommendedGear({ activity, climate, weight, height }) {

    return (
        <Box>
            <Typography sx={{ marginBottom: 3 }}>
                The following gear should work well for your activity, climate, and user dimensions. Your recommendations will follow you through the rest of the site, look for the "Good Fit" tag on gear pages.
            </Typography>
            {/* <Grid container spacing={2}>
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
            </Grid> */}
        </Box >
    );
}