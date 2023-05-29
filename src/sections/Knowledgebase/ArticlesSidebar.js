import React, { useState } from "react"
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Collapse,
    Stack,
    Grid,
    Divider,
    Button,
    useMediaQuery,
} from "@mui/material"
import { ExpandLess, ExpandMore } from "@mui/icons-material"

import { Link } from "components"
import KnowledgebaseComboSearch from "utils/algolia/knowledgebaseComboSearch"

export const ArticlesSidebar = ({ recentArticles, type }) => {
    const [collapseRecentlyViewed, setCollapseRecentlyViewed] = useState(true)
    const [collapseMoreArticles, setCollapseMoreArticles] = useState(true)

    const matches = useMediaQuery(theme => theme.breakpoints.up("lg"))

    return (
        <Box
            sx={{
                marginLeft: 2,
                marginRight: 2,
            }}
        >
            {!matches && (
                <Divider sx={{ marginBottom: 2 }} />
            )}
            <Grid
                container
                spacing={2}
                sx={{
                    borderLeft: { xs: "0", lg: "1px solid #cccc" },
                }}>
                <Grid item xs={12} md={4} lg={12}
                    sx={{
                        padding: 2
                    }}>
                    <Stack
                        spacing={2}
                    >
                        <Box className="articles">
                            <KnowledgebaseComboSearch />
                        </Box>
                        <Button
                            disabled={type === "manuals"}
                            variant="outlined"
                            component={Link}
                            to={`/knowledgebase/manuals`}
                        >
                            MANUALS & GUIDES
                        </Button>
                        <Button
                            disabled={type === "articles"}
                            variant="outlined"
                            component={Link}
                            to={`/knowledgebase/articles`}
                        >
                            FAQs & ARTICLES
                        </Button>

                        <Divider />

                        <Button
                            variant="outlined"
                            component={Link}
                            to={`/account/create-ticket`}
                        >
                            Create Ticket
                        </Button>
                        <Button
                            variant="outlined"
                            component={Link}
                            to={`/account/tickets`}
                        >
                            Your Tickets
                        </Button>
                    </Stack>


                </Grid>

                <Grid
                    item xs={12} md={8} lg={12}
                    sx={{
                        borderLeft: { xs: "1px solid #cccc", lg: "0" },
                        padding: 2
                    }}
                >
                    {matches && (
                        <Divider />
                    )}
                    <Box>
                        <ListItemButton onClick={() => setCollapseRecentlyViewed(!collapseRecentlyViewed)}>
                            <ListItemText
                                secondaryTypographyProps={{
                                    fontSize: 20,
                                    letterSpacing: 1.2,
                                    fontWeight: 400,
                                    textTransform: "uppercase",
                                    color: "#000",
                                }}
                                secondary="RECENTLY VIEWED"
                            />
                            {collapseRecentlyViewed ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                    </Box>
                    <Collapse in={collapseRecentlyViewed} timeout="auto" unmountOnExit>
                        <List>
                            {recentArticles.nodes.map(article => (
                                <ListItem m="20px" key={article.id}>
                                    <Link to={`/knowledgebase/articles/${article.handle}`}>
                                        <Typography>{article.title}</Typography>
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>

                    <Divider />

                    <Box>
                        <ListItemButton onClick={() => setCollapseMoreArticles(!collapseMoreArticles)}>
                            <ListItemText
                                secondaryTypographyProps={{
                                    fontSize: 20,
                                    letterSpacing: 1.2,
                                    fontWeight: 400,
                                    textTransform: "uppercase",
                                    color: "#000",
                                }}
                                secondary="MORE ARTICLES"
                            />
                            {collapseMoreArticles ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                    </Box>
                    <Collapse in={collapseMoreArticles} timeout="auto" unmountOnExit>
                        <List>
                            {recentArticles.nodes.map(article => (
                                <ListItem m="20px" key={article.id}>
                                    <Link to={`/knowledgebase/articles/${article.handle}`}>
                                        <Typography>{article.title}</Typography>
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </Grid>
            </Grid>
        </Box>
    )
}
