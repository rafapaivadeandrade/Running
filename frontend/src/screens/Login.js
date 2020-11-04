import React from "react";
import ActionCreators from "../redux/actionCreators";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Form, Button } from "semantic-ui-react";
import Header from "../Header";
class Login extends React.Component {
  state = {
    form: {
      email: "",
      passwd: "",
    },
  };
  handleChange = (fieldname) => (e) => {
    const form = { ...this.state.form };
    form[fieldname] = e.target.value;
    this.setState({ form: form });
  };
  login = () => {
    this.props.login(this.state.form.email, this.state.form.passwd);
  };
  render() {
    if (this.props.auth.isAuth) {
      if (this.props.auth.user.role === "admin") {
        return <Redirect to="/admin" />;
      }
      return <Redirect to="/restrict" />;
    }
    return (
      <div>
        <Header />
        <h1>Join</h1>
        <Form>
          <Form.Field>
            <label>E-mail</label>
            <input
              type="text"
              value={this.state.form.email}
              onChange={this.handleChange("email")}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>

            <input
              type="text"
              value={this.state.form.passwd}
              onChange={this.handleChange("passwd")}
            />
          </Form.Field>

          <Button onClick={this.login}>Login</Button>
          {this.props.auth.error && <p>Error on login</p>}
        </Form>
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
    login: (email, passwd) =>
      dispatch(ActionCreators.signinRequest(email, passwd)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
