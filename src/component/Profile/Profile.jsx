import React, { useState } from 'react';
import { ProfileNavigation } from './ProfileNavigation';
import { Route, Routes } from 'react-router-dom';
import { UserProfile } from './UserProfile';
import { Orders } from './Orders';
import { Address } from './Address';
import { Favorites } from './Favorites';
import { Events } from './Events';

export const Profile = () => {
  const [openSideBar] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="sticky top-0 h-[80vh] w-full lg:w-[20%]">
        <ProfileNavigation open={openSideBar} />
      </div>
      <div className="w-full lg:w-[80%]">
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/address" element={<Address />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </div>
    </div>
  );
};
