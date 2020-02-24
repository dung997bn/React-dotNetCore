import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
const App = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activity').then(response => {
      setActivities(response.data);
    });
  }, []);

  //function
  const handleSelectActivity = Id => {
    setSelectedActivity(activities.filter(a => a.Id == Id)[0]);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  return (
    <Fragment>
      <NavBar handleOpenCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
        />
      </Container>
    </Fragment>
  );
};

export default App;
