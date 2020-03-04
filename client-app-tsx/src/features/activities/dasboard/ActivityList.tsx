import React, { SyntheticEvent, useContext } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../app/stores/activityStore";
import { Link } from "react-router-dom";

const ActivityList = () => {
  const activityStore = useContext(ActivityStore);
  const {
    selectActivity,
    activitiesByDate,
    submitting,
    target,
    deleteActivity
  } = activityStore;
  return (
    <Segment>
      <Item.Group divided>
        {activitiesByDate.map(activity => (
          <Item key={activity.Id}>
            <Item.Content>
              <Item.Header as="a">{activity.Title}</Item.Header>
              <Item.Meta>{activity.Date}</Item.Meta>
              <Item.Description>
                <div>{activity.Description}</div>
                <div>
                  {activity.City}, {activity.Venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  floated="right"
                  content="View"
                  color="blue"
                  as={Link}
                  to={`/activities/${activity.Id}`}
                />
                <Button
                  floated="right"
                  content="Delete"
                  color="red"
                  name={activity.Id}
                  loading={target === activity.Id && submitting}
                  onClick={e => deleteActivity(e, activity.Id)}
                />
                <Label basic content={activity.Category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
