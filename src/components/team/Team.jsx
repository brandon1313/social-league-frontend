import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  PlumbingSharp,
  PlusOneRounded,
} from "@mui/icons-material";
import usePostRequestWithLoading from "../../features/usePostRequestWithLoading";
import SnackbarMessage from "../system/SnackBarMessage";
import useSnackbar from "../../features/useSnackbar";

function Team() {
  const [teams, setTeams] = useState([]);
  const [currentTeam, setCurrentTeam] = useState("");
  const [pines, setPines] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [editIndex, setEditIndex] = useState(null);
  const [category, setCategory] = useState(0);
  const [captain, setCaptain] = useState(0);
  const [addPointsVar, setAddPoints] = useState(0);
  const [categories, setCategories] = useState([]);
  const [players, setPlayers] = useState([]);

  const [modifyPoints, setModifyPoints] = useState(null);
  const [mdfyDialog, setMdfyDialog] = useState(false);
  const { isLoading, error, postRequest } = usePostRequestWithLoading(
    "http://localhost:9898/api/team"
  );
  const [open, setOpen] = useState(false);

  const {
    message: snackbarMessage,
    severity: snackbarSeverity,
    snackbarOpen,
    showSnackbar,
    hideSnackbar,
  } = useSnackbar();

  useEffect(() => {
    getCategories();
    getTeamsFromApi();
  }, []);

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

  const getTeamsFromApi = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      "http://localhost:9898/api/team",
      requestOptions
    );
    const json = await response.json();
    setTeams(json);
  };
  const addTeam = async () => {
    try {
      await postRequest(
        {
          name: currentTeam,
          category: category,
          pines,
          points: puntos,
          captain,
        },
        "POST"
      );
      await getTeamsFromApi();
      showSnackbar("Team created successfully!", "success");
    } catch (err) {
      console.log(err);
      showSnackbar("Error creating user.", "error");
    }

    setPuntos(0);
    setPines(0);
    setCurrentTeam("");
  };

  const deleteTeam = async (index) => {
    try {
      await fetch(`http://localhost:9898/api/team/${teams[index].id}`, {
        method: "DELETE",
      });
      // Refresh players after deletion
      const updatedTeams = teams.filter(
        (player) => player.id !== teams[index].id
      );
      setTeams(updatedTeams);
    } catch (error) {
      console.error("Failed to delete player", error);
    }
  };

  const onCancelEdit = () => {
    setCurrentTeam("");
    setPuntos(0);
    setPines(0);
    setCategory(null);
    setEditIndex(null);
  };

  const startEditTeam = (index) => {
    setCurrentTeam(teams[index].name);
    setPuntos(teams[index].points);
    setPines(teams[index].pines);
    setCategory(teams[index].category.id);
    setEditIndex(index);
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(
      `http://localhost:9898/api/player/team/${teams[index].id}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  };

  const editTeam = async () => {
    try {
      await postRequest(
        {
          name: currentTeam,
          category: category,
          pines,
          points: puntos,
          captain,
        },
        "PUT",
        teams[editIndex].id
      );
      await getTeamsFromApi();
      showSnackbar("Team updated successfully!", "success");
    } catch (err) {
      console.log(err);
      showSnackbar("Error creating user.", "error");
    }

    setPuntos(0);
    setPines(0);
    setCurrentTeam("");
    setEditIndex(null);
  };

  const handleOpen = (index) => {
    setEditIndex(index);
    setOpen(true);
  };

  const handleOpenMdfy = (index) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(
      `http://localhost:9898/api/team/backup/${teams[index].id}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => setModifyPoints(data.points));
    setEditIndex(index);
    setMdfyDialog(true);
  };
  const handleClose = () => {
    setOpen(false);
    setAddPoints(0);
    setEditIndex(null);
  };

  const handleCloseMdfy = () => {
    setMdfyDialog(false);
    setModifyPoints(0);
    setEditIndex(null);
  };

  const handleSaveModfy = async () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modifyPoints),
    };
    const req = await fetch(
      "http://localhost:9898/api/team/points/edit/" + teams[editIndex].id,
      requestOptions
    );
    setMdfyDialog(false);
    await getTeamsFromApi();
    showSnackbar("Puntos Modificados!!", "success");
  };
  const addPoints = async (index) => {
    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addPointsVar),
      };
      fetch(
        `http://localhost:9898/api/team/points/${teams[editIndex].id}`,
        requestOptions
      )
        .then((res) => res.json())
        .then((e) => getTeamsFromApi());

      showSnackbar("Team updated successfully!", "success");
      setAddPoints(0);
      setOpen(false);
      setEditIndex(null);
    } catch (err) {
      console.log(err);
      showSnackbar("Error creating user.", "error");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <TextField
        label="Nombre del Equipo"
        variant="outlined"
        value={currentTeam}
        onChange={(e) => setCurrentTeam(e.target.value.toUpperCase())}
        style={{ marginBottom: "20px", display: "block" }}
      />
      <TextField
        label="Pines"
        variant="outlined"
        value={pines}
        onChange={(e) => setPines(e.target.value)}
        type="number"
        style={{ marginBottom: "20px", display: "block" }}
      />

      <TextField
        label="Puntos"
        variant="outlined"
        value={puntos}
        type="number"
        onChange={(e) => setPuntos(e.target.value)}
        style={{ marginBottom: "20px", display: "block" }}
      />
      <FormControl
        fullWidth
        sx={{ marginBottom: 2, maxWidth: "50%", marginRight: 2 }}
      >
        <InputLabel htmlFor="level-select">Categoria</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
          id="level-select"
          style={{ marginBottom: "20px", display: "block" }}
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
      </FormControl>

      {editIndex !== null ? (
        <FormControl
          fullWidth
          sx={{ marginBottom: 2, maxWidth: "50%", marginRight: 2 }}
        >
          <InputLabel htmlFor="captain">Capitan</InputLabel>
          <Select
            value={captain}
            onChange={(e) => setCaptain(e.target.value)}
            label="Category"
            id="level-select"
            style={{ marginBottom: "20px", display: "block" }}
          >
            {players.map((c) => {
              return (
                <MenuItem key={c.id} value={c.id}>
                  {c.name} {c.lastName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      ) : null}

      {editIndex === null ? (
        <Button variant="contained" color="primary" onClick={addTeam}>
          Agregar
        </Button>
      ) : (
        <div style={{ marginBottom: "20px" }}>
          <Button variant="contained" color="primary" onClick={editTeam}>
            Actualizar
          </Button>
          <Button
            variant="contained"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              onCancelEdit();
            }}
          >
            Cancelar
          </Button>
        </div>
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Acciones</TableCell>
            <TableCell>Nombre del Equipo</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Pines</TableCell>
            <TableCell>Puntos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((team, index) => (
            <TableRow key={index}>
              <TableCell align="left">
                <Tooltip title="Modificar">
                  <IconButton onClick={() => startEditTeam(index)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar">
                  <IconButton onClick={() => deleteTeam(index)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Agregar puntos">
                  <IconButton onClick={() => handleOpen(index)}>
                    <PlusOneRounded />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Modificar puntos">
                  <IconButton onClick={() => handleOpenMdfy(index)}>
                    <PlumbingSharp />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell component="th" scope="row">
                {team.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {category?.type === "MALE"
                  ? "MASCULINA "
                  : category?.type === "FEMALE"
                  ? "FEMENINA "
                  : "EQUIPO "}
                - {team.category?.level}
              </TableCell>
              <TableCell component="th" scope="row">
                {team.pines}
              </TableCell>
              <TableCell component="th" scope="row">
                {team.points}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SnackbarMessage
        message={snackbarMessage}
        severity={snackbarSeverity}
        open={snackbarOpen}
        onClose={hideSnackbar}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Añadir puntos a: {teams[editIndex]?.name}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="quantity"
            label="Puntos"
            type="number"
            fullWidth
            value={addPointsVar}
            onChange={(e) => setAddPoints(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={addPoints} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={mdfyDialog} onClose={handleCloseMdfy}>
        <DialogTitle>Modificar puntos a: {teams[editIndex]?.name}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="quantity"
            label="Puntos"
            type="number"
            fullWidth
            value={modifyPoints}
            onChange={(e) => setModifyPoints(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMdfy} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSaveModfy} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Team;
