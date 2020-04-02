import React from 'react';
import { List, Image, Popup } from 'semantic-ui-react';
import { IAttendee } from '../../../app/models/activity';

interface IProps {
  attendees: IAttendee[];
}
const ActivityListItemAttendees: React.FC<IProps> = ({ attendees }) => {
  return (
    <List horizontal>
      {attendees.map(att => (
        <List.Item key={att.UserName}>
          <Popup
            header={att.DisplayName}
            trigger={
              <Image
                size='mini'
                circular
                src={att.Image || `/assets/user.png`}
              />
            }
          />
        </List.Item>
      ))}
    </List>
  );
};

export default ActivityListItemAttendees;
