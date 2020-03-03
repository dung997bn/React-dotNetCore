import React, { SyntheticEvent } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";

interface IProps {
  activities: IActivity[];
  handleSelectActivity: (Id: string) => void;
  handleDeleteActivity: (
    e: SyntheticEvent<HTMLButtonElement>,
    Id: string
  ) => void;
  submitting: boolean;
  target: string;
}
const ActivityList: React.FC<IProps> = ({
  activities,
  handleSelectActivity,
  handleDeleteActivity,
  submitting,
  target
}) => {
  return (
    <Segment>
      <Item.Group divided>
        {activities.map(activity => (
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
                  onClick={() => handleSelectActivity(activity.Id)}
                />
                <Button
                  floated="right"
                  content="Delete"
                  color="red"
                  name={activity.Id}
                  loading={target === activity.Id && submitting}
                  onClick={e => handleDeleteActivity(e, activity.Id)}
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

export default ActivityList;
