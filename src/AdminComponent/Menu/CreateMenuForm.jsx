import { Box, Button, Chip, CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import { uploadImageToCloudinary } from '../util/UploadToCloudaniry';
import { useDispatch, useSelector } from 'react-redux';
import { createMenuItem } from '../../component/State/Menu/MenuAction';
import { getIngredientsOfRestaurant } from '../../component/State/Ingredients/Action';


const initialValues = {
    name: "",
    description: "",
    price: "",
    category: "",
    restaurantId: "",
    vegetarian: true,
    seasonal: false,
    ingredients: [],
    images: [],
};

export const CreateMenuForm = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant, ingredients } = useSelector((store) => store);
    const [uploadImage, setUploadImage] = useState(false);

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            values.restaurantId = 2;
            dispatch(createMenuItem({ menu: values, jwt }));
            console.log("data ---", values)
        },
    });

    const handleImageChange = async (e) => {
        const file = e.target.files[0]
        setUploadImage(true)
        const image = await uploadImageToCloudinary(file)
        formik.setFieldValue("images", [...formik.values.images, image])
        setUploadImage(false)
    };

    const handleRemoveImage = (index) => {
        const updatedImage = [...formik.values.images]
        updatedImage.splice(index, 1)
        formik.setFieldValue("images", updatedImage)
    };

    useEffect(() => {
            dispatch(getIngredientsOfRestaurant({
                jwt,
                id: restaurant.usersRestaurant.id
            }));
        }, []);
    return (
        <div className='py-10 px-5 lg:flex items-center justify-center min-h-screen'>
            <div className='lg:max-w-4xl'>
                <h1 className='font-bold text-2xl text-center py-2'>
                    Add New Menu Items
                </h1>

                <form onSubmit={formik.handleSubmit} className='space-y-4'>

                    {/* Upload Section */}
                    <Grid container spacing={2}>
                        <Grid item>
                            <input
                                accept='image/*'
                                id='fileInput'
                                style={{ display: "none" }}
                                onChange={handleImageChange}
                                type="file"
                            />
                            <label className='relative block' htmlFor="fileInput">
                                <span className='w-24 h-24 cursor-pointer flex 
                  items-center justify-center p-3 border rounded-md
                  border-gray-600'>
                                    <AddPhotoAlternateIcon className='text-white' />
                                </span>
                                {uploadImage && (
                                    <div className='absolute left-0 right-0 top-0 bottom-0 
                    w-24 h-24 flex justify-center items-center bg-black/50'>
                                        <CircularProgress />
                                    </div>
                                )}
                            </label>
                        </Grid>

                        {formik.values.images.map((image, index) => (
                            <Grid item key={index}>
                                <div className='relative'>
                                    <img
                                        className='w-24 h-24 object-cover'
                                        key={index}
                                        src={image}
                                        alt=""
                                    />
                                    <IconButton
                                        size='small'
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            outline: 'none',
                                        }}
                                        onClick={() => handleRemoveImage(index)}>
                                        <CloseIcon sx={{ fontSize: "1rem" }} />
                                    </IconButton>
                                </div>
                            </Grid>
                        ))}
                    </Grid>

                    {/* All Text Fields in ONE Grid Item */}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id='name'
                                name='name'
                                label="Name"
                                variant='outlined'
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id='description'
                                name='description'
                                label="Description"
                                variant='outlined'
                                onChange={formik.handleChange}
                                value={formik.values.description}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id='price'
                                name='price'
                                label="Price"
                                variant='outlined'
                                onChange={formik.handleChange}
                                value={formik.values.price}
                            />
                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <FormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formik.values.category}
                                    label="Catgegory"
                                    onChange={formik.handleChange}
                                    name='category'
                                >
                                    {restaurant.categories?.map((item) =>
                                        <MenuItem value={item}>{item.name}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel id="demo-multiple-chip-label">Ingredients</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    name='ingredients'
                                    multiple
                                    value={formik.values.ingredients}
                                    onChange={formik.handleChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Ingredients" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value.id} label={value.name} />
                                            ))}
                                        </Box>
                                    )}
                                // MenuProps={MenuProps}
                                >
                                    {ingredients.ingredients?.map((item, index) => (
                                        <MenuItem
                                            key={item.id}
                                            value={item}
                                        >
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <FormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel id="demo-simple-select-label">Is Seasional</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="seasonal"
                                    value={formik.values.seasonal}
                                    label="Is Seasional"
                                    onChange={formik.handleChange}
                                    name='seasonal'
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <FormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel id="demo-simple-select-label">Is Vegetarian</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="vegetarian"
                                    value={formik.values.vegetarian}
                                    label="Is Vegetarian"
                                    onChange={formik.handleChange}
                                    name='vegetarian'
                                >
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid>
                    <Button variant='contained' type='submit'>
                        Create Menu
                    </Button>
                </form>
            </div>
        </div>
    );
};
