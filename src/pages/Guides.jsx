import { Box, Toolbar } from "@mui/material";
import ListsGuides from "../components/guides/ListsGuides";
import { useSelector } from "react-redux";
import FormGuide from "../components/guides/FormGuide";



export const Guides = () => {

    const { drawerWidth } = useSelector((state) => state.menu);

    return (
        <>
            <Box>
                <Toolbar />
                <FormGuide />
                <ListsGuides />
            </Box>
        </>
    );
}

export default Guides;