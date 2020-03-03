import React, { useState, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  selectedActivity: IActivity | null;
  handleEditActivity: (activity: IActivity) => void;
  handleCreateActivity: (activity: IActivity) => void;
  submitting: boolean;
}
const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  selectedActivity,
  handleEditActivity,
  handleCreateActivity,
  submitting
}) => {
  const initializeForm = () => {
    if (selectedActivity) return selectedActivity;
    else {
      return {
        Id: "",
        Title: "",
        Category: "",
        Description: "",
        Date: "",
        City: "",
        Venue: ""
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    if (activity.Id.length === 0) {
      let newActivity = {
        ...activity,
        Id: uuid()
      };
      handleCreateActivity(newActivity);
    } else {
      handleEditActivity(activity);
    }
  };
  return (
    <Segment clearing>
      <Form>
        <Form.Input
          placeholder="Title"
          name="Title"
          value={activity.Title}
          onChange={handleInputChange}
        />
        <Form.TextArea
          rows={2}
          placeholder="Description"
          name="Description"
          value={activity.Description}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          name="Category"
          value={activity.Category}
          onChange={handleInputChange}
        />
        <Form.Input
          type="datetime-local"
          placeholder="Date"
          name="Date"
          value={activity.Date}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="City"
          name="City"
          value={activity.City}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Venue"
          name="Venue"
          value={activity.Venue}
          onChange={handleInputChange}
        />
        <Button
          floated="right"
          loading={submitting}
          positive
          type="submit"
          content="Submit"
          onClick={() => handleSubmit()}
        />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={() => setEditMode(false)}
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
