import { useSelector } from "react-redux";
import ListsLanguages from "../components/languages/ListsLanguages";
import FormLanguage from "../components/languages/FormLanguage";
import { Box, Toolbar } from "@mui/material";
import AppMenuNav from "../components/system/AppMenuNav";

export const Languages = () => {

    const { drawerWidth } = useSelector(state => state.menu);

    return (
        <>
            <Box>
                <Toolbar />
                <FormLanguage />
                <ListsLanguages />
            </Box>
        </>
    )
}

export default Languages;