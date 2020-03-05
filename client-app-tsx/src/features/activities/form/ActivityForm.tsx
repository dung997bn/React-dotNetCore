import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

interface DetailParams {
  Id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    activity: selectedActivity,
    loadActivityDetail,
    clearActivity
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    Id: "",
    Title: "",
    Category: "",
    Description: "",
    Date: "",
    City: "",
    Venue: ""
  });

  useEffect(() => {
    if (match.params.Id && activity.Id.length === 0) {
      loadActivityDetail(match.params.Id).then(
        () => selectedActivity && setActivity(selectedActivity)
      );
    }

    return () => {
      clearActivity();
    };
  }, [
    loadActivityDetail,
    clearActivity,
    match.params.Id,
    selectedActivity,
    activity.Id.length
  ]);

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
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.Id}`)
      );
    } else {
      editActivity(activity).then(() =>
        history.push(`/activities/${activity.Id}`)
      );
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
          onClick={() => history.push("/activities")}
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
