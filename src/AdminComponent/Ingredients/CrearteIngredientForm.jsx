import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createIngredient, createIngredientCategory } from '../../component/State/Ingredients/Action';

export const CreateIngredientFrom = () => {
    const { restaurant, ingredients } = useSelector(store => store);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const [formData, setFormData] = useState({
        name: "", 
        categoryId: ""
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            restaurantId: restaurant.usersRestaurant.id
        };
        dispatch(createIngredient({data, jwt}));
        console.log(data)
        
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    return (
        <div className=''>
            <div className='p-5'>
                <h1 className='text-center text-xl pb-10'>
                    Create Ingredient Category
                </h1>
                <form
                    className='space-y-4'
                    onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        id='name'
                        name='name'
                        label="Ingredient Category"
                        variant='outlined'
                        onChange={handleInputChange}
                        value={formData.name}
                    ></TextField>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData.ingredientCategoryId}
                            label="Catgegory"
                            onChange={handleInputChange}
                            name='categoryId'
                        >
                            {ingredients.category.map((item)=><MenuItem value={item.id}>{item.name}</MenuItem>)}
                            
                        </Select>
                    </FormControl>

                    <Button variant='contained' type='submit'>
                        Create Ingredient
                    </Button>
                </form>
            </div>
        </div>
    )
}
