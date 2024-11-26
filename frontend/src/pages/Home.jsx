import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import axios from 'axios';

export const Home = ({mail,name,photo}) => {
  return (
    <div>
      <Navbar loc="Home" name={name} photo={photo} />
    </div>
  );
};
