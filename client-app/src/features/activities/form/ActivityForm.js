import React, { useState } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { v4 as uuid } from "uuid";

const ActivityForm = ({
  setEditMode,
  selectedActivity,
  handleCreateActivity,
  handleEditActivity
}) => {
  const initializeForm = () => {
    if (selectedActivity) return selectedActivity;
    else
      return {
        Id: "",
        Title: "",
        Category: "",
        Description: "",
        Date: "",
        City: "",
        Venue: ""
      };
  };

  const [activity, setActivity] = useState(initializeForm());
  const handleInputChange = event => {
    const { name, value } = event.target;
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
      <Form onSubmit={() => handleSubmit()}>
        <Form.Input
          placeholder="Title"
          name="Title"
          value={activity.Title}
          onChange={handleInputChange}
        />
        <Form.Input
          rows={2}
          placeholder="Description"
          name="Description"
          onChange={handleInputChange}
          value={activity.Description}
        />
        <Form.Input
          placeholder="Category"
          value={activity.Category}
          name="Category"
          onChange={handleInputChange}
        />
        <Form.Input
          type="date"
          placeholder="Date"
          value={activity.Date}
          name="Date"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="City"
          value={activity.City}
          name="City"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Venue"
          value={activity.Venue}
          name="Venue"
          onChange={handleInputChange}
        />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
