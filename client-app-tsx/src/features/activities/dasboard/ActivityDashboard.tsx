import React, { SyntheticEvent } from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface IProps {
  activities: IActivity[];
  handleSelectActivity: (Id: string) => void;
  selectedActivity: IActivity | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
  handleEditActivity: (activity: IActivity) => void;
  handleCreateActivity: (activity: IActivity) => void;
  handleDeleteActivity: (
    e: SyntheticEvent<HTMLButtonElement>,
    Id: string
  ) => void;
  submitting: boolean;
  target: string;
}

const ActivityDashboard: React.FC<IProps> = ({
  activities,
  handleSelectActivity,
  selectedActivity,
  editMode,
  setEditMode,
  setSelectedActivity,
  handleEditActivity,
  handleCreateActivity,
  handleDeleteActivity,
  submitting,
  target
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          activities={activities}
          handleSelectActivity={handleSelectActivity}
          handleDeleteActivity={handleDeleteActivity}
          submitting={submitting}
          target={target}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            selectedActivity={selectedActivity}
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActivity}
          />
        )}
        {editMode && (
          <ActivityForm
            key={(selectedActivity && selectedActivity.Id) || 0}
            setEditMode={setEditMode}
            selectedActivity={selectedActivity}
            handleCreateActivity={handleCreateActivity}
            handleEditActivity={handleEditActivity}
            submitting={submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
