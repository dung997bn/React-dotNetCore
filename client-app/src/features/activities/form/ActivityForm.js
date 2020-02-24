import React, { useState } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
const ActivityForm = ({ setEditMode, selectedActivity }) => {
  const initializeForm = () => {
    if (selectedActivity) return selectedActivity;
    else
      return {
        Id: '',
        Title: '',
        Category: '',
        Description: '',
        Date: '',
        City: '',
        Venue: ''
      };
  };

  const [activity, setActivity] = useState(initializeForm());
  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder='Title' value={activity.Title} />
        <Form.Input
          rows={2}
          placeholder='Description'
          value={activity.Description}
        />
        <Form.Input placeholder='Category' value={activity.Category} />
        <Form.Input type='date' placeholder='Date' value={activity.Date} />
        <Form.Input placeholder='City' value={activity.City} />
        <Form.Input placeholder='Venue' value={activity.Venue} />
        <Button floated='right' positive type='submit' content='Submit' />
        <Button
          onClick={() => setEditMode(false)}
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
