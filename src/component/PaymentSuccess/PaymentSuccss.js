import React from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { green } from '@mui/material/colors';
import { Button, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const PaymentSuccss = () => {
    const navigate = useNavigate();
  return (
    <div className='min-h-screen px-5'>
        <div className='flex flex-col items-center justify-center
           h-[90vh]'>
            <Card className='box w-full lg:w-1/4 flex flex-col 
              items-center rounded-md p-5'>
                <TaskAltIcon sx={{fontSize:"5rem", color:green[500] }}/>
                <h1 className='py-5 text-2xl font-semibold'>
                    Order Success
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMqAp387NbJ47Pftq6ixRmjToiF19EQs5KOQ&s'/>
                </h1>
                <p className='py-3 text-center'>Thank you for choosing our restaurant..</p>
                <p className='py-2 text-center text-lg'>
                    Have a great Day..
                </p>
                <Button onClick={()=>navigate("/")} variant='contained' className='py-5' sx={{margin:"1rem 0rem"}}>
                    Go to Home
                </Button>
            </Card>
        </div>
    </div>
  );
}
