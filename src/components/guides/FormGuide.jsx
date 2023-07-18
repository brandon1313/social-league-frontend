import { Box, Button, FormControl, FormGroup, Grid, InputLabel, Modal, OutlinedInput, Typography, Select, MenuItem } from "@mui/material";
import { Toaster, toast } from "sonner";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import { saveGuideAsync } from "../../features/guideSlice";
import { useEffect } from "react";
import Chip from '@mui/material/Chip';
const API_URL = 'http://localhost:8080/api/languages';

const FormGuide = () => {

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const { styleModal } = useSelector(state => state.menu);
    const { guideForm } = useSelector(state => state.guides);
    const { selectedGuide } = useSelector(state => state.guides);
    const [languages, setLanguages] = useState([])
    const [open, setOpen] = useState(false);
    const [guide, setGuide] = useState(guideForm);
    const [error, setError] = useState(null);
    const [languageList, setLanguageList] = useState([])
    const [selectedLanguage, setSelectedLanguage] = useState(0)
    const dispatch = useDispatch();


    useEffect(() => {
        getLanguages()
    }, [])

    useEffect(() => {
            if(selectedGuide?.name){
                setGuide(selectedGuide)
                setLanguages(selectedGuide.languages)
            }else
                return

            handleModal(true)
    }, [selectedGuide])

    const getLanguages = async () => {
        const response = await fetch(API_URL)
        const json = await response.json()
        setLanguageList(json.body)
    }

    const handleModal = (status) => {
        setOpen(status);
    };

    const handleChangeFormControl = ({ target: { name, value } }) => {
        setGuide({
            ...guide,
            [name]: value
        });
    };


    const handleAddLang = (e) => {
        const { target: { value } } = e
        console.log(value)
        setLanguages(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(saveGuideAsync({ ...guide, languages}));
        notification("Se almacenaron los datos", "ok");
    };

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
        <Grid container spacing={4} >
            <Grid item xs={8} >
                <Typography variant='h4' component='div'
                    sx={{
                        mr: 2,
                        display: { xs: 'flex' },
                        fontFamily: 'monospace',
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none'
                    }} >
                    Guias
                </Typography>
            </Grid>
            <Grid item xs={4} >
                <Button onClick={() => handleModal(true)} variant='contained' color='success'
                    startIcon={<AddIcon />} >
                    Agregar
                </Button>
                <Modal
                    open={open}
                    onClose={() => handleModal(false)}
                    ria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description" >
                    <Box sx={styleModal} >
                        <Grid container spacing={2} >
                            <Grid item xs={12} >
                                <Typography id='modal-modal-title' variant='h6' component='h2' >
                                    Agregar Guia
                                </Typography>
                            </Grid>
                            <Grid item xs={12} >
                                <form onSubmit={handleSubmit} >
                                    <FormGroup sx={{ m: 2 }} >
                                        <Typography id='modal-modal-title' variant='h6' component='h2' >
                                            {error && <p> {error.message} </p>}
                                        </Typography>
                                        <FormControl sx={{ m: 1 }} >
                                            <InputLabel htmlFor='component-outlined'> Nombre </InputLabel>
                                            <OutlinedInput id='component-outlined' label='Nombre' autoComplete='off'
                                                value={guide.name} name='name' onChange={handleChangeFormControl} />
                                        </FormControl>
                                        <FormControl sx={{ m: 1 }} >
                                            <InputLabel htmlFor='component-outlined'> Apellido </InputLabel>
                                            <OutlinedInput id='component-outlined' label='Apellido' autoComplete='off'
                                               value={guide.lastName} name='lastName' onChange={handleChangeFormControl} />
                                        </FormControl>
                                        <FormControl sx={{ m: 1 }} >
                                            <InputLabel htmlFor='component-outlined'> CUI </InputLabel>
                                            <OutlinedInput id='component-outlined' label='CUI' autoComplete='off'
                                                value={guide.cui} name='cui' onChange={handleChangeFormControl} />
                                        </FormControl>
                                        <FormControl sx={{ m: 1 }} >
                                            <InputLabel htmlFor='component-outlined'> Celular </InputLabel>
                                            <OutlinedInput id='component-outlined' label='Celular' autoComplete='off'
                                                value={guide.phone} name='phone' onChange={handleChangeFormControl} />
                                        </FormControl>
                                        <FormControl sx={{ m: 1 }} >
                                            <InputLabel htmlFor='component-outlined'> Foto </InputLabel>
                                            <OutlinedInput id='component-outlined' label='Photo' autoComplete='off'
                                                value={guide.avatarUrl} name='avatarUrl' onChange={handleChangeFormControl} />
                                        </FormControl>
                                        <FormControl sx={{ m: 1 }} >
                                            <Select
                                                value={languages}
                                                label="Idiomas"
                                                multiple
                                                onChange={handleAddLang}
                                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                                renderValue={(selected) => (
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                        {selected.map((value) => (
                                                            <Chip key={value} label={value.name} />
                                                        ))}
                                                    </Box>
                                                )}
                                                MenuProps={MenuProps}
                                            >
                                                {
                                                    languageList.map((language, idx) => {
                                                        return <MenuItem key={idx} value={language}>{language.description}</MenuItem>
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                        <FormControl sx={{ m: 1 }} >
                                            <Toaster richColors position='top-center' />
                                            <Button type='submit' variant='contained' color='success' >
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
    );
}

export default FormGuide;