import React from "react";
import Header from "./elements/Header";
import { connect } from "react-redux";
import ActionCreators from "../../redux/actionCreators";
import { Button, Segment, Form } from "semantic-ui-react";
import MultiRef from "react-multi-ref";
import { Redirect } from "react-router-dom";
import "input-moment/dist/input-moment.css";
class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.Ref = new MultiRef();
  }
  state = {
    name: "",
    email: "",
    role: "",
    error: "",
  };
  componentDidMount() {
    this.props.load(this.props.match.params.id);
    this.props.reset();
  }
  static getDerivedStateFromProps(newProps, prevState) {
    if (newProps.users && newProps.users.user) {
      const user = {};
      const u = newProps.users.user;
      if (u.name !== prevState.name) {
        user.name = newProps.users.user.name;
      }
      if (u.email !== prevState.email) {
        user.email = newProps.users.user.email;
      }
      if (u.role !== prevState.role) {
        user.role = newProps.users.user.role;
      }

      return user;
    }
    return null;
  }
  handleChange = (fieldname) => (e) => {
    this.setState({
      [fieldname]: e.target.value,
    });
  };
  handleSave = () => {
    this.props.edit({
      id: this.props.match.params.id,
      name: this.Ref.map.get("name").value,
      email: this.Ref.map.get("email").value,
      role: this.Ref.map.get("role").value,
    });
  };

  render() {
    if (this.props.users.saved) {
      return <Redirect to="/admin/users" />;
    }
    return (
      <div>
        <div>
          <Header props={this.props} />
          <br />
          <h1>Edit User</h1>
          {this.props.users.saved && (
            <Segment color="green">Users Edited</Segment>
          )}
          {!this.props.users.saved && (
            <Form>
              <Form.Field>
                <label>Name:</label>
                <input
                  type="text"
                  defaultValue={this.state.name}
                  //   onChange={this.handleChange("name")}
                  ref={this.Ref.ref("name")}
                />
              </Form.Field>
              <Form.Field>
                <label>E-mail:</label>
                <input
                  type="text"
                  defaultValue={this.state.email}
                  //   onChange={this.handleChange("email")}
                  ref={this.Ref.ref("email")}
                />
              </Form.Field>
              <Form.Field>
                <select
                  defaultValue={this.state.role}
                  //   onChange={(e) => this.setState({ role: e.target.value })}
                  ref={this.Ref.ref("role")}
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </Form.Field>
              <div>
                <Button onClick={() => this.handleSave()}>Edit User</Button>
              </div>
            </Form>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    runs: state.runs,
    users: state.users,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    load: (id) => dispatch(ActionCreators.getUserRequest(id)),
    edit: (user) => dispatch(ActionCreators.updateUserRequest(user)),
    reset: () => dispatch(ActionCreators.updateUserReset()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
