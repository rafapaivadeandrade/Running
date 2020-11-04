import React from "react";
import store from "./redux";
import { Provider } from "react-redux";
import { Container } from "semantic-ui-react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./screens/Home";
import Admin from "./screens/Admin";
import Restrict from "./screens/Restrict";
import Login from "./screens/Login";
import Runs from "./screens/Restrict/Runs";
import RunsAdmin from "./screens/Admin/Runs";
import Users from "./screens/Admin/Users";
import MyAccount from "./screens/Restrict/MyAccount";
import ChangePass from "./screens/Restrict/ChangePass";
import CreateAccount from "./screens/CreateAccount";
import CreateRun from "./screens/Restrict/CreateRun";
import EditUser from "./screens/Admin/EditUser";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Container>
            <Route exact path="/" component={Home} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/admin/users" component={Users} />
            <Route exact path="/users/:id/edit" component={EditUser} />
            <Route exact path="/admin/runs" component={RunsAdmin} />
            <Route exact path="/restrict" component={Restrict} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/restrict/runs" component={Runs} />
            <Route exact path="/restrict/my-account" component={MyAccount} />
            <Route exact path="/create-account" component={CreateAccount} />
            <Route exact path="/restrict/create-run" component={CreateRun} />
            <Route
              exact
              path="/restrict/change-password"
              component={ChangePass}
            />
          </Container>
        </Router>
      </Provider>
    );
  }
}

export default App;
