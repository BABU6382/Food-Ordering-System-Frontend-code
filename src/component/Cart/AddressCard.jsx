import { Button, Card } from '@mui/material';
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';

export const AddressCard = ({item,showButton,handleSelectAddress}) => {
   
  return (
    <Card className="flex gap-5 w-64 p-5">
        <HomeIcon/>
        <div className='space-y-3'>
            <h1 className='font-semibold text-lg'>Home</h1>
            <p>
                Nager coil, Kanniya kumari, Tamil Nadu, 629156
            </p>
           {showButton && (
            <Button variant='outlined' fullWidth 
            onClick={()=> handleSelectAddress(item)}>select</Button>)}
        </div>
    </Card>
  )
}
