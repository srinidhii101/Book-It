/* Register Page */
import DefaultLayout from '../layouts/default';
import { isValidEmail, isValidPassword } from '../functions/validate';

import Link from 'next/link';
import { Form, Button, Col } from 'react-bootstrap';
import Router from 'next/router';

class Register extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      validForm: false,
      username: '',
      email: '',
      password: ''
    };
  }

  //handling the submit event and routing to the landing page if valid
  handleSubmit(e) {
      e.preventDefault();
      e.stopPropagation();
      if(this.state.username.length > 0 && this.state.password.length > 0) {
        //TODO: Give authenticatoin
        Router.push('/');
      }
      this.setState({ validForm: true });
  }

  //Handlers to keep the state up to date of the latest values
  handleUsernameChange = (e) => {
    this.setState({ ...this.state, username: e.currentTarget.value})
  }
  handleEmailChange = (e) => {
    this.setState({ ...this.state, email: e.currentTarget.value})
  }
  handlePasswordChange = (e) => {
    this.setState({ ...this.state, password: e.currentTarget.value})
  }

  render() {
    //State used in the component
    const { username, password, email, validForm } = this.state;

    /* Wrapping the form with a navigation and footer */
    return (
      <DefaultLayout>
        <div className="loginContainer">

          {/* Login Form */}
          <Form
          className="loginForm"
          noValidate
          validated={this.state.username.length < 1 && isValidEmail(this.state.email) && isValidPassword(this.state.oassword)}
          onSubmit={e => this.handleSubmit(e)} >

            {/* Title */}
            <Form.Group controlId="formTitle" className="loginFormTitle">
              <h1>Register with Book it!</h1>
            </Form.Group>

            {/* Username */}
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                required
                autoFocus
                isInvalid={this.state.username.length < 1}
                onChange={this.handleUsernameChange} />
              <Form.Control.Feedback type="invalid">
                  Please enter a username.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Username */}
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="example@bookit.com"
                isInvalid={!isValidEmail(this.state.email)}
                required
                onChange={this.handleEmailChange} />
              <Form.Control.Feedback type="invalid">
                  Please enter a valid email.
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
                  Passwords must be 8 characters while containing one number and one letter.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Register and Login Buttons */}
            <div className="loginButtons">
              <Link href="/login">
                <Button variant="link" type="button">
                  Login
                </Button>
              </Link>
              <Button
                variant="primary"
                type="submit"
                className="loginButton">
                Sign up
              </Button>
            </div>

          </Form>
        </div>
      </DefaultLayout>
    );
  }
}

export default Register;
