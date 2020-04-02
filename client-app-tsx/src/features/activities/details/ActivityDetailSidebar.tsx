import React, { Fragment } from 'react';
import { Segment, List, Item, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IAttendee } from '../../../app/models/activity';
import { observer } from 'mobx-react-lite';
interface IProps {
  attendees: IAttendee[];
}
const ActivityDetailSidebar: React.FC<IProps> = ({ attendees }) => {
  const isHost = false;
  return (
    <Fragment>
      <Segment
        textAlign='center'
        style={{ border: 'none' }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        {attendees.length} {attendees.length === 1 ? 'Person' : 'People'} going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees.map(att => (
            <Item key={att.UserName} style={{ position: 'relative' }}>
              {isHost && (
                <Label
                  style={{ position: 'absolute' }}
                  color='orange'
                  ribbon='right'
                >
                  Host
                </Label>
              )}

              <Image size='tiny' src={att.Image || '/assets/user.png'} />
              <Item.Content verticalAlign='middle'>
                <Item.Header as='h3'>
                  <Link to={`/profile/${att.UserName}`}>{att.UserName}</Link>
                </Item.Header>
                <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
    </Fragment>
  );
};

export default observer(ActivityDetailSidebar);
