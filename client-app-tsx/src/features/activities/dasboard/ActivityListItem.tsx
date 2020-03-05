import React, { useContext } from "react";
import { Item, Button, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IActivity } from "../../../app/models/activity";

interface IProps {
  activity: IActivity;
}
const ActivityListItem: React.FC<IProps> = ({ activity }) => {
  return (
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
          <Label basic content={activity.Category} />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default ActivityListItem;
