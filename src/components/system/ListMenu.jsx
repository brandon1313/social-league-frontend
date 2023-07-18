import { useState } from "react";
import { List, ListItemText, ListItemButton, ListItemIcon, Collapse, Divider, Toolbar } from "@mui/material";

import SettingsIcon from '@mui/icons-material/Settings';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import LanguageIcon from '@mui/icons-material/Language';
import InventoryIcon from '@mui/icons-material/Inventory';
import SourceIcon from '@mui/icons-material/Source';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { useNavigate } from "react-router-dom";


export const ListMenu = () => {

    const [ openSettings, setOpenSettings ] = useState(false);
    const [ openSales, setOpenSales ] = useState(false);

    const navigate = useNavigate();

    const handleSettingsClick = () => {
        setOpenSettings(!openSettings);
    }

    const handleSalesClick = () => {
        setOpenSales(!openSales);
    }

    return(
        <>
            <Toolbar />
            <Divider />
            <List>

                    <ListItemButton>
                        <ListItemIcon >
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary = 'Tablero' />
                    </ListItemButton>

                    <Divider />

                    <ListItemButton onClick = { handleSettingsClick } >
                        <ListItemIcon >
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary = 'Configuraciones' />
                        { openSettings ? <ExpandLess /> : <ExpandMore /> }
                    </ListItemButton>
                    <Collapse in = { openSettings } timeout = 'auto' unmountOnExit >
                        <List component = 'div' disablePadding >
                            <ListItemButton sx={{ pl: 4}} onClick={ () => navigate('/guides')} >
                                <ListItemIcon >
                                    <SettingsAccessibilityIcon />
                                </ListItemIcon>
                                <ListItemText primary = 'Guias' />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4}} onClick={ () => navigate('/languages')} >
                                <ListItemIcon  >
                                    <LanguageIcon />
                                </ListItemIcon>
                                <ListItemText primary = 'Lenguajes' />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <Divider />

                    <ListItemButton onClick = { handleSalesClick } >
                        <ListItemIcon >
                            <LoyaltyIcon />
                        </ListItemIcon>
                        <ListItemText primary = 'Ventas' />
                        { openSales ? <ExpandLess /> : <ExpandMore /> }
                    </ListItemButton>
                    <Collapse in = { openSales } timeout = 'auto' unmountOnExit >
                        <List component = 'div' disablePadding >
                            <ListItemButton sx={{ pl: 4}} >
                                <ListItemIcon>
                                    <InventoryIcon />
                                </ListItemIcon>
                                <ListItemText primary = 'Productos' />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4}} >
                                <ListItemIcon>
                                    <SourceIcon />
                                </ListItemIcon>
                                <ListItemText primary = 'Fuentes' />
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4}} >
                                <ListItemIcon>
                                    <PointOfSaleIcon />
                                </ListItemIcon>
                                <ListItemText primary = 'Nueva venta' />
                            </ListItemButton>
                        </List>
                    </Collapse>
            </List>
        </>
    )
};

export default ListMenu;