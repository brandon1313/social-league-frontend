import { Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AppBarNav from "./AppBarNav";
import AppMenuNav from "./AppMenuNav";
import './HomePage.css'
import { Outlet } from "react-router";

const HomePage = () => {
    return (
        <>
            <Box sx={{ width: '100%' }} >
                <AppBarNav />
                <AppMenuNav />
                <Toolbar />
                <div className="Layout">
                    <Outlet />
                </div>
            </Box>
        </>
    )
}

export default HomePage;