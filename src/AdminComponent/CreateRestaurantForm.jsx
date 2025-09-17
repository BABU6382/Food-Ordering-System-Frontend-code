import { Button, CircularProgress, Grid, IconButton, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import { uploadImageToCloudinary } from './util/UploadToCloudaniry';
import { useDispatch } from 'react-redux';
import { createRestaurant } from '../component/State/Restaurant/action';
import { useNavigate } from 'react-router-dom';
import { logout } from '../component/State/Authentication/Action';

const initialValues = {
  name: "",
  description: "",
  cuisineType: "",
  streetAddress: "",
  city: "",
  stateProvince: "",
  postalCode: "",
  country: "",
  email: "",
  mobile: "",
  twitter: "",
  instagram: "",
  openingHours: "Mon-Sun : 9:00 AM - 9:00 PM",
  images: []
}

export const CreateRestaurantForm = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt")

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const data = {
        name: values.name,
        description: values.description,
        cuisineType: values.cuisineType,
        address: {
          streetAddress: values.street,
          city: values.city,
          stateProvince: values.state,
          postalCode: values.zipCode,
          country: values.country
        },
        contactInformation: {
          email: values.email,
          mobile: values.mobile,
          twitter: values.twitter,
          instagram: values.instagram,
        },
        openingHours: values.openingHours,
        images: values.images
      };
      console.log("data ---", data)

      dispatch(createRestaurant({ data, token: jwt }))
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

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className='py-10 px-5 lg:flex items-center justify-center min-h-screen'>
      <div className='lg:max-w-4xl'>
        <h1 className='font-bold text-2xl text-center py-2'>
          Add New Restaurant
        </h1>
        

        <form onSubmit={formik.handleSubmit} className='space-y-4'>

        
          <Button onClick={handleLogout} variant='contained' >
            Go login first
          </Button>
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
                id='cuisineType'
                name='cuisineType'
                label="Cuisine Type"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.cuisineType}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='openingHours'
                name='openingHours'
                label="Opening Hours"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.openingHours}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='streetAddress'
                name='streetAddress'
                label="Street Address"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.street}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='city'
                name='city'
                label="City"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.city}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                fullWidth
                id='stateProvince'
                name='stateProvince'
                label="State Province"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.state}
              /></Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='postalCode'
                name='postalCode'
                label="Postal Code"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.zipCode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='country'
                name='country'
                label="Country"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.country}
              />
            </Grid>
            <Grid item xs={12}><TextField
              fullWidth
              id='email'
              name='email'
              label="E-mail"
              variant='outlined'
              onChange={formik.handleChange}
              value={formik.values.email}
            /></Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='mobile'
                name='mobile'
                label="Mobile"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.mobile}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='instagram'
                name='instagram'
                label="Instagram"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.instagram}
              /></Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='twitter'
                name='twitter'
                label="Twitter"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.twitter}
              />
            </Grid>
          </Grid>
          
          <Button variant='contained' type='submit'>
            Create Restaurant
          </Button>
        </form>
      </div>
    </div>
  );
};
