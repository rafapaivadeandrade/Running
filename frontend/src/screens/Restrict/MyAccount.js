import React from "react";
import Header from "./elements/Header";
import { connect } from "react-redux";
import timezones from "moment-timezone/data/meta/latest.json";
import ActionCreators from "../../redux/actionCreators";
import { Button, Form, Segment } from "semantic-ui-react";

class MyAccount extends React.Component {
  state = {
    unit: this.props.auth.user.unit,
    timezone: this.props.auth.user.timezone,
  };
  componentDidMount() {
    this.setState({
      unit: this.props.auth.user.unit,
      timezone: this.props.auth.user.timezone,
    });
    this.props.reset();
  }
  handleChange = (fieldname) => (e) => {
    this.setState({
      [fieldname]: e.target.value,
    });
  };
  handleSave = () => {
    this.props.save({
      unit: this.state.unit,
      timezone: this.state.timezone,
      id: this.props.auth.user.id,
    });
  };

  render() {
    return (
      <div>
        <div>
          <Header props={this.props} />
          <br />
          <h1>My Account</h1>
          {this.props.auth.saved && (
            <Segment color="green">Configurations saved successfully!</Segment>
          )}
          {!this.props.auth.saved && (
            <Form>
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
              <Button onClick={() => this.handleSave()}>Save</Button>
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
