import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./elements/Header";
const Home = (props) => {
  return <h1>Home Admin</h1>;
};
const Admin = (props) => {
  if (!props.auth.isAuth) {
    return <Redirect to="/login" />;
  }
  if (props.auth.user.role !== "admin") {
    return <Redirect to="/restrict" />;
  }
  return (
    <div>
      <Header props={props} />
      <Route exact path={`${props.match.path}/`} component={Home}></Route>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(Admin);
