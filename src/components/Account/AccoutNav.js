import * as React from 'react';
import {
    Paper,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider
} from '@mui/material';

import { AnotherLink, Link } from "components"


export default function AccountNav({ currentPage }) {
    return (
        <Paper>
            <Box sx={{ width: '100%', maxWidth: 360 }}>
                <nav aria-label="main mailbox folders">
                    <List>
                        <ListItem>
                            <ListItemButton
                                component={Link}
                                to="/account/orders"
                            >
                                <ListItemText primary="Orders" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton
                                component={Link}
                                to="/account/addresses"
                            >
                                <ListItemText primary="Addresses" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>
                <Divider />
                <nav aria-label="secondary mailbox folders">
                    <List>
                        <ListItem>
                            <ListItemButton
                                component={AnotherLink}
                                href="https://help.hummingbirdhammocks.com/help/1694808310/tickets"
                                target="_blank"
                            >
                                <ListItemText primary="Tickets" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton
                                component={AnotherLink}
                                href="https://returns.hummingbirdhammocks.com/"
                                target="_blank"
                            >
                                <ListItemText primary="Returns" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>
            </Box>
        </Paper>
    );
}
