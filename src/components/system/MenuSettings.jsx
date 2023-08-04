import { IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router";

const options = [{ id: 2, name: "Cerrar sesion", url: "/login" }];

export const MenuSettings = () => {
  const [anchor, setAnchor] = useState(null);
  const navigate = useNavigate();
  const handleOpen = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleLogout = () => {
    console.log("LOGIN???");
    navigate("/login");
    window.localStorage.removeItem("TOKEN");
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Configuraciones">
        <IconButton onClick={handleOpen} sx={{ p: 0 }}>
          <Avatar alt="UserApp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchor}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchor)}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItem key={option.id} onClick={handleClose}>
            <Typography textAlign="center" onClick={() => handleLogout()}>
              {" "}
              {option.name}{" "}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default MenuSettings;
