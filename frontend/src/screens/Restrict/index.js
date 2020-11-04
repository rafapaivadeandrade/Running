import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "./elements/Header";
import Home from "./Home";
const Restrict = (props) => {
  if (props.auth.isSigningin) {
    return <p>Loading...</p>;
  }
  if (!props.auth.isAuth) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <Header props={props} />
      <Route exact path={`${props.match.path}/`} component={Home} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(Restrict);
