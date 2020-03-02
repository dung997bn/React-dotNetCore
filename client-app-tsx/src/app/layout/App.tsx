import React, { useState, useEffect } from 'react';
import './styles.css';
import { IActivity } from '../models/activity';
import axios from 'axios';
import NavBar from '../../features/nav/Navbar';

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    // axios
    //   .get<IActivity[]>('http://localhost:5000/api/activity')
    //   .then(response => {
    //     setActivities(response.data);
    //   });
  }, []);
  return (
    <div>
      <NavBar />
    </div>
  );
};

export default App;
