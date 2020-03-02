import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';

const NavBar = () => {
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item name='home' header>
          <img src='assets/logo.png' alt='logo' />
          Reactivities
        </Menu.Item>
        <Menu.Item name='Activities' />
        <Menu.Item>
          <Button positive content='Create Activity' />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
