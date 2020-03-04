import React, { useEffect, Fragment, useContext } from "react";
import "./styles.css";
import NavBar from "../../features/nav/Navbar";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../features/activities/dasboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import ActivityStore from "../stores/activityStore";
import { observer } from "mobx-react-lite";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import HomePages from "../../features/home/HomePages";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const activityStore = useContext(ActivityStore);
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) {
    return <LoadingComponent content="Loading activities..." />;
  }
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Route exact path="/" component={HomePages} />
        <Route exact path="/activities" component={ActivityDashboard} />
        <Route exact path="/activities/:Id" component={ActivityDetails} />
        <Route
          exact
          key={location.key}
          path={["/createActivity", "/manage/:Id"]}
          component={ActivityForm}
        />
      </Container>
    </Fragment>
  );
};

export default withRouter(observer(App));
