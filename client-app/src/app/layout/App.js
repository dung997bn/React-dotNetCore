import React, { useState, useEffect, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import Activities from '../api/agent';
import LoadingComponent from './LoadingComponent';

const App = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  useEffect(() => {
    Activities.list()
      .then(response => {
        let activities = [];
        response.forEach(activity => {
          activity.Date = activity.Date.split('.')[0];
          activities.push(activity);
        });
        setActivities(activities);
      })
      .then(() => setLoading(false));
  }, []);

  //function
  const handleSelectActivity = Id => {
    setSelectedActivity(activities.filter(a => a.Id === Id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };
  const handleCreateActivity = activity => {
    setSubmitting(true);
    Activities.create(activity)
      .then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleEditActivity = activity => {
    setSubmitting(true);
    Activities.update(activity)
      .then(() => {
        setActivities([
          ...activities.filter(a => a.Id !== activity.Id),
          activity
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleDeleteActivity = (e, Id) => {
    setSubmitting(true);
    setTarget(e.currentTarget.name);
    Activities.delete(Id)
      .then(() => {
        setActivities([...activities.filter(a => a.Id !== Id)]);
      })
      .then(() => setSubmitting(false));
  };

  if (loading) return <LoadingComponent content='Loading activity...' />;

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
          handleCreateActivity={handleCreateActivity}
          handleEditActivity={handleEditActivity}
          handleDeleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};

export default App;
