/* Login Page */
import DefaultLayout from '../layouts/default';
import { isValidPassword } from '../functions/validate';

import Link from 'next/link';
import { Form, Button, Col } from 'react-bootstrap';
import Router from 'next/router';

class Login extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      username: '',
      password: ''
    };
  }

  //handling the submit event and routing to the landing page if valid
  handleSubmit(e) {
      e.preventDefault();
      e.stopPropagation();
      if(this.state.username.length > 0 && this.state.password.length > 0) {
        //TODO: Give authentication
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
          className="loginForm"
          noValidate
          onSubmit={e => this.handleSubmit(e)} >

            {/* Title */}
            <Form.Group controlId="formTitle" className="loginFormTitle">
              <h1>Welcome Back!</h1>
            </Form.Group>

            {/* Username */}
            <Form.Group controlId="formEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                required
                autoFocus
                isInvalid={this.state.username.length < 1}
                onChange={this.handleUsernameChange} />
              <Form.Control.Feedback type="invalid">
                  Please enter a username.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Password */}
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                isInvalid={!isValidPassword(this.state.password)}
                onChange={this.handlePasswordChange} />
              <Form.Control.Feedback type="invalid">
                  Please enter a password.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Register and Login Buttons */}
            <div className="loginButtons">
              <Link href="/register">
                <Button variant="link" type="button">
                  Register
                </Button>
              </Link>
              <Button
                variant="primary"
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
