import { Avatar, Badge, Box, IconButton } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import './Navbar.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Navbar = () => {
    const { auth,cart } = useSelector(store => store);
    const Navigate = useNavigate();

    const handleAvatarClick = () => {
        if(auth.user?.role==="ROLE_CUSTOMER"){
            Navigate("/my-profile")
        }
        else {
            Navigate("/admin/restaurants")
        }
    }

  return (
    <Box className='px-5 sticky top-0 z-50 py-[.8rem bg-[] lg:px-20 flex
       justify-between'>

            <div className='lg:mr-10 cursor-pointer flex items-center
             space-x-4'>
                <li onClick={()=>Navigate("/")} className='logo font-semibold text-white text-2xl'>
                    Babu Food
                </li>

            </div>
            <div className='flex items-center space-x-2 lg:space-x-10'>

                <div className=''>
                    <IconButton>
                       <SearchIcon sx={{fontSize:"1.5rem"}}/>
                    </IconButton>
                </div>
                <div className=''>
                    {auth.user ? 
                    <Avatar onClick={handleAvatarClick} 
                    sx={{bgcolor:"white", cursor:"pointer" }} >
                        {auth.user?.fullName[0].toUpperCase()}
                    </Avatar>: 
                    <IconButton onClick={()=>Navigate("/account/login")}>
                        <PersonIcon/>
                    </IconButton>
                    }
                </div>

                <div className=''>
                    <IconButton onClick={()=>Navigate("/cart")}>
                    <Badge color='black' badgeContent={cart.cart?.items.length}>
                        <ShoppingCartIcon sx={{fontSize:"1.5rem"}} />
                    </Badge>    
                </IconButton>
                </div>
                

            </div>


    </Box>
  )
}
