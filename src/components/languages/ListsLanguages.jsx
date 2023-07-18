import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLanguagesAsync } from "../../features/languagesSlice";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { Link } from "react-router-dom";

const titles = [
    { id: 1, title: 'Id', name: 'id', align: 'center', style: '100' },
    { id: 2, title: 'Nombre', name: 'name', align: 'center', style: '170' },
    { id: 3, title: 'Abreviatura', name: 'description', align: 'center', style: '170' },
    { id: 4, title: 'Estado', name: 'status', align: 'center', style: '170' }
]

export const ListsLanguages = () => {

    const { listLanguages } = useSelector(state => state.languages);
    const dispatch = useDispatch();

    const [ page, setPage ] = useState(0);
    const [ rowsPerPage, setRowsPerPage ] = useState(10);

    useEffect(() => { 
        dispatch(getAllLanguagesAsync());
    }, [dispatch]);

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value);
        setPage(0);
    }

    return (
        <Paper sx = {{ width: '100%', overflow: 'hidden' }}  >
            <TableContainer sx = {{ maxHeight: 440 }} >
                <Table stickyHeader >
                    <TableHead>
                        <TableRow>
                            {
                                titles.map(item => (
                                    <TableCell key = { item.id } align = { item.align } 
                                        style = {{ minWidth: item.style, backgroundColor: '#000000', color: '#ffffff' }}>
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
                            listLanguages
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((language) => {
                                return (
                                    <TableRow hover role = 'checkbox' tabIndex = '-1' key = { language.id }>
                                        <TableCell key={ language.id } align = 'center'>
                                            { language.id }
                                        </TableCell>
                                        <TableCell align = 'center'>
                                            { language.name }
                                        </TableCell>
                                        <TableCell align = 'center'>
                                            { language.description }
                                        </TableCell>
                                        <TableCell align = 'center'>
                                            {  language.status }
                                        </TableCell>
                                        <TableCell>
                                            {/* <Button onClick={ <Link to={`/languages/${language.id} }`} /> } >Editar</Button> */}
                                            <Button >Editar</Button>
                                            <Button >Eliminar</Button>
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
                count = { listLanguages.length }
                rowsPerPage = { rowsPerPage }
                page = { page }
                onPageChange = { handleChangePage }
                onRowsPerPageChange = { handleChangeRowsPerPage } />
        </Paper>
    )

}

export default ListsLanguages;