/* Login Page */
import DefaultLayout from '../layouts/default';
import { isValidPassword, isEmptyString } from '../functions/validate';

import Link from 'next/link';
import { Form, Button, Col, FormGroup, Input, FormFeedback, Label,NavLink } from 'reactstrap';
import Router from 'next/router';
import ls, { set } from "local-storage";

class Login extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      username: '',
      password: '',
      data: ''
    };
  }

  componentDidMount() {
    this.getDataFromDb();
  }

  getDataFromDb = () => {
    fetch('http://localhost:3001/api/users')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }))
      .then(() => console.log(this.state));
  };

  //handling the submit event and routing to the landing page if valid
  handleSubmit(e) {
      e.preventDefault();
      e.stopPropagation();
      if(this.state.username.length > 0 && this.state.password.length > 0) {
        //TODO: Give authentication
        //get authentication from database
        if(true) {
          const bookit = { "user": this.state.username, "session": 'a1a1a1a1', 'role': 'vendor' };
          ls.set('bookit', bookit);
        }
        Router.push('/');
      }
  }

  handleUsernameChange = (e) => {
    this.setState({ ...this.state, username: e.currentTarget.value})
  }

  handlePasswordChange = (e) => {
    this.setState({ ...this.state, password: e.currentTarget.value})
  }

  render() {
    const { username, password } = this.state;

    /* Wrapping the form with a navigation and footer */
    return (
      <DefaultLayout>
        <div className="loginContainer">

          {/* Login Form */}
          <Form
          className="loginForm mt-32"
          noValidate
          validated={(isEmptyString(this.state.username) && isValidPassword(this.state.password)).toString()}
          onSubmit={e => this.handleSubmit(e)} >

            {/* Title */}
            <FormGroup className="loginFormTitle">
              <h1>Welcome Back!</h1>
            </FormGroup>

            {/* Username */}
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="text"
                placeholder="Enter username"
                required
                autoFocus
                valid={!isEmptyString(this.state.username)}
                invalid={isEmptyString(this.state.username)}
                onChange={this.handleUsernameChange} />
              <FormFeedback type="invalid">
                Please enter a username.
              </FormFeedback>
            </FormGroup>

            {/* Password */}
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Password"
                required
                valid={isValidPassword(this.state.password)}
                invalid={!isValidPassword(this.state.password)}
                onChange={this.handlePasswordChange} />
              <FormFeedback type="invalid">
                Please enter a password.
              </FormFeedback>
            </FormGroup>

            {/* Register and Login Buttons */}
            <div className="loginButtons">
              <Link href="/register">
                <Button color="link" type="button">
                  Register
                </Button>
              </Link>
              <Button
                color="primary"
                type="submit"
                className="loginButton">
                Login
              </Button>
            </div>
          </Form>
        </div>
      </DefaultLayout>
    );
  }
}

export default Login;
