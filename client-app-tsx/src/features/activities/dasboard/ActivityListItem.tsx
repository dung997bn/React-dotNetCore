import React from 'react';
import { Item, Button, Segment, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IActivity } from '../../../app/models/activity';
import ActivityListItemAttendees from './ActivityListItemAttendees';

interface IProps {
  activity: IActivity;
}
const ActivityListItem: React.FC<IProps> = ({ activity }) => {
  const host = activity.UserActivities.filter((x) => x.IsHost)[0];
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size='tiny'
              circular
              src={host.Image || '/assets/user.png'}
              style={{ marginBottom: 3 }}
            />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.Id}`}>
                {activity.Title}
              </Item.Header>
              <Item.Description>
                Hosted by{' '}
                <Link to={`/profile/${host.UserName}`}>
                  {' '}
                  {host.DisplayName}
                </Link>{' '}
              </Item.Description>
              {activity.IsHost && (
                <Item.Description>
                  <Label
                    basic
                    color='orange'
                    content='You are hosting this activity'
                  />
                </Item.Description>
              )}
              {activity.IsGoing && !activity.IsHost && (
                <Item.Description>
                  <Label
                    basic
                    color='green'
                    content='You are going to this activity'
                  />
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>

      <Segment>
        <Icon name='clock' /> {activity.Date}
        <Icon name='marker' /> {activity.Venue}, {activity.City}
      </Segment>

      <Segment secondary>
        <ActivityListItemAttendees attendees={activity.UserActivities} />
      </Segment>
      <Segment clearing>
        <span>{activity.Description}</span>
        <Button
          floated='right'
          content='View'
          color='blue'
          as={Link}
          to={`/activities/${activity.Id}`}
        />
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItem;
