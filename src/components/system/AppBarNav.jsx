import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import MenuSettings from "./MenuSettings";

import { useSelector, useDispatch } from "react-redux";
import { setOpenMobile } from "../../features/system/menuSlice";
import { useEffect, useState } from "react";

export const AppBarNav = () => {
  const dispatch = useDispatch();

  const drawerWidth = useSelector((state) => state.menu.drawerWidth);
  const [tournament, setTournament] = useState(null);
  const handleDrawerToogle = () => {
    dispatch(setOpenMobile());
  };

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:9898/api/tournament", requestOptions)
      .then((res) => res.json())
      .then((data) => setTournament(data));
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            aria-label="open-drawer"
            edge="start"
            onClick={handleDrawerToogle}
            sx={{
              mr: 2,
              display: { sm: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
            <GroupWorkIcon sx={{ mr: 3, fontSize: 40 }} />
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {tournament?.tournamentName
                ? `Liga Social - ${tournament.tournamentName} - Dedicado a: ${tournament.dedicateTo}`
                : "Liga Social"}
            </Typography>
          </Box>
          <MenuSettings />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppBarNav;
