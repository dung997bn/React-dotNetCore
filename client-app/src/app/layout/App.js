import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { Header, Icon, List } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
const App = () => {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/activity")
      .then(response => {
        setActivities(response.data);
      });
  },[]);

  return (
    <div>
      <NavBar/>
      <List>
        {activities &&
          activities.map(act => (
            <List.Item key={act.Id}>{act.Title}</List.Item>
          ))}
      </List>
    </div>
  );
};

export default App;
