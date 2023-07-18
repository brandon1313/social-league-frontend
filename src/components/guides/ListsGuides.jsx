import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { getAllGuidesAsync, setSelectedGuide } from "../../features/guideSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const titles = [
    { id: 1, title: 'Id', name: 'id', align: 'center', style: '100' },
    { id: 2, title: 'Nombre', name: 'fullName', align: 'center', style: '170' },
    { id: 3, title: 'CUI', name: 'cui', align: 'center', style: '100' },
    { id: 4, title: 'Idiomas', name: 'languages', align: 'center', style: '100' }

]

const ListsGuides = () => {

    const { listGuides } = useSelector(state => state.guides);
    const dispatch = useDispatch();

    const [ page, setPage ] = useState(0);
    const [ rowsPerPage, setRowsPerPage ] = useState(10);

    useEffect(() => {
        dispatch(getAllGuidesAsync());
    }, [dispatch]);

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value);
        setPage(0);
    }

    const handleDetail = (guide) => {
        dispatch(setSelectedGuide(guide))
    }

    return (
        <Paper sx = {{ width: '100%', overflow: 'hidden' }} >
            <TableContainer sx = {{ maxHeight: 440 }}>
                <Table stickyHeader >
                    <TableHead>
                        <TableRow>
                            {
                                titles.map((item) => (
                                    <TableCell key = {item.id} align = { item.align }
                                        style = {{ minWidth: item.style, backgroundColor: '#000000', color: '#ffffff' }} >
                                            { item.title }
                                        </TableCell>
                                ))
                            }
                            <TableCell style={{ backgroundColor: '#000000', color: '#ffffff' }}>
                                Opciones
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            listGuides
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((guide) => {
                                return (
                                    <TableRow hover role = 'checkbox' tabIndex = {-1} key = {guide.id}>
                                        <TableCell key = {guide.id} align = 'center'>
                                            {guide.id}
                                        </TableCell>
                                        <TableCell align = 'center'>
                                            {guide.name + ' ' +  guide.lastName}
                                        </TableCell>
                                        <TableCell align = 'center'>
                                            {guide.cui}
                                        </TableCell>
                                        <TableCell align = 'center'>
                                            {guide.languages.map(l => l.name).join(", ")}
                                        </TableCell>
                                        <TableCell>
                                            <Button >Editar</Button>
                                            <Button >Eliminar</Button>
                                            <Button onClick={ e => handleDetail(guide)} >Detalle</Button>
                                        </TableCell>
                                    </TableRow>
                                )    
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component = 'div'
                count = { listGuides.length }
                rowsPerPage = { rowsPerPage }
                page = { page }
                onPageChange = { handleChangePage }
                onRowsPerPageChange = { handleChangeRowsPerPage } />
        </Paper>
    );
}

export default ListsGuides;