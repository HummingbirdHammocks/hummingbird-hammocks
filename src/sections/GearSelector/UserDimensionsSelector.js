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

export function UserDimensionsSelector({ selectedHeight, saveHeight, selectedWeight, saveWeight }) {
    const heights = [
        {
            name: 'Less than 5\' tall',
            id: 'less-than-5',
            description: 'General use gear is designed to be used in a variety of conditions and environments. It is typically heavier and less expensive than gear designed for specific activities.',
            backgroundImage: DoubleHammockBackground,
        },
        {
            name: '5\' to 6\' tall',
            id: '5-to-6',
            description: 'General use gear is designed to be used in a variety of conditions and environments. It is typically heavier and less expensive than gear designed for specific activities.',
            backgroundImage: DoubleHammockBackground,
        },
        {
            name: 'Greater than 6\' tall',
            id: 'greater-than-6',
            description: 'General use gear is designed to be used in a variety of conditions and environments. It is typically heavier and less expensive than gear designed for specific activities.',
            backgroundImage: DoubleHammockBackground,
        },
    ];

    const weights = [
        {
            name: 'Less than 150 lbs',
            id: 'less-than-150',
            description: 'General use gear is designed to be used in a variety of conditions and environments. It is typically heavier and less expensive than gear designed for specific activities.',
            backgroundImage: DoubleHammockBackground,
        },
        {
            name: '150 lbs to 200 lbs',
            id: '150-to-200',
            description: 'General use gear is designed to be used in a variety of conditions and environments. It is typically heavier and less expensive than gear designed for specific activities.',
            backgroundImage: DoubleHammockBackground,
        },
        {
            name: 'Greater than 200 lbs',
            id: 'greater-than-200',
            description: 'General use gear is designed to be used in a variety of conditions and environments. It is typically heavier and less expensive than gear designed for specific activities.',
            backgroundImage: DoubleHammockBackground,
        },
    ];

    return (
        <Box>
            <Box>
                <Typography variant={"h5"} sx={{ marginBottom: 3 }}>
                    Height
                </Typography>
                <Typography sx={{ marginBottom: 3 }}>
                    This is used to help us determine the appropriate length of your hammock for the most comfortable experience possible during your expected activity/use.
                </Typography>
                <Grid container spacing={2}>
                    {heights.map((height) => (
                        <Grid item key={height.id} xs={12} sm={6} md={4} lg={3}>
                            <Card
                                elevation={selectedHeight === height.id ? 4 : 2}
                                sx={{
                                    border: selectedHeight === height.id ? '2px solid #000' : 'none',
                                }}
                            >
                                <CardActionArea onClick={() => saveHeight(height.id)}>
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        image={DoubleHammockBackground}
                                        title={height.name}
                                    />
                                </CardActionArea>
                                <CardContent>
                                    <Typography>
                                        {height.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box sx={{ marginBottom: 3, marginTop: 3 }} >
                <Typography variant={"h5"} sx={{ marginBottom: 3 }}>
                    Weight
                </Typography>
                <Typography sx={{ marginBottom: 3 }}>
                    This is used to help us determine the appropriate weight capacity of your hammock to ensure reliabilty and safety.
                </Typography>
                <Grid container spacing={2}>
                    {weights.map((weight) => (
                        <Grid item key={weight.id} xs={12} sm={6} md={4} lg={3}>
                            <Card
                                elevation={selectedWeight === weight.id ? 4 : 2}
                                sx={{
                                    border: selectedWeight === weight.id ? '2px solid #000' : 'none',
                                }}
                            >
                                <CardActionArea onClick={() => saveWeight(weight.id)}>
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        image={DoubleHammockBackground}
                                        title={weight.name}
                                    />
                                </CardActionArea>
                                <CardContent>
                                    <Typography>
                                        {weight.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box >
    );
}