import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const EventCard = () => {
  return (
    <div>
        <Card sx={{width:345}}>
            <CardMedia 

            sx={{height:345}}
            image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwyX3KI08MspqOSZgfV3dTCWRfcFbVCtnRvg&s'/>

            <CardContent>
                <Typography variant='h5'>
                    Indian Fast Food
                </Typography>
                <Typography variant='body2'>
                    50% off on your first order
                </Typography>
                <div className='py-2 space-y-2'>
                    <p>{"Nagercoil"}</p>
                    <p className='text-sm text-blue-500'>February 14, 2024 12:00 AM</p>
                    <p className='text-sm text-red-500'>February 19, 2024 12:00 AM</p>
                </div>
            </CardContent>

            {false && <CardActions>
                <IconButton>
                    <DeleteOutlineIcon/>
                </IconButton>
            </CardActions>}
        </Card>
    </div>
  )
}
