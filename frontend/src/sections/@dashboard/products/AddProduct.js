import PropTypes from 'prop-types'; import { useState } from 'react';

// @mui

import { Link, Stack, Select, FormHelperText, MenuItem, CircularProgress, InputLabel, IconButton, InputAdornment, TextField, Input, Checkbox, Box, Card, Typography, Modal } from '@mui/material';
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

export default function AddProduct({ open, onPopUpClose, loading, onSubmit }) {

    const [selectedBrand, setSelectedBrand] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [formError, setFormError] = useState(false);

    const handleClick = (event) => {

        event.preventDefault(); setFormError(false);

        const formElement = document.querySelector('#loginForm');
        const formData = new FormData(formElement);
        console.log(formData);
        const formDataJSON = Object.fromEntries(formData);
        console.log(formDataJSON);
        if (formDataJSON.brandId === '0' || formDataJSON.categoryId === '0') {
            setFormError(true);
            return false;
        } return true
        // onSubmit(formDataJSON)
    };

    // console.log('addProduct', props);
    // const { open } = props;
    const handleClose = () => {
        onPopUpClose()
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"


        >
            <Box sx={style} >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <h2 style={{ marginLeft: '10px' }}>Add Product</h2>
                    <IconButton onClick={handleClose}>
                        X
                    </IconButton>
                </Stack>
                <form id='loginForm' onSubmit={handleClick} >

                    <Stack spacing={3}>
                        <TextField name="productName" label="Product Name" required />
                        <TextField name="description" label="Descripion" />
                        <TextField type='number' name="price" label="Price" required />

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name='brandId'
                            value={selectedBrand}
                            label="Age"
                            onChange={(event) => setSelectedBrand(event.target.value)}
                        >
                            <MenuItem value={0}>--- Select Brand ---</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name='categoryId'

                            value={selectedCategory}
                            label="asdad"
                            onChange={(event) => setSelectedCategory(event.target.value)}
                        >                            <MenuItem value={0}>--- Select Category ---</MenuItem>

                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <TextField type='file' name="imageUrl" label="image" />
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
                                    Add Product
                                </LoadingButton>
                            )}
                        </Stack>


                    </Stack>
                </form>
            </Box>
        </Modal>
    );
}
