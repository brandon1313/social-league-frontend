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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

function TeamPlayers() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [players, setPlayers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState();

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
  }, [selectedTeam]);

  const handleEdit = (player) => {
    setCurrentPlayer(player);
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
    // Logic to send POST (for new) or PUT (for edit) request to save player details
    // For now, just close the dialog
    setOpenDialog(false);
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
            <TableCell>Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player) => (
            <TableRow key={player.id}>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.lastName}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEdit(player)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(player.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box mt={4}>
        <IconButton
          color="primary"
          onClick={() => {
            setCurrentPlayer(null);
            setOpenDialog(true);
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {currentPlayer ? "Edit Player" : "Add Player"}
        </DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Name"
              value={currentPlayer?.name || ""}
              onChange={(e) =>
                setCurrentPlayer((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Last Name"
              value={currentPlayer?.lastName || ""}
              onChange={(e) =>
                setCurrentPlayer((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
            />
          </Box>
          {/* Add fields for other attributes */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default TeamPlayers;
