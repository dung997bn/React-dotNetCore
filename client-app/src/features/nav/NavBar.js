import React from "react";
import { Menu, Container } from "semantic-ui-react";

const NavBar = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item name="home" ></Menu.Item>
        <Menu.Item name="messages" />
        <Menu.Item name="friends" />
      </Container>
    </Menu>
  );
};

export default NavBar;
