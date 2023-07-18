import { Box, Drawer } from "@mui/material";
import ListMenu from "./ListMenu";

import { useSelector, useDispatch } from 'react-redux';
import { setOpenMobile } from '../../features/system/menuSlice';

export const AppMenuNav = () => {

    const drawerWidth = useSelector((state) => state.menu.drawerWidth);
    const openMobile = useSelector((state) => state.menu.openMobile);
    const dispatch = useDispatch();

    const handleDrawerToogle = () => {
        dispatch(setOpenMobile());
    }

    return(
        <Box
            component = 'nav'
            sx = {{
                width : { sm: drawerWidth }, flexShrink: { sm: 0 }
            }} 
            aria-label = 'mailbox folders' >
                <Drawer
                    variant = 'temporary'
                    open = { openMobile }
                    onClose = { handleDrawerToogle }
                    ModalProps = {{
                        keepMounted: true
                    }}
                    sx = {{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                    }}>
                        <ListMenu />
                </Drawer>
                <Drawer
                    variant = 'permanent'
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }} 
                    anchor = 'left'
                    open >
                        <ListMenu />
                </Drawer>
        </Box>
    );
}

export default AppMenuNav;