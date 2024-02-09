import PropTypes from 'prop-types'; import { useState, useEffect } from 'react';

// @mui

import { Link, Stack, Select, FormHelperText, Avatar, MenuItem, CircularProgress, InputLabel, IconButton, InputAdornment, TextField, Input, Checkbox, Box, Card, Typography, Modal } from '@mui/material';
import { styled } from '@mui/material/styles';

// utils
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';

// components

// ----------------------------------------------------------------------
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

// ----------------------------------------------------------------------

// ShopProductCard.propTypes = {
//     product: PropTypes.object,
// };

export default function AddBrand({ open, onPopUpClose, loading, onSubmit, initialValues }) {
    console.log(initialValues)
    const [formData, setFormData] = useState(() => initialValues);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        console.log("indsude")
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
    };
    const [selectedBrand, setSelectedBrand] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [formError, setFormError] = useState(false);
    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleClick = (event) => {

        event.preventDefault(); setFormError(false);

        console.log(formData);
        if (formData.name === '' || formData.description === '') {
            setFormError(true);
            return false;
        }
        onSubmit(formData)
        return true;
    };

    // console.log('addProduct', props);
    // const { open } = props;
    const handleClose = () => {
        setSelectedImage(null)
        onPopUpClose()
    }
    useEffect(() => {
        setFormData(initialValues)
    }, [initialValues])
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"


        >
            <Box sx={style} >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <h2 style={{ marginLeft: '10px' }}>Add Brand</h2>
                    <IconButton onClick={handleClose}>
                        X
                    </IconButton>
                </Stack>
                <form id='loginForm' onSubmit={handleClick} >

                    <Stack spacing={3}>
                        <TextField
                            type="hidden"
                            name="id"
                            value={formData.id}
                        />

                        <TextField name="name" label="Brand Name" value={formData.name} onChange={handleFormChange} required />
                        <TextField name="description" label="Description" value={formData.description} onChange={handleFormChange} />

                        <TextField type='file' name="imageUrl" accept="image/*" onChange={handleImageChange} />
                        <Stack alignItems="center" justifyContent="center">
                            <Avatar style={{
                                width: 200,
                                height: 200, borderRadius: 1, // Adjust the border radius value as needed

                            }}
                                alt={formData.imageurl} src={selectedImage || formData.imageUrl} />
                        </Stack>

                        {formError && (
                            <FormHelperText error>
                                This field is required.
                            </FormHelperText>
                        )}

                        <Stack alignItems="center" spacing={2}>
                            {loading ? (
                                <Stack alignItems="center" justifyContent="center">
                                    <CircularProgress />
                                </Stack>
                            ) : (
                                <LoadingButton fullWidth size="large" type="submit" variant="contained">
                                    Add Brand
                                </LoadingButton>
                            )}
                        </Stack>


                    </Stack>
                </form>
            </Box>
        </Modal>
    );
}
