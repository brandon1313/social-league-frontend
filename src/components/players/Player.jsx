import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  TextField,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Container,
  FormControl,
  InputLabel,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import useSnackbar from "../../features/useSnackbar";
import SnackbarMessage from "../system/SnackBarMessage";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import AddRoadIcon from "@mui/icons-material/AddRoad";
function TeamPlayers() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [players, setPlayers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [categories, setCategories] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [openSerieDialog, setOpenSerieDialog] = useState(false);
  const [openLineDialog, setOpenLineDialog] = useState(false);
  const [serie, setSerie] = useState("");
  const [line, setLine] = useState("");
  const [player, setPlayer] = useState({
    birth: "01/01/1900",
    name: "",
    lastName: "",
    phone: 0,
    handicap: 0,
    lastSummation: 0,
    average: 0.0,
    team: 0,
    category: 0,
    linesQuantity: 0,
    maxLine: 0,
    maxSerie: 0,
  });
  const {
    message: snackbarMessage,
    severity: snackbarSeverity,
    snackbarOpen,
    showSnackbar,
    hideSnackbar,
  } = useSnackbar();

  const handleChange = (field, event) => {
    if (field === "category") {
      setPlayer({
        ...player,
        category: event.target.value,
      });
      return;
    }
    setPlayer({
      ...player,
      [field]:
        event.target.type === "number"
          ? parseFloat(event.target.value)
          : event.target.value,
    });
  };

  const getCategories = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const req = await fetch(
      "http://localhost:9898/api/category",
      requestOptions
    );
    const data = await req.json();
    setCategories(data);
  };

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:9898/api/team", requestOptions)
      .then((res) => res.json())
      .then((data) => setTeams(data));

    getCategories();
  }, []);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (selectedTeam) {
      fetch(
        `http://localhost:9898/api/player/team/${selectedTeam}`,
        requestOptions
      )
        .then((res) => res.json())
        .then((data) => setPlayers(data));
    }
  }, [selectedTeam, updated]);

  const handleEdit = (player) => {
    setPlayer(player);
    setOpenDialog(true);
  };

  const handleDelete = async (playerId) => {
    try {
      await fetch(`http://localhost:9898/api/player/${playerId}`, {
        method: "DELETE",
      });
      // Refresh players after deletion
      const updatedPlayers = players.filter((player) => player.id !== playerId);
      setPlayers(updatedPlayers);
    } catch (error) {
      console.error("Failed to delete player", error);
    }
  };

  const handleSave = async () => {
    const errors = {};

    if (!player?.name) errors.name = "Nombre es obligatorio";
    if (!player?.lastName) errors.lastName = "Apellido es obligatorio";
    if (!player?.phone) errors.phone = "Celular es obligatorio";
    if (!player?.handicap) errors.handicap = "Handicap es obligatorio";
    if (!player?.lastSummation) errors.lastSummation = "Obligatorio";
    if (!player?.linesQuantity) errors.linesQuantity = "Obligatorio";
    if (!player?.average) errors.average = "Obligatorio";
    if (!player?.maxLine) errors.maxLine = "Obligatorio";
    if (!player?.maxSerie) errors.maxSerie = "Obligatorio";
    if (!player?.category) errors.category = "Obligatorio";

    if (Object.keys(errors).length) {
      showSnackbar("Todos los campos son obligatorios!!", "error");
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});

    setUpdated(false);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...player,
        birth: "01/01/1900",
        team: selectedTeam,
      }),
    };

    if (player.id) {
      requestOptions.method = "PUT";
      requestOptions.body = JSON.stringify({
        ...player,
        category: player.category.id,
        team: player.team.id,
        birth: "01/01/1900",
      });
      const req = await fetch(
        "http://localhost:9898/api/player/" + player.id,
        requestOptions,
        player
      );
      const data = await req.json();
      showSnackbar("Jugador actualizado!!", "success");
      setOpenDialog(false);
      setUpdated(true);
      return;
    }

    const req = await fetch(
      "http://localhost:9898/api/player",
      requestOptions,
      player
    );
    showSnackbar("Jugador creado!!", "success");
    setUpdated(true);
    setOpenDialog(false);
  };

  const handleOpenSerie = (player) => {
    setPlayer(player);
    setOpenLineDialog(true);
  };

  const handleOpenLine = (player) => {
    setPlayer(player);
    setOpenSerieDialog(true);
  };

  const handleSaveSerie = async () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(serie),
    };
    const req = await fetch(
      "http://localhost:9898/api/player/serie/" + player.id,
      requestOptions
    );
    setOpenSerieDialog(false);
    setSerie(null);
    showSnackbar("Serie Agregada!!", "success");
    setUpdated(!updated);
  };

  const handleSaveLine = async () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(line),
    };
    const req = await fetch(
      "http://localhost:9898/api/player/line/" + player.id,
      requestOptions
    );
    setOpenLineDialog(false);
    setLine(null);
    showSnackbar("Linea Agragada!!", "success");
    setUpdated(!updated);
  };
  return (
    <Container m={4}>
      <FormControl
        fullWidth
        sx={{ marginBottom: 2, maxWidth: "50%", marginTop: 10 }}
      >
        <Select
          variant="outlined"
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
        >
          {teams.map((team) => (
            <MenuItem key={team.id} value={team.id}>
              {team.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Handicap</TableCell>
            <TableCell>Ultima Sumatoria</TableCell>
            <TableCell>Lineas</TableCell>
            <TableCell>Linea Max</TableCell>
            <TableCell>Serie Max</TableCell>
            <TableCell>Promedio</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player) => (
            <TableRow key={player.id}>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.lastName}</TableCell>
              <TableCell>{player.handicap}</TableCell>
              <TableCell>{player.lastSummation}</TableCell>
              <TableCell>{player.linesQuantity}</TableCell>
              <TableCell>{player.maxLine}</TableCell>
              <TableCell>{player.maxSerie}</TableCell>
              <TableCell>{player.average}</TableCell>
              <TableCell>
                <Tooltip title="Editar">
                  <IconButton onClick={() => handleEdit(player)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                {/* <IconButton onClick={() => handleDelete(player.id)}>
                  <DeleteIcon />
                </IconButton> */}
                <Tooltip title="Agregar Linea">
                  <IconButton
                    onClick={() => handleOpenLine(player)}
                    title="Editar"
                  >
                    <PlaylistAddCheckIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Agregar Serie">
                  <IconButton onClick={() => handleOpenSerie(player)}>
                    <AddRoadIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedTeam ? (
        <Box mt={4}>
          <IconButton
            color="primary"
            onClick={() => {
              setPlayer(null);
              setOpenDialog(true);
            }}
          >
            <AddReactionIcon />
          </IconButton>
        </Box>
      ) : null}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>
          {player ? "Editar Jugador" : "Agregar Jugador"}
        </DialogTitle>
        <DialogContent>
          <Box mb={2} mt={2}>
            <TextField
              required
              fullWidth
              label="Nombre"
              value={player?.name || ""}
              onChange={(e) => handleChange("name", e)}
              error={!!validationErrors.name}
              helperText={validationErrors.name}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Apellido"
              value={player?.lastName || ""}
              onChange={(e) => handleChange("lastName", e)}
              required
              error={!!validationErrors.lastName}
              helperText={validationErrors.lastName}
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="number"
              fullWidth
              label="# Celular"
              value={player?.phone || ""}
              onChange={(e) => handleChange("phone", e)}
              required
              error={!!validationErrors.phone}
              helperText={validationErrors.phone}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              type="number"
              label="Handicap"
              value={player?.handicap || ""}
              onChange={(e) => handleChange("handicap", e)}
              required
              error={!!validationErrors.handicap}
              helperText={validationErrors.handicap}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              type="number"
              label="Ultima Sumatoria"
              value={player?.lastSummation || ""}
              onChange={(e) => handleChange("lastSummation", e)}
              required
              error={!!validationErrors.lastSummation}
              helperText={validationErrors.lastSummation}
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="number"
              fullWidth
              label="Promedio"
              value={player?.average || ""}
              onChange={(e) => handleChange("average", e)}
              required
              error={!!validationErrors.average}
              helperText={validationErrors.average}
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="number"
              fullWidth
              label="# Lineas"
              value={player?.linesQuantity || ""}
              onChange={(e) => handleChange("linesQuantity", e)}
              required
              error={!!validationErrors.linesQuantity}
              helperText={validationErrors.linesQuantity}
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="number"
              fullWidth
              label="Max Linea"
              value={player?.maxLine || ""}
              onChange={(e) => handleChange("maxLine", e)}
              required
              error={!!validationErrors.maxLine}
              helperText={validationErrors.maxLine}
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="number"
              fullWidth
              label="Max Serie"
              value={player?.maxSerie || ""}
              onChange={(e) => handleChange("maxSerie", e)}
              required
              error={!!validationErrors.maxSerie}
              helperText={validationErrors.maxSerie}
            />
          </Box>
          <Box>
            <InputLabel htmlFor="level-select">Categoria</InputLabel>
            <Select
              value={
                player?.category?.id ? player?.category?.id : player?.category
              }
              onChange={(e) => handleChange("category", e)}
              label="Category"
              id="level-select"
              style={{ marginBottom: "20px", display: "block" }}
              required
              error={!!validationErrors.category}
              helperText={validationErrors.category}
            >
              {categories.map((c) => {
                return (
                  <MenuItem key={c.id} value={c.id}>
                    {c.type === "MALE"
                      ? "MASCULINA "
                      : c.type === "FEMALE"
                      ? "FEMENINA "
                      : "EQUIPO "}
                    - {c?.level}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button color="primary" onClick={handleSave}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <SnackbarMessage
        message={snackbarMessage}
        severity={snackbarSeverity}
        open={snackbarOpen}
        onClose={hideSnackbar}
      />

      {/* Serie Dialog */}
      <Dialog
        open={openSerieDialog}
        onClose={() => setOpenSerieDialog(false)}
        fullWidth
      >
        <DialogTitle>Ingrese Serie: {player.name}</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ marginTop: 2 }}
            fullWidth
            label="Serie"
            type="number"
            value={serie}
            onChange={(e) => setSerie(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSerieDialog(false)}>Cancelar</Button>
          <Button onClick={() => handleSaveSerie()}>Guardar</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openLineDialog}
        onClose={() => setOpenLineDialog(false)}
        fullWidth
      >
        <DialogTitle>Ingrese Linea: {player.name}</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ marginTop: 2 }}
            fullWidth
            label="Line"
            type="number"
            value={line}
            onChange={(e) => setLine(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLineDialog(false)}>Cancelar</Button>
          <Button onClick={() => handleSaveLine()}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default TeamPlayers;
