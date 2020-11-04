import React from "react";
import Header from "./elements/Header";
import { connect } from "react-redux";
import InputMoment from "input-moment";
import moment from "moment";
import ActionCreators from "../../redux/actionCreators";
import { Button, Segment, Form } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
// import momentTz from "moment-timezone";
import "input-moment/dist/input-moment.css";
class CreateRun extends React.Component {
  state = {
    friendly_name: "",
    duration: 0,
    distance: 0,
    created: moment(),
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
    const d = moment.tz(this.state.created, this.props.auth.user.timezone);
    const d2 = d.clone().utc().format("YYYY/MM/DD h:mm:ss");
    const distance = this.state.distance;
    this.props.create({
      friendly_name: this.state.friendly_name,
      duration: this.state.duration,
      distance:
        this.props.auth.user.unit === "metric" ? distance : distance * 1.634,
      created: d2,
    });
  };

  render() {
    if (this.props.runs.saved) {
      return <Redirect to="/restrict/runs" />;
    }
    return (
      <div>
        <div>
          <Header props={this.props} />
          <br />
          <h1>Create Run</h1>
          {this.props.runs.saved && (
            <Segment color="green">Run Created</Segment>
          )}
          {!this.props.runs.saved && (
            <Form>
              <Form.Field>
                <label>Name:</label>
                <input
                  type="text"
                  value={this.state.friendly_name}
                  onChange={this.handleChange("friendly_name")}
                />
              </Form.Field>
              <Form.Field>
                <label>Duration:</label>
                <input
                  type="number"
                  value={this.state.duration}
                  onChange={this.handleChange("duration")}
                />
              </Form.Field>
              <Form.Field>
                <label>
                  Distance: (
                  {this.props.auth.user.unit === "metric" ? "Km" : "mi"})
                </label>
                <input
                  type="number"
                  value={this.state.distance}
                  onChange={this.handleChange("distance")}
                />
              </Form.Field>
              <Form.Field>
                <label>Created:</label>
                <input
                  type="text"
                  value={this.state.created.format("DD/MM/YYYY h:mm:ss")}
                  onChange={this.handleChange("created")}
                />
              </Form.Field>
              <InputMoment
                moment={this.state.created}
                onChange={(value) => this.setState({ created: value })}
              />
              <div>
                <Button onClick={() => this.handleSave()}>Create Run</Button>
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    create: (run) => dispatch(ActionCreators.createRunRequest(run)),
    reset: () => dispatch(ActionCreators.createRunReset()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateRun);
