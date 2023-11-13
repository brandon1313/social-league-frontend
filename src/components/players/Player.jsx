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

import AddReactionIcon from "@mui/icons-material/AddReaction";
import useSnackbar from "../../features/useSnackbar";
import SnackbarMessage from "../system/SnackBarMessage";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import { Calculate, LineAxis, LineStyle } from "@mui/icons-material";
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
  const [line, setLine] = useState(0);
  const [line1, setLine1] = useState(0);
  const [line2, setLine2] = useState(0);
  const [linebk, setLinebk] = useState(0);
  const [line1bk, setLine1bk] = useState(0);
  const [line2bk, setLine2bk] = useState(0);

  const [openModifyLines, setOpenModifyLines] = useState(false);
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
    mail: "",
    lineAverage: 0.0,
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
        team: selectedTeam,
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

    try {
      const req = await fetch(
        "http://localhost:9898/api/player",
        requestOptions,
        player
      );
      req.json();
    } catch (error) {
      showSnackbar(
        "Hubo un error al guardar al jugador, verifica si el jugador ya existe.",
        "error"
      );
    }

    showSnackbar("Jugador creado!!", "success");
    setUpdated(true);
    setOpenDialog(false);
  };

  const handleOpenSerie = (player) => {
    setPlayer(player);
    setOpenSerieDialog(true);
  };

  const updateHDCP = async (player) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const req = await fetch(
      "http://localhost:9898/api/player/hdcp/" + player.id,
      requestOptions
    );

    setUpdated(!updated);
  };
  const handleModifyLines = async (player) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const req = await fetch(
      "http://localhost:9898/api/player/backup/" + player.id,
      requestOptions
    );

    const data = await req.json();

    const { line1, line2, line3 } = data;
    setPlayer(player);
    setLinebk(line1);
    setLine1bk(line2);
    setLine2bk(line3);
    setOpenModifyLines(true);
  };

  const handleOpenLine = (player) => {
    setPlayer(player);
    setOpenLineDialog(true);
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

  const handleClose = () => {
    setOpenLineDialog(false);
    setLine(0);
    setLine2(0);
    setLine1(0);
  };

  const handleSaveLinebk = async () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([linebk, line1bk, line2bk]),
    };
    const req = await fetch(
      "http://localhost:9898/api/player/lines/edit/" + player.id,
      requestOptions
    );
    setOpenModifyLines(false);
    setLinebk(0);
    setLine1bk(0);
    setLine2bk(0);
    showSnackbar("Lineas Modificadas!!", "success");
  };
  const handleSaveLine = async () => {
    if (line === "" || line2 === "" || line1 === "") {
      showSnackbar("Debe agregar las 3 lineas", "error");
      return;
    }
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([line, line1, line2]),
    };
    const req = await fetch(
      "http://localhost:9898/api/player/lines/" + player.id,
      requestOptions
    );
    setOpenLineDialog(false);
    setLine(0);
    setLine1(0);
    setLine2(0);
    showSnackbar("Linea Agregada!!", "success");
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
            <TableCell>Correo</TableCell>
            <TableCell>Lineas</TableCell>
            <TableCell>Promedio de Linea</TableCell>
            <TableCell>Linea Max</TableCell>
            <TableCell>Serie Max</TableCell>
            <TableCell>Promedio</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player) => (
            <TableRow
              key={player.id}
              style={
                player.id ==
                teams.filter((t) => t.id === selectedTeam)[0]?.captain?.id
                  ? { backgroundColor: "#BDC3C7" }
                  : {}
              }
            >
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.lastName}</TableCell>
              <TableCell>{player.handicap}</TableCell>
              <TableCell>{player.lastSummation}</TableCell>
              <TableCell>{player.mail}</TableCell>
              <TableCell>{player.linesQuantity}</TableCell>
              <TableCell>
                {player.lineAverage
                  ? player.lineAverage.toFixed(2)
                  : (0.0).toFixed(2)}
              </TableCell>
              <TableCell>{player.maxLine}</TableCell>
              <TableCell>{player.maxSerie}</TableCell>
              <TableCell>
                {player.average ? player.average.toFixed(2) : (0.0).toFixed(2)}
              </TableCell>
              <TableCell>
                <Tooltip>
                  <IconButton onClick={() => handleEdit(player)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                {/* <IconButton onClick={() => handleDelete(player.id)}>
                  <DeleteIcon />
                </IconButton> */}
                <Tooltip title="Agregar Lineas">
                  <IconButton onClick={() => handleOpenLine(player)}>
                    <PlaylistAddCheckIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Modificar Lineas">
                  <IconButton onClick={() => handleModifyLines(player)}>
                    <LineAxis />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Actualizar HDCP">
                  <IconButton onClick={() => updateHDCP(player)}>
                    <Calculate />
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
          <Box mb={2} mt={4}>
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
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="mail"
              value={player?.mail || ""}
              onChange={(e) => handleChange("mail", e)}
            />
          </Box>

          <Box mb={2}>
            <TextField
              fullWidth
              type="number"
              label="Handicap"
              value={player?.handicap || ""}
              onChange={(e) => handleChange("handicap", e)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              type="number"
              label="Ultima Sumatoria"
              value={player?.lastSummation || ""}
              onChange={(e) => handleChange("lastSummation", e)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="number"
              fullWidth
              label="Promedio"
              value={player?.average || ""}
              onChange={(e) => handleChange("average", e)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="number"
              fullWidth
              label="# Lineas"
              value={player?.linesQuantity || ""}
              onChange={(e) => handleChange("linesQuantity", e)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="number"
              fullWidth
              label="Max Linea"
              value={player?.maxLine || ""}
              onChange={(e) => handleChange("maxLine", e)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="number"
              fullWidth
              label="Promedio de Linea"
              value={player?.lineAverage || ""}
              onChange={(e) => handleChange("lineAverage", e)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              type="number"
              fullWidth
              label="Max Serie"
              value={player?.maxSerie || ""}
              onChange={(e) => handleChange("maxSerie", e)}
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
        <DialogTitle>Ingrese Serie: {player?.name}</DialogTitle>
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
        <DialogTitle>Ingrese Linea: {player?.name}</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ marginTop: 2 }}
            fullWidth
            label="Linea 1"
            type="number"
            value={line}
            onChange={(e) => setLine(e.target.value)}
          />
          <TextField
            sx={{ marginTop: 2 }}
            fullWidth
            label="Linea 2"
            type="number"
            value={line1}
            onChange={(e) => setLine1(e.target.value)}
          />
          <TextField
            sx={{ marginTop: 2 }}
            fullWidth
            label="Linea 3"
            type="number"
            value={line2}
            onChange={(e) => setLine2(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Cancelar</Button>
          <Button onClick={() => handleSaveLine()}>Guardar</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openModifyLines}
        onClose={() => setOpenModifyLines(false)}
        fullWidth
      >
        <DialogTitle>Modificar Lineas: {player?.name}</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ marginTop: 2 }}
            fullWidth
            label="Linea 1"
            type="number"
            value={linebk}
            onChange={(e) => setLinebk(e.target.value)}
          />
          <TextField
            sx={{ marginTop: 2 }}
            fullWidth
            label="Linea 2"
            type="number"
            value={line1bk}
            onChange={(e) => setLine1bk(e.target.value)}
          />
          <TextField
            sx={{ marginTop: 2 }}
            fullWidth
            label="Linea 3"
            type="number"
            value={line2bk}
            onChange={(e) => setLine2bk(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModifyLines(false)}>Cancelar</Button>
          <Button onClick={() => handleSaveLinebk()}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default TeamPlayers;
