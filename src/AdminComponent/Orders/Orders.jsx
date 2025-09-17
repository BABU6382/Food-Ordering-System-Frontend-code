import { Label } from '@headlessui/react';
import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useState } from 'react'
import OrderTable from './OrderTable';

const orderStatus = [
  {Label:"Pendding", value:"PANDING"},
  {Label:"Completed", value:"COMPLETED"},
  {Label:"All", value:"ALL"},
]

export const Orders = () => {
  const [filterValue,setFilterValue] = useState(); 
  const handleFilter = (e,value) => {
    setFilterValue(value);
  }

  return (
    <div className='px-2'>
        <Card className='p-5'>
          <Typography sx={{paddingBottom:"1rem"}} variant='h5'>
            Order Status
          </Typography>

          <FormControl>
            <RadioGroup onChange={handleFilter} 
            row name='category' 
            value={filterValue || "all"}
            >
              {orderStatus.map((item)=><FormControlLabel
              key={item.Label}
              value={item.value}
              control={<Radio/>}
              label={item.Label}
              />)}
            </RadioGroup>
          </FormControl>
        </Card>
        <OrderTable/>
    </div>
  )
}
