import React from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';

const ActivityList = ({ activities, selectActivity, handleDeleteActivity }) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities &&
          activities.map(activity => (
            <Item key={activity.Id}>
              <Item.Content>
                <Item.Header as='a'>{activity.Title}</Item.Header>
                <Item.Meta>{activity.Date}</Item.Meta>
                <Item.Description>
                  <div>{activity.Description}</div>
                  <div>
                    {activity.City}, {activity.Venue}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    onClick={() => {
                      selectActivity(activity.Id);
                    }}
                    floated='right'
                    content='View'
                    color='blue'
                  />
                  <Button
                    onClick={() => {
                      handleDeleteActivity(activity.Id);
                    }}
                    floated='right'
                    content='Delete'
                    color='red'
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
