import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Topbar from '../components/adminpanel/Topbar';
import Sidebar from '../components/adminpanel/Sidebar';
import { Outlet } from 'react-router-dom';


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

export default function AdminPanel() {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Topbar open={open} handleDrawerOpen={handleDrawerOpen}/>
            <Sidebar open={open} handleDrawerClose={handleDrawerClose}/>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Outlet id="drawer"/>
            </Box>
        </Box>
    );
}
