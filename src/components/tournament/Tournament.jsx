import React, { useState } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Box,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import useSnackbar from "../../features/useSnackbar";
import SnackbarMessage from "../system/SnackBarMessage";

function TournamentCRUD() {
  const {
    message: snackbarMessage,
    severity: snackbarSeverity,
    snackbarOpen,
    showSnackbar,
    hideSnackbar,
  } = useSnackbar();
  const [tournaments, setTournaments] = useState([]);
  const [editingTournament, setEditingTournament] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  useState(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:9898/api/tournament", requestOptions)
      .then((res) => res.json())
      .then((data) => setEditingTournament(data));
  }, []);

  const handleTerminate = async () => {
    let id = editingTournament.id;
    delete editingTournament.id;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const req = await fetch(
      "http://localhost:9898/api/tournament/finish/" + id,
      requestOptions
    ).then((e) => console.log(e));
    setEditingTournament(null);

    window.location.reload();
  };
  const handleSave = async () => {
    const errors = {};

    if (!editingTournament?.tournamentName)
      errors.tournamentName = "Obligatorio";
    if (!editingTournament?.dedicateTo) errors.dedicateTo = "Obligatorio";
    if (!editingTournament?.firstClubValue)
      errors.firstClubValue = "Obligatorio";
    if (!editingTournament?.secondClubValue)
      errors.secondClubValue = "Obligatorio";
    if (!editingTournament?.thirdClubValue)
      errors.thirdClubValue = "Obligatorio";
    if (!editingTournament?.firstClubQuota)
      errors.firstClubQuota = "Obligatorio";
    if (!editingTournament?.secondClubQuota)
      errors.secondClubQuota = "Obligatorio";
    if (!editingTournament?.thirdClubQuota)
      errors.thirdClubQuota = "Obligatorio";
    if (!editingTournament?.linesAverage) errors.linesAverage = "Obligatorio";
    if (!editingTournament?.pointsForHDCP) errors.pointsForHDCP = "Obligatorio";
    if (!editingTournament?.averageForHDCP)
      errors.averageForHDCP = "Obligatorio";
    if (!editingTournament?.numberDays) errors.numberDays = "Obligatorio";

    if (Object.keys(errors).length) {
      console.log(errors);
      showSnackbar("Todos los campos son obligatorios!!", "error");
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});

    if (editingTournament.id) {
      let id = editingTournament.id;
      delete editingTournament.id;
      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingTournament),
      };
      const req = await fetch(
        "http://localhost:9898/api/tournament/" + id,
        requestOptions
      );

      editingTournament.id = id;
    } else {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingTournament),
      };
      console.log(requestOptions);
      const req = await fetch(
        "http://localhost:9898/api/tournament",
        requestOptions
      );
    }

    showSnackbar("Peticion exitosa!", "success");
    window.location.reload();
  };

  const handleChange = (field, event) => {
    if (field === "applyClubes") {
      setEditingTournament({
        ...editingTournament,
        applyClubes: event.target.checked,
      });
      return;
    }
    setEditingTournament({
      ...editingTournament,
      [field]:
        event.target.type === "number"
          ? parseFloat(event.target.value)
          : event.target.value,
    });
  };
  const handleEdit = (tournament) => {
    setEditingTournament(tournament);
  };

  const handleDelete = (tournamentToDelete) => {
    setTournaments(
      tournaments.filter((tournament) => tournament !== tournamentToDelete)
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingTournament({ ...editingTournament, [name]: value });
  };

  return (
    <div>
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          marginBottom: "20px",
          width: "50%",
          marginTop: "20px",
        }}
      >
        <Box mb={2} mt={4}>
          <TextField
            required
            fullWidth
            label="Nombre"
            value={editingTournament?.tournamentName || ""}
            onChange={(e) => handleChange("tournamentName", e)}
            error={!!validationErrors.tournamentName}
            helperText={validationErrors.tournamentName}
          />
        </Box>
        <Box mb={2} mt={4}>
          <TextField
            required
            fullWidth
            label="Dedicado a"
            value={editingTournament?.dedicateTo || ""}
            onChange={(e) => handleChange("dedicateTo", e)}
            error={!!validationErrors.dedicateTo}
            helperText={validationErrors.dedicateTo}
          />
        </Box>
        <Box mb={2} mt={4}>
          <FormControlLabel
            control={
              <Switch
                checked={editingTournament?.applyClubes || false}
                onChange={(e) => handleChange("applyClubes", e)}
                name="applyClubes"
                color="primary"
              />
            }
            label="Apply Clubes"
          />
        </Box>
        <Box mb={2} mt={4}>
          <TextField
            type="number"
            required
            fullWidth
            label="Primer Club"
            value={editingTournament?.firstClubValue || 0}
            onChange={(e) => handleChange("firstClubValue", e)}
            error={!!validationErrors.firstClubValue}
            helperText={validationErrors.firstClubValue}
          />
        </Box>

        <Box mb={2} mt={4}>
          <TextField
            type="number"
            required
            fullWidth
            label="Segundo Club"
            value={editingTournament?.secondClubValue || 0}
            onChange={(e) => handleChange("secondClubValue", e)}
            error={!!validationErrors.secondClubValue}
            helperText={validationErrors.secondClubValue}
          />
        </Box>

        <Box mb={2} mt={4}>
          <TextField
            type="number"
            required
            fullWidth
            label="Tercer Club"
            value={editingTournament?.thirdClubValue || 0}
            onChange={(e) => handleChange("thirdClubValue", e)}
            error={!!validationErrors.thirdClubValue}
            helperText={validationErrors.thirdClubValue}
          />
        </Box>

        <Box mb={2} mt={4}>
          <TextField
            type="number"
            required
            fullWidth
            label="Cuota primer Club"
            value={editingTournament?.firstClubQuota || 0}
            onChange={(e) => handleChange("firstClubQuota", e)}
            error={!!validationErrors.firstClubQuota}
            helperText={validationErrors.firstClubQuota}
          />
        </Box>

        <Box mb={2} mt={4}>
          <TextField
            type="number"
            required
            fullWidth
            label="Cuota segundo Club"
            value={editingTournament?.secondClubQuota || 0}
            onChange={(e) => handleChange("secondClubQuota", e)}
            error={!!validationErrors.secondClubQuota}
            helperText={validationErrors.secondClubQuota}
          />
        </Box>

        <Box mb={2} mt={4}>
          <TextField
            type="number"
            required
            fullWidth
            label="Cuota tercer Club"
            value={editingTournament?.thirdClubQuota || 0}
            onChange={(e) => handleChange("thirdClubQuota", e)}
            error={!!validationErrors.thirdClubQuota}
            helperText={validationErrors.thirdClubQuota}
          />
        </Box>

        <Box mb={2} mt={4}>
          <TextField
            type="number"
            required
            fullWidth
            label="Promedio de Lineas"
            value={editingTournament?.linesAverage || 0}
            onChange={(e) => handleChange("linesAverage", e)}
            error={!!validationErrors.linesAverage}
            helperText={validationErrors.linesAverage}
          />
        </Box>

        <Box mb={2} mt={4}>
          <TextField
            type="number"
            required
            fullWidth
            label="Puntos Handicap"
            value={editingTournament?.pointsForHDCP || ""}
            onChange={(e) => handleChange("pointsForHDCP", e)}
            error={!!validationErrors.pointsForHDCP}
            helperText={validationErrors.pointsForHDCP}
          />
        </Box>

        <Box mb={2} mt={4}>
          <TextField
            type="number"
            required
            fullWidth
            label="Promedio Handicap"
            value={editingTournament?.averageForHDCP || ""}
            onChange={(e) => handleChange("averageForHDCP", e)}
            error={!!validationErrors.averageForHDCP}
            helperText={validationErrors.averageForHDCP}
          />
        </Box>

        <Box mb={2} mt={4}>
          <TextField
            type="number"
            required
            fullWidth
            label="Cantidad de dias"
            value={editingTournament?.numberDays || ""}
            onChange={(e) => handleChange("numberDays", e)}
            error={!!validationErrors.numberDays}
            helperText={validationErrors.numberDays}
          />
        </Box>
        {editingTournament?.id ? null : (
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Iniciar Torneo
          </Button>
        )}

        {editingTournament?.id ? (
          <Button
            onClick={handleTerminate}
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Terminar Torneo
          </Button>
        ) : null}
      </Paper>

      <SnackbarMessage
        message={snackbarMessage}
        severity={snackbarSeverity}
        open={snackbarOpen}
        onClose={hideSnackbar}
      />
      {/* 
      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tournament Name</TableCell>
              <TableCell>Dedicate To</TableCell>
              <TableCell>Apply Clubes</TableCell>
              <TableCell>First Club Value</TableCell>
              <TableCell>Second Club Value</TableCell>
              <TableCell>Third Club Value</TableCell>
              <TableCell>First Club Quota</TableCell>
              <TableCell>Second Club Quota</TableCell>
              <TableCell>Third Club Quota</TableCell>
              <TableCell>Lines Average</TableCell>
              <TableCell>Points for HDCP</TableCell>
              <TableCell>Average for HDCP</TableCell>
              <TableCell>Number of Days</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tournaments.map((tournament, idx) => (
              <TableRow key={idx}>
                <TableCell>{tournament.tournamentName}</TableCell>
                <TableCell>{tournament.dedicateTo}</TableCell>
                <TableCell>{tournament.applyClubes ? "Yes" : "No"}</TableCell>
                <TableCell>{tournament.firstClubValue}</TableCell>
                <TableCell>{tournament.secondClubValue}</TableCell>
                <TableCell>{tournament.thirdClubValue}</TableCell>
                <TableCell>{tournament.firstClubQuota}</TableCell>
                <TableCell>{tournament.secondClubQuota}</TableCell>
                <TableCell>{tournament.thirdClubQuota}</TableCell>
                <TableCell>{tournament.linesAverage}</TableCell>
                <TableCell>{tournament.pointsForHDCP}</TableCell>
                <TableCell>{tournament.averageForHDCP}</TableCell>
                <TableCell>{tournament.numberDays}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>Table */}
    </div>
  );
}

export default TournamentCRUD;
