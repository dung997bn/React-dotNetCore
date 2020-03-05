import React, { Fragment } from "react";
import "./styles.css";
import NavBar from "../../features/nav/Navbar";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../features/activities/dasboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import HomePages from "../../features/home/HomePages";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <Route exact path="/" component={HomePages} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
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
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
