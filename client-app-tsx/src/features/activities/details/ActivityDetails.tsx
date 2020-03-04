import React, { useContext, useEffect } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";

interface DetailParams {
  Id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const { activity, loadActivityDetail, loadingInitial } = activityStore;

  useEffect(() => {
    loadActivityDetail(match.params.Id);
  }, [loadActivityDetail, match.params.Id]);

  if (loadingInitial || !activity)
    return <LoadingComponent content="Loading activity..." />;

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity!.Category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity!.Title}</Card.Header>
        <Card.Meta>
          <span>Joined in {activity!.Date}</span>
        </Card.Meta>
        <Card.Description>{activity!.Description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            basic
            color="blue"
            content="Edit"
            as={Link}
            to={`/manage/${activity.Id}`}
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={() => history.push("/activities")}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
