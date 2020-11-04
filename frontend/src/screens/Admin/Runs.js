import React from "react";
import Header from "./elements/Header";
import { connect } from "react-redux";
import ActionCreators from "../../redux/actionCreators";
import { Table, Button, Segment, Label } from "semantic-ui-react";
import Distance from "../elements/Distance";
import Duration from "../elements/Duration";
import DateString from "../elements/DateString";
import { Link } from "react-router-dom";
class Runs extends React.Component {
  componentDidMount() {
    this.props.load();
  }
  renderRun(run) {
    return (
      <Table.Row key={run.id}>
        <Table.Cell>
          {run.friendly_name}
          <br />
          <Label>{run.name}</Label>
        </Table.Cell>

        <Table.Cell>
          <Duration duration={run.duration} />
        </Table.Cell>
        <Table.Cell>
          <Distance
            distance={run.distance}
            metric={this.props.auth.user.unit}
          />
        </Table.Cell>
        <Table.Cell>
          <DateString
            date={run.created}
            timezone={this.props.auth.user.timezone}
          />
        </Table.Cell>
        <Table.Cell>
          <Button basic color="red" onClick={() => this.props.remove(run.id)}>
            Remove
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  }
  render() {
    return (
      <div>
        <Header props={this.props} />
        <div>
          <h1>Runs</h1>
          <Button as={Link} to="/restrict/create-run">
            New Run
          </Button>
          {this.props.runs.isLoading && <p>Loading...</p>}
          {!this.props.runs.isLoading && this.props.runs.data.length === 0 && (
            <Segment color="blue">No run registered yet.</Segment>
          )}
          {!this.props.runs.isLoading && this.props.runs.data.length > 0 && (
            <Table celled>
              <Table.Header>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Duration</Table.HeaderCell>
                <Table.HeaderCell>Distance</Table.HeaderCell>
                <Table.HeaderCell>Data</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Header>
              <Table.Body>
                {Object.keys(this.props.runs.data).map((key) =>
                  this.renderRun(this.props.runs.data[key])
                )}
              </Table.Body>
            </Table>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    runs: state.runs,
    auth: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    load: () => dispatch(ActionCreators.getRunsRequest(true)),
    remove: (id) => dispatch(ActionCreators.removeRunRequest(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Runs);
