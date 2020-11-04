import React from "react";
import { connect } from "react-redux";
import ActionCreators from "./redux/actionCreators";
import { Menu, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
const Header = (props) => {
  return (
    <header className="App-header">
      <Menu>
        <Menu.Item as={Link} to="/">
          <Image src={"/logo.png"} size="small" />
        </Menu.Item>
        <Menu.Item as={Link} to="/">
          Home
        </Menu.Item>
        <Menu.Item as={Link} to="/create-account">
          Create Account
        </Menu.Item>
        <Menu.Item as={Link} to="/login">
          Login
        </Menu.Item>
      </Menu>
    </header>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signin: (email, passwd) => ActionCreators.signinRequest(email, passwd),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
