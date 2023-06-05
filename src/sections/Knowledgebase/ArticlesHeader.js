import React from "react"
import {
    Box,
    Typography,
    Divider,
    Stack,
    Button,
} from "@mui/material"
import { ArrowBack } from "@mui/icons-material"

import { Seo, MainWrapper, Link } from "components"
import { fShopify } from 'utils/formatTime'

export const ArticlesHeader = ({ title, backpath, date }) => {

    return (
        <Box>
            <Seo title={title} />
            <Box pt={"10px"}>
                <MainWrapper>
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                        sx={{ margin: "20px 10px" }}
                    >
                        <Stack>
                            <Typography
                                variant="h4"
                                textTransform={"uppercase"}
                            >
                                {title}
                            </Typography>
                            {date && (
                                <Typography variant="collectionName">{fShopify(date)}</Typography>
                            )}
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            spacing={2}
                        >
                            <Button
                                variant="contained"
                                component={Link}
                                to={backpath}
                                startIcon={<ArrowBack />}
                            >
                                BACK
                            </Button>
                        </Stack>
                    </Stack>
                    <Divider color="#e2dfd9" />
                </MainWrapper>
            </Box>
        </Box>
    )
}