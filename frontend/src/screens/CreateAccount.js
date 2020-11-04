import React from "react";
import Header from "../Header";
import { connect } from "react-redux";
import timezones from "moment-timezone/data/meta/latest.json";
import ActionCreators from "../redux/actionCreators";
import { Button, Segment, Form } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

class CreateAccount extends React.Component {
  state = {
    passwd: "",
    passwd2: "",
    error: "",
    email: "",
    name: "",
    unit: "metric",
    timezone: "America/Sao_Paulo",
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
        name: this.state.name,
        email: this.state.email,
        unit: this.state.unit,
        timezone: this.state.timezone,
        passwd: this.state.passwd,
      });
    }
  };

  render() {
    if (this.props.auth.isAuth) {
      return <Redirect to="/restrict" />;
    }
    return (
      <div>
        <div>
          <Header props={this.props} />
          <br />
          <h1>Create Account</h1>
          {this.props.auth.error && (
            <Segment color="red">{this.props.auth.errorMessage}</Segment>
          )}
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
            <Segment color="green">Account Successfully Created!</Segment>
          )}
          {!this.props.auth.saved && (
            <Form>
              <Form.Field>
                <label>Name:</label>
                <input
                  type="text"
                  value={this.state.name}
                  onChange={this.handleChange("name")}
                />
              </Form.Field>
              <Form.Field>
                <label>E-mail:</label>
                <input
                  type="text"
                  value={this.state.email}
                  onChange={this.handleChange("email")}
                />
              </Form.Field>
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
              <select
                value={this.state.unit}
                onChange={this.handleChange("unit")}
              >
                <option value="metric">Metric (Km)</option>
                <option value="imperial">Imperial (mi)</option>
              </select>
              <select
                value={this.state.timezone}
                onChange={this.handleChange("timezone")}
              >
                {Object.keys(timezones.zones).map((timezone) => {
                  return (
                    <option key={timezone} value={timezone}>
                      {timezone}
                    </option>
                  );
                })}
              </select>

              <Button onClick={() => this.handleSave()}>Create Account</Button>
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
    save: (user) => dispatch(ActionCreators.createProfileRequest(user)),
    reset: () => dispatch(ActionCreators.createProfileReset()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
