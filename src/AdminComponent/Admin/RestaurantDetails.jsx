import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'
import React from 'react'

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useDispatch, useSelector } from 'react-redux';
import { updateRestaurantStatus } from '../../component/State/Restaurant/action';

export const RestaurantDetails = () => {
  const { restaurant } = useSelector(store => store);
  const dispatch = useDispatch();

  const handleRestaurantStatus = () => {
    dispatch(updateRestaurantStatus({
      restaurantId: restaurant.usersRestaurant.id,
      jwt: localStorage.getItem("jwt")
    }))
  };
  return (
    <div className="lg:px-20 px-5 pb-10">
      <div className='py-5 flex justify-center items-center gap-5'>

        <h1 className='text-2xl lg:text-7xl text-center font-bold p-5'>
          {restaurant.usersRestaurant?.name}
        </h1>

        <div>
          <Button color={!restaurant.usersRestaurant?.open ? "primary" : "error"}
            className='py-[1rem] px=[2rem]'
            variant='contained'
            onClick={handleRestaurantStatus}
            size='large'
          >
            {restaurant.usersRestaurant?.open ? "close" : "open"}
          </Button>
        </div>

      </div>


      <Grid container spacing={2} >
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<span>Restaurant</span>} />
            <CardContent>
              <div className='space-y-4'>
                <div className='flex'>
                  <p className='w-48'>Owner</p>
                  <p className=''>
                    <span className='pr-20 '>-</span>
                    {restaurant.usersRestaurant?.owner.fullName}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Restaurant Name</p>
                  <p className=''>
                    <span className='pr-20 '>-</span>
                    {restaurant.usersRestaurant?.name}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Cuisine Type</p>
                  <p className=''>
                    <span className='pr-20 '>-</span>
                    {restaurant.usersRestaurant?.cuisineType}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Opening Hours</p>
                  <p className=''>
                    <span className='pr-20 '>-</span>
                    {restaurant.usersRestaurant?.openingHours}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Status</p>
                  <p className=''>
                    <span className='pr-20 '>-</span>
                    {restaurant.usersRestaurant?.open ? <span className='px-5 py-2 rounded-full bg-green-400'>
                      Open
                    </span> : <span className='px-5 py-2 rounded-full bg-red-500'>
                      Closed
                    </span>}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title={<span>Address</span>} />
            <CardContent>
              <div className='space-y-4'>
                <div className='flex'>
                  <p className='w-48'>Country</p>
                  <p className=''>
                    <span className='pr-20'>-</span>
                    {restaurant.usersRestaurant?.address?.country }
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>City</p>
                  <p className=''>
                    <span className='pr-20'>-</span>
                    {restaurant.usersRestaurant?.address?.city}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>State</p>
                  <p className=''>
                    <span className='pr-20'>-</span>
                    {restaurant.usersRestaurant?.address?.state}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Pin Code</p>
                  <p className=''>
                    <span className='pr-20'>-</span>
                    {restaurant.usersRestaurant?.address?.zipCode}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Street Address</p>
                  <p className=''>
                    <span className='pr-20'>-</span>
                    {restaurant.usersRestaurant?.address?.street}
                  </p>
                </div>

              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title={<span>Contact</span>} />
            <CardContent>
              <div className='space-y-4'>
                <div className='flex'>
                  <p className='w-48'>Email</p>
                  <p className=''>
                    <span className='pr-20 '>-</span>
                    {restaurant.usersRestaurant?.contactInformation?.email}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Mobile</p>
                  <p className=''>
                    <span className='pr-20 '>-</span>
                    {restaurant.usersRestaurant?.contactInformation?.mobile}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Social</p>
                  <div className='flex items-center pb-3 gap-5'>
                    <span className='pr-5'>-</span>
                    <a href={restaurant.usersRestaurant?.contactInformation?.instagram}>
                      <InstagramIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a href={restaurant.usersRestaurant?.contactInformation?.twitter}>
                      <TwitterIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a href="https://www.facebook.com/soyalbabu.soyalbabu/">
                      <FacebookIcon sx={{ fontSize: "3rem" }} />
                    </a>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

    </div>
  )
}
