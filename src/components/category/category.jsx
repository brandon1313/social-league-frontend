import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  Paper,
  TableRow,
  TableBody,
  TablePagination,
} from "@mui/material";
import usePostRequestWithLoading from "../../features/usePostRequestWithLoading";

const Category = () => {
  const URL = "http://localhost:9898/api/category";
  const [categories, setCategories] = useState([]);
  const [level, setLevel] = useState("");
  const [type, setType] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const { _isLoading, _error, postRequest } = usePostRequestWithLoading(URL);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getCategoriesFromApi();
  }, []);

  const getCategoriesFromApi = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(URL, requestOptions);
    const json = await response.json();
    setCategories(json);
  };
  const handleAddCategory = async () => {
    if (!level || !type) return;

    const newCategory = {
      id: categories.length + 1,
      level,
      type,
    };
    await postRequest(newCategory, "POST");
    await getCategoriesFromApi();
    setLevel("");
    setType("");
  };

  const handleEditCategory = (id) => {
    const categoryToEdit = categories.find((category) => category.id === id);
    if (categoryToEdit) {
      setLevel(categoryToEdit.level);
      setType(categoryToEdit.type);
      setEditCategoryId(id);
      setIsEditing(true);
    }
  };

  const handleUpdateCategory = async () => {
    if (!level || !type) return;

    const editCategory = {
      level,
      type,
    };
    await postRequest(editCategory, "PUT", editCategoryId);
    await getCategoriesFromApi();
    setLevel("");
    setType("");
    setIsEditing(false);
    setEditCategoryId(null);
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const slicedCategories = categories.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container>
      <h2>Categorias</h2>

      <FormControl
        fullWidth
        sx={{ marginBottom: 2, maxWidth: "50%", marginRight: 10 }}
      >
        <InputLabel htmlFor="level-select">Nivel</InputLabel>
        <Select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          label="Level"
          id="level-select"
        >
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
          <MenuItem value="C">C</MenuItem>
          <MenuItem value="D">D</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 2, maxWidth: "50%" }}>
        <InputLabel htmlFor="type-select">Tipo</InputLabel>
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
          label="Type"
          id="type-select"
        >
          <MenuItem value="MALE">Masculina</MenuItem>
          <MenuItem value="FEMALE">Femenina</MenuItem>
        </Select>
      </FormControl>

      {isEditing ? (
        <div>
          <Button variant="contained" onClick={handleUpdateCategory}>
            Update
          </Button>
        </div>
      ) : (
        <div>
          <Button
            variant="contained"
            onClick={handleAddCategory}
            sx={{ marginBottom: 5 }}
          >
            Agregar
          </Button>
        </div>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nivel</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.level}</TableCell>
                <TableCell>
                  {category.type === "MALE" ? "MASCULINA" : "FEMENINA"}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleEditCategory(category.id)}>
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={categories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Categorias por pagina"
      />
    </Container>
  );
};

export default Category;
