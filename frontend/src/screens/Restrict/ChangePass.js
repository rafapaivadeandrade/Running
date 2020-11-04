import React from "react";
import Header from "./elements/Header";
import { connect } from "react-redux";
// import timezones from "moment-timezone/data/meta/latest.json";
import ActionCreators from "../../redux/actionCreators";
import { Button, Segment, Form } from "semantic-ui-react";

class ChangePass extends React.Component {
  state = {
    passwd: "",
    passwd2: "",
    error: "",
  };
  componentDidMount() {
    this.props.reset();
  }
  handleChange = (fieldname) => (e) => {
    this.setState({
      [fieldname]: e.target.value,
    });
  };
  handleSave = () => {
    if (this.state.passwd !== this.state.passwd2) {
      this.setState({
        error: "equal",
      });
    } else if (this.state.passwd.length < 6) {
      this.setState({
        error: "length",
      });
    } else {
      this.setState({ error: "" });
      this.props.save({
        passwd: this.state.passwd,
        id: this.props.auth.user.id,
      });
    }
  };

  render() {
    return (
      <div>
        <div>
          <Header props={this.props} />
          <br />
          <h1>Alter Password</h1>
          {this.state.error === "equal" && (
            <Segment color="red">
              Password and Password confirmation has to be the same!
            </Segment>
          )}
          {this.state.error === "length" && (
            <Segment color="red">
              Password has to be at least 6 characters!
            </Segment>
          )}
          {this.props.auth.saved && (
            <Segment color="green">Password Saved!</Segment>
          )}
          {!this.props.auth.saved && (
            <Form>
              <Form.Field>
                <label>New Password:</label>
                <input
                  type="password"
                  value={this.state.passwd}
                  onChange={this.handleChange("passwd")}
                />
              </Form.Field>
              <Form.Field>
                <label>Confirm Password:</label>
                <input
                  type="password"
                  value={this.state.passwd2}
                  onChange={this.handleChange("passwd2")}
                />
              </Form.Field>

              <Button onClick={() => this.handleSave()}>Change Password</Button>
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    save: (user) => dispatch(ActionCreators.updateProfileRequest(user)),
    reset: () => dispatch(ActionCreators.updateProfileReset()),
    // loadUserProfile: () => dispatch(ActionCreators.updateProfileSuccess()),
    // save: (user) => console.log(user),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangePass);
