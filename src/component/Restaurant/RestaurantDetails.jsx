import { Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MenuCard from './MenuCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById, getRestaurantsCategory } from '../State/Restaurant/action';
import { getMenuItemsByRestaurantId } from '../State/Menu/MenuAction';

const foodTypes = [
  { label: 'All', value: 'all' },
  { label: 'Vegetarian', value: 'vegetarian' },
  { label: 'Non‑Vegetarian', value: 'non_veg' },
  { label: 'Seasonal', value: 'seasonal' },
];

const RestaurantDetails = () => {
  const [foodType, setFoodType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');

  const { restaurant, menu } = useSelector(store => store);
  const { id, city } = useParams();

  const handleFilter = (e) => {
    setFoodType(e.target.value);
  };

  const handleFilterCategory = (e, value) => {
    setSelectedCategory(value);
  };

  useEffect(() => {
    dispatch(getRestaurantById({ jwt, restaurantId: id }));
    dispatch(getRestaurantsCategory({ jwt, restaurantId: id }));
  }, [dispatch, jwt, id]);

  useEffect(() => {
    dispatch(getMenuItemsByRestaurantId({
      jwt,
      restaurantId: id,
      vegetarian: foodType === 'vegetarian',
      nonveg: foodType === 'non_vegetarian',
      seasonal: foodType === 'seasonal',
      foodCategory: selectedCategory,
    }));
  }, [dispatch, jwt, id, foodType, selectedCategory]);

  return (
    <div className="px-5 lg:px-20">
      <section>
        <Grid container spacing={2}>
          {[0, 1, 2].map(idx => (
            <Grid item xs={12} lg={idx === 0 ? 12 : 6} key={idx}>
              <img
                className="w-full h-[40vh] object-cover"
                src={restaurant.restaurant?.images?.[idx] || ''}
                alt=""
              />
            </Grid>
          ))}
        </Grid>

        <div className="pt-10 pb-5">
          <Typography variant="h3">{restaurant.restaurant?.name ?? 'Loading…'}</Typography>
          <Typography variant="body1" className="mt-1">
            {restaurant.restaurant?.description ?? ''}
          </Typography>
          <div className="space-y-3 mt-3">
            <Typography component="p" className="flex items-center gap-3">
              <PlaceIcon />
              <span>
                {[
                  restaurant.restaurant?.address?.street,
                  restaurant.restaurant?.address?.city,
                  restaurant.restaurant?.address?.state,
                  restaurant.restaurant?.address?.country,
                ].filter(Boolean).join(', ')}
                {restaurant.restaurant?.address?.zipCode ? ` - ${restaurant.restaurant.address.zipCode}` : ''}
              </span>
            </Typography>
            <Typography component="p" className="flex items-center gap-3">
              <CalendarMonthIcon />
              <span>{restaurant.restaurant?.openingHours}</span>
            </Typography>
          </div>
        </div>
      </section>

      <Divider />

      <section className="pt-[2rem] lg:flex relative">
        <div className="space-y-10 lg:w-[20%] filter">
          <div className="box space-y-5 lg:sticky top-28">
            <div>
              <Typography variant="h5" sx={{ paddingBottom: '1rem' }}>Food Type</Typography>
              <FormControl component="fieldset">
                <RadioGroup name="food_type" value={foodType} onChange={handleFilter}>
                  {foodTypes.map(item => (
                    <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
            <Divider />
            <div>
              <Typography variant="h5" sx={{ paddingBottom: '1rem' }}>Food Category</Typography>
              <FormControl component="fieldset">
                <RadioGroup name="food_category" value={selectedCategory} onChange={handleFilterCategory}>
                  {restaurant.categories?.map(item => (
                    <FormControlLabel key={item.name} value={item.name} control={<Radio />} label={item.name} />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>

        <div className="space-y-5 lg:w-[80%] lg:pl-10">
          {menu.menuItems?.length ? (
            menu.menuItems.map(item => <MenuCard key={item.id} item={item} />)
          ) : (
            <Typography>No menu items available.</Typography>
          )}
        </div>
      </section>
    </div>
  );
};

export default RestaurantDetails;
