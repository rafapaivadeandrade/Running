import React from "react";
import Header from "./elements/Header";
import { connect } from "react-redux";
import ActionCreators from "../../redux/actionCreators";
import { Table, Button, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
class Users extends React.Component {
  componentDidMount() {
    this.props.load();
  }
  renderUser(user) {
    // console.log(user);
    return (
      <Table.Row key={user.id}>
        <Table.Cell>{user.name}</Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        <Table.Cell>{user.role}</Table.Cell>
        <Table.Cell>
          <Button basic color="blue" as={Link} to={`/users/${user.id}/edit`}>
            Edit
          </Button>
          <Button basic color="red" onClick={() => this.props.remove(user.id)}>
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
          <h1>Users</h1>
          {this.props.users.isLoading && <p>Loading...</p>}
          {!this.props.users.isLoading &&
            this.props.users.data.length === 0 && (
              <Segment color="blue">No user registered yet.</Segment>
            )}
          {!this.props.users.isLoading && this.props.users.data.length > 0 && (
            <Table celled>
              <Table.Header>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>E-mail</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Header>
              <Table.Body>
                {Object.keys(this.props.users.data).map((key) =>
                  this.renderUser(this.props.users.data[key])
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
    users: state.users,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    load: () => dispatch(ActionCreators.getUsersRequest()),
    remove: (id) => dispatch(ActionCreators.removeUserRequest(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Users);
