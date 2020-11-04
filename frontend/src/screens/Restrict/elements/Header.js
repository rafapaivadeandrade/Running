import React from "react";
import { connect } from "react-redux";
import ActionCreators from "../../../redux/actionCreators";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
const Header = (props) => {
  return (
    <header className="App-header">
      <Menu>
        <Menu.Item as={Link} to="/">
          <Image src={"/logo.png"} size="small" />
        </Menu.Item>
        <Menu.Item as={Link} to="/restrict">
          Home
        </Menu.Item>
        <Menu.Item as={Link} to="/restrict/runs">
          Runs
        </Menu.Item>
        <Menu.Menu position="right">
          <Dropdown item text={props.props.auth.user.name}>
            <Dropdown.Menu>
              {props.props.auth.user.role === "admin" && (
                <Dropdown.Item as={Link} to="/admin">
                  Admin
                </Dropdown.Item>
              )}
              <Dropdown.Item as={Link} to="/restrict/my-account">
                My account
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/restrict/change-password">
                Change password
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => props.logout()}
                as={Link}
                to={!props.props.auth.user.name ? "/" : "/restrict"}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
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
    logout: () => dispatch(ActionCreators.destroyAuthRequest()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
