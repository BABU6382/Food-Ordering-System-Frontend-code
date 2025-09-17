import { Box, Button, Grid, Modal, TextField } from '@mui/material';
import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { createEventAction } from '../../component/State/Restaurant/action';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const Events = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant } = useSelector(store => store);

  const [formvalues, setFormValues] = React.useState({
    image: "",
    location: "",
    name: "",
    startedAt: dayjs(),   // Initialized as a Day.js object
    endsAt: dayjs(),      // Initialized as a Day.js object
  });

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("submit", formvalues);
    dispatch(createEventAction({
      data: formvalues,
      restaurantId: restaurant.usersRestaurant?.id,
      jwt
    }));
  };

  const handleFormChange = (e) => {
    setFormValues({ ...formvalues, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, dateType) => {
    setFormValues({ ...formvalues, [dateType]: date }); // Store the Day.js object
  };

  return (
    <div>
      <div className='p-5'>
        <Button onClick={handleOpen} variant='contained'>
          Create New Event
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Image, Location, Name fields */}
                <Grid item xs={12} >
                  <TextField
                    name='image'
                    label="Image URL"
                    variant='outlined'
                    fullWidth
                    value={formvalues.image}
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name='location'
                    label="Location"
                    variant='outlined'
                    fullWidth
                    value={formvalues.location}
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name='name'
                    label="Event Name"
                    variant='outlined'
                    fullWidth
                    value={formvalues.name}
                    onChange={handleFormChange}
                  />
                </Grid>

                {/* Start DateTimePicker */}
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="Start Date and Time"
                      value={formvalues.startedAt}
                      onChange={(newValue) => handleDateChange(newValue, "startedAt")}
                      inputFormat="MM/dd/yyyy hh:mm a"
                      className='w-full'
                      sx={{ width: "100%" }}
                    />
                  </LocalizationProvider>
                </Grid>

                {/* End DateTimePicker */}
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="End Date and Time"
                      value={formvalues.endsAt}
                      onChange={(newValue) => handleDateChange(newValue, "endsAt")}
                      inputFormat="MM/dd/yyyy hh:mm a"
                      className='w-full'
                      sx={{ width: "100%" }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                  >
                    Submit Event
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};
