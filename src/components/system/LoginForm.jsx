import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import { useNavigate } from "react-router";
import usePostRequestWithLoading from "../../features/usePostRequestWithLoading";
import useSnackbar from "../../features/useSnackbar";
import SnackbarMessage from "./SnackBarMessage";

export const LoginForm = () => {
  const dataInitial = {
    user: "",
    password: "",
    showPassword: false,
  };
  const navigate = useNavigate();

  const [userData, setUserData] = useState(dataInitial);

  const { isLoading, error, postRequest } = usePostRequestWithLoading(
    "http://localhost:9898/api/authentication/auth"
  );

  const {
    message: snackbarMessage,
    severity: snackbarSeverity,
    snackbarOpen,
    showSnackbar,
    hideSnackbar,
  } = useSnackbar();

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleVisibility = () => {
    setUserData({
      ...userData,
      showPassword: !userData.showPassword,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postRequest(userData, "POST");
      navigate("/home");
    } catch (error) {
      showSnackbar(error.message, "error");
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          style={{ minHeight: "80vh" }}
        >
          <form onSubmit={handleSubmit}>
            <Paper elevation={2} sx={{ padding: 5 }}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    align="center"
                  >
                    ¡BIENVENIDO!
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    label="Usuario"
                    placeholder="Ingrese su usario"
                    variant="outlined"
                    name="user"
                    onChange={handleInputChanges}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    type={userData.showPassword ? "text" : "password"}
                    fullWidth
                    label="Contraseña"
                    placeholder="Ingrese su contraseña"
                    variant="outlined"
                    name="password"
                    onChange={handleInputChanges}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleVisibility}
                            aria-label="toggle password"
                            edge="end"
                          >
                            {userData.showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="success"
                    endIcon={<FingerprintIcon />}
                  >
                    Ingresar
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        </Grid>

        <SnackbarMessage
          message={snackbarMessage}
          severity={snackbarSeverity}
          open={snackbarOpen}
          onClose={hideSnackbar}
        />
      </Container>
    </>
  );
};

export default LoginForm;
