import React, { useContext } from 'react';
import { Menu, Container, Button, Dropdown, Image } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink, Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';

const NavBar = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user, logout } = rootStore.userStore;

  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item name='home' header as={NavLink} exact to='/'>
          <img src='assets/logo.png' alt='logo' />
          Reactivities
        </Menu.Item>
        <Menu.Item name='Activities' as={NavLink} to='/activities' />
        <Menu.Item>
          <Button
            positive
            content='Create Activity'
            as={NavLink}
            to='/createActivity'
          />
        </Menu.Item>
        {isLoggedIn && user && (
          <Menu.Item position='right'>
            <Image
              avatar
              spaced='right'
              src={user.Image || '/assets/user.png'}
            />
            <Dropdown pointing='top left' text={user.DisplayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/${user.UserName}`}
                  text='My profile'
                  icon='user'
                />
                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
