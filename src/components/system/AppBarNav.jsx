import { AppBar, Box, Container, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import MenuSettings from './MenuSettings';

import { useSelector, useDispatch } from 'react-redux';
import { setOpenMobile } from '../../features/system/menuSlice';

export const AppBarNav = () => {

    const dispatch = useDispatch();

    const drawerWidth = useSelector((state) => state.menu.drawerWidth);

    const handleDrawerToogle = () => {
        dispatch(setOpenMobile());
    }

    return(
        <AppBar
                position = 'fixed'
                sx = {{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` }
                }} >
                    <Container maxWidth = 'xl' >
                        <Toolbar disableGutters >
                            <IconButton
                                color = 'inherit'
                                aria-label = 'open-drawer'
                                edge = 'start'
                                onClick={ handleDrawerToogle }
                                sx= {{
                                    mr: 2, display: { sm: 'none' }
                                }} >
                                    <MenuIcon />
                            </IconButton>
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }} >
                                <ConnectingAirportsIcon sx = {{ mr: 1 }} />
                                <Typography 
                                    variant= 'h5' 
                                    noWrap 
                                    component = 'div'
                                    sx = {{
                                        mr: 2,
                                        display: { xs: 'flex' },
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'inherit',
                                        textDecoration: 'none'
                                    }}
                                    >
                                    Columbus travel
                                </Typography>
                            </Box>
                            <MenuSettings />
                        </Toolbar>
                    </Container>
            </AppBar>
    );
}

export default AppBarNav;