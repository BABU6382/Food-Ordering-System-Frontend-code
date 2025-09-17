import React from 'react'
import { CreateRestaurantForm } from '../AdminComponent/CreateRestaurantForm'
import { Admin } from '../AdminComponent/Admin/Admin'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const AdminRoute = () => {
  const { restaurant } = useSelector(store => store)
  return (
    <div>
      <Routes>
        <Route
          path='/*'
          element={
            !restaurant.usersRestaurant ? <CreateRestaurantForm /> : <Admin />}>

        </Route>
      </Routes>
    </div>
  )
}
