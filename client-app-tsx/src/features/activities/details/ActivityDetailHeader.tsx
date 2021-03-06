import React, { useContext } from 'react';
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Link } from 'react-router-dom';

const activityImageStyle = {
  filter: 'brightness(30%)',
};

const activityImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white',
};

const ActivityDetailHeader: React.FC<{ activity: IActivity }> = ({
  activity,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { attendActivity, cancelAttendance, loading } = rootStore.activityStore;
  const host = activity.UserActivities.filter((x) => x.IsHost)[0];
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${activity.Category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment basic style={activityImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={activity.Title}
                  style={{ color: 'white' }}
                />
                <p>{activity.Date}</p>
                <p>
                  Hosted by{' '}
                  <Link to={`/profile/${host.UserName}`}>
                    <strong>{host.DisplayName}</strong>
                  </Link>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
        {activity.IsHost ? (
          <Button color='orange' floated='right'>
            Manage Event
          </Button>
        ) : activity.IsGoing ? (
          <Button loading={loading} onClick={() => cancelAttendance()}>
            Cancel attendance
          </Button>
        ) : (
          <Button
            loading={loading}
            onClick={() => attendActivity()}
            color='teal'
          >
            Join Activity
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default observer(ActivityDetailHeader);
