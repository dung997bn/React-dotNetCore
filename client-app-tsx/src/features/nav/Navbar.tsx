import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface IProps {
  handleOpenCreateForm: () => void;
}
const NavBar: React.FC<IProps> = ({ handleOpenCreateForm }) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item name="home" header>
          <img src="assets/logo.png" alt="logo" />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button
            positive
            content="Create Activity"
            onClick={() => handleOpenCreateForm()}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
