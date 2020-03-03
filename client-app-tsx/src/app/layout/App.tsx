import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";
import "./styles.css";
import { IActivity } from "../models/activity";
import NavBar from "../../features/nav/Navbar";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../features/activities/dasboard/ActivityDashboard";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");

  const handleSelectActivity = (Id: string) => {
    setSelectedActivity(activities.filter(a => a.Id === Id)[0]);
    setEditMode(false);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity)
      .then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };
  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity)
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

  const handleDeleteActivity = (
    event: SyntheticEvent<HTMLButtonElement>,
    Id: string
  ) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(Id)
      .then(() => {
        setActivities([...activities.filter(a => a.Id !== Id)]);
      })
      .then(() => setSubmitting(false));
  };

  useEffect(() => {
    agent.Activities.list()
      .then(response => {
        let activities: IActivity[] = [];
        response.forEach((activity: IActivity) => {
          activity.Date = activity.Date.split(".")[0];
          activities.push(activity);
        });
        setActivities(activities);
      })
      .then(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingComponent content="Loading activities..." />;
  }
  return (
    <Fragment>
      <NavBar handleOpenCreateForm={handleOpenCreateForm} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          handleSelectActivity={handleSelectActivity}
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
