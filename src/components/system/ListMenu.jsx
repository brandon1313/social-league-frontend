import { useState } from "react";
import {
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Collapse,
  Divider,
  Toolbar,
} from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import LanguageIcon from "@mui/icons-material/Language";
import GroupsIcon from "@mui/icons-material/Groups";
import { useNavigate } from "react-router-dom";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
export const ListMenu = () => {
  const [openSettings, setOpenSettings] = useState(false);
  const [openSales, setOpenSales] = useState(false);

  const navigate = useNavigate();

  const handleSettingsClick = () => {
    setOpenSettings(!openSettings);
  };

  const handleSalesClick = () => {
    setOpenSales(!openSales);
  };

  return (
    <>
      <Toolbar />
      <Divider />
      <List>
        {/* <ListItemButton>
                        <ListItemIcon >
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary = 'Tablero' />
                    </ListItemButton>

                    <Divider /> */}

        <ListItemButton onClick={handleSettingsClick}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Mantenimiento" />
          {openSettings ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openSettings} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/users")}>
              <ListItemIcon>
                <SettingsAccessibilityIcon />
              </ListItemIcon>
              <ListItemText primary="Usuarios" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate("/category")}
            >
              <ListItemIcon>
                <LanguageIcon />
              </ListItemIcon>
              <ListItemText primary="Categorias" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/team")}>
              <ListItemIcon>
                <GroupsIcon />
              </ListItemIcon>
              <ListItemText primary="Equipo" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => navigate("/player")}>
              <ListItemIcon>
                <EmojiPeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Jugadores" />
            </ListItemButton>
          </List>
        </Collapse>

        <Divider />
        {/* 
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
                    </Collapse> */}
      </List>
    </>
  );
};

export default ListMenu;
