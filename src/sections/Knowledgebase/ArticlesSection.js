import React from "react"
import {
    Box,
    Typography,
    Grid,
} from "@mui/material"

import { KnowledgebaseItem } from "sections"

export const ArticlesSection = ({ group, type, backgroundColor, accentcolor }) => {

    if (!group || !group.nodes || group.nodes.length === 0 || !group.nodes[0].tags) return null

    return (
        <Box
            sx={{
                backgroundColor: backgroundColor ? backgroundColor : "#ECEFF1",
                borderColor: accentcolor ? accentcolor : 'divider',
                borderStyle: "solid",
                borderWidth: "1px",
                borderRadius: "20px",
                padding: 2,
                marginTop: 4,
                marginBottom: 4
            }}
        >
            <Grid
                container
                direction="row"
                alignItems="flex-start"
                spacing={2}
                padding={2}
            >
                <Grid item xs={12}>
                    <Typography variant="h4">
                        {group.nodes[0].tags}
                    </Typography>
                </Grid>
                {group.nodes.map(item => (
                    <Grid item xs={12} sm={6} md={6} lg={4} key={item.id}>
                        <KnowledgebaseItem description item={item} linkType={type} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}