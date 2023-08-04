import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Container,
  CircularProgress,
} from "@mui/material";
import usePostRequestWithLoading from "../../features/usePostRequestWithLoading";
import useSnackbar from "../../features/useSnackbar";
import SnackbarMessage from "../system/SnackBarMessage";

const User = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isLoading, error, postRequest } = usePostRequestWithLoading(
    "http://localhost:9898/api/authentication"
  );
  const {
    message: snackbarMessage,
    severity: snackbarSeverity,
    snackbarOpen,
    showSnackbar,
    hideSnackbar,
  } = useSnackbar();

  const handleCreateUser = async () => {
    if (!username || !password || !confirmPassword) {
      showSnackbar("Debes llenar todos los campos.", "error");
      return;
    }

    if (password !== confirmPassword) {
      showSnackbar("Las contraseñas no coinciden", "error");
      return;
    }

    const newUser = {
      id: users.length + 1,
      username,
      password,
    };
    try {
      await postRequest(newUser);
      showSnackbar("User created successfully!", "success");
    } catch (err) {
      showSnackbar("Error creating user.", error);
    }
    setUsers([...users, newUser]);
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Container>
      <h2>Usuarios</h2>
      <Box sx={{ py: 2 }}>
        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ width: "25%" }}
        />
      </Box>
      <Box sx={{ py: 2 }}>
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ width: "25%" }}
        />
      </Box>
      <Box sx={{ py: 2 }}>
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ width: "25%" }}
        />
      </Box>
      <Box sx={{ py: 2 }}>
        <Button
          variant="contained"
          onClick={handleCreateUser}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={20} /> : "Crear"}
        </Button>
      </Box>

      <SnackbarMessage
        message={snackbarMessage}
        severity={snackbarSeverity}
        open={snackbarOpen}
        onClose={hideSnackbar}
      />
    </Container>
  );
};

export default User;
