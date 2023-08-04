import { useState } from "react";

const useSnackbar = () => {
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const showSnackbar = (message, severity = "info") => {
    setMessage(message);
    setSeverity(severity);
    setSnackbarOpen(true);
  };

  const hideSnackbar = () => {
    setSnackbarOpen(false);
  };

  return { message, severity, snackbarOpen, showSnackbar, hideSnackbar };
};

export default useSnackbar;
