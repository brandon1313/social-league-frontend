import { Typography, Hidden } from "@mui/material";

export const HiddenComponent = (props) => {
    return (
        <>
            <Typography>
                Ancho: { props.width }
            </Typography>
        </>
    );
}

export default HiddenComponent;