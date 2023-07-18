import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLanguageByIdAsync, saveLanguageAsync } from "../../features/languagesSlice";
import { Toaster, toast } from "sonner";
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, FormControl, FormGroup, Grid, InputLabel, Modal, OutlinedInput, Typography } from "@mui/material";
import { useParams } from "react-router";

export const FormLanguage = () => {

    const { styleModal } = useSelector(state => state.menu);
    const { languageForm } = useSelector(state => state.languages);
    const [ open, setOpen ] = useState(false);
    const [ language, setLanguage ] = useState(languageForm);
    const [ error, setError ] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(getLanguageByIdAsync(id));
        }
    },  [id]);

    const dispatch = useDispatch();

    const handleModal = (status) => {
        setOpen(status);
    }

    const handleChangeFormControl = (e) => {
        setLanguage({
            ...language,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(saveLanguageAsync(language))
        notification("Se ha guardado correctamente", "ok");
    }

    const notification = (message, status = "fail") => {
        if (status === 'ok') {
            toast.success(message, {
                action: {
                    label: 'Cerrar', 
                    onClick: () => {
                        setOpen(false);
                    }
                }
            });
        } else {
            toast.error(message);
        }
    }
    

    return (
        <Grid container spacing = {4} >
            <Grid item xs = {8}>
                <Typography variant = 'h4' component = 'div'
                sx = {{
                    mr: 2,
                    display: { xs: 'flex' },
                    fontFamily: 'monospace',
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none'
                }} >
                    Lenguajes
                </Typography>
            </Grid>
            <Grid item xs = {4}>
                <Button onClick={ () => handleModal(true) } variant = 'contained' color = 'success' 
                    startIcon = { <AddIcon />} >
                        Agregar
                </Button>
                <Modal
                    open = { open }
                    onClose = { () => handleModal(false) }
                    ria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description" >
                        <Box sx = { styleModal }> 
                            <Grid container spacing = {2} >
                                <Grid item xs = {12}>
                                    <Typography id = 'modal-modal-title' variant = 'h6' component = 'h2' >
                                        Agregar Lenguaje
                                    </Typography>
                                </Grid>
                                <Grid item xs = {12}>
                                    <form onSubmit = { handleSubmit } >
                                        <FormGroup sx = {{ m: 2 }}>
                                            <Typography id = 'modal-modal-title' variant = 'h6' component = 'h2' >
                                                { error && <p> {error.message} </p>}
                                            </Typography>
                                            <FormControl sx={{ m: 1 }}>
                                                <InputLabel htmlFor = 'component-outlined' > Nombre </InputLabel>
                                                <OutlinedInput id = 'component-outlined' label = 'Nombre' autoComplete = 'off'
                                                    name = 'name' onChange = { handleChangeFormControl } />
                                            </FormControl>
                                            <FormControl sx={{ m: 1 }}>
                                                <InputLabel htmlFor = 'component-outlined'> Abreviatura </InputLabel>
                                                <OutlinedInput id = 'component-outlined' label = 'Abreviatura' autoComplete = 'off'
                                                    name = 'description' onChange = { handleChangeFormControl } />
                                            </FormControl>
                                            <FormControl sx={{ m: 1 }}>
                                                <Toaster richColors position = 'top-center' />
                                                <Button type = 'submit' variant = 'contained' color = 'success' >
                                                    Guardar
                                                </Button>
                                            </FormControl>
                                        </FormGroup>
                                    </form>
                                </Grid>
                            </Grid>
                        </Box>
                </Modal>
            </Grid>
        </Grid>
    )
}

export default FormLanguage;