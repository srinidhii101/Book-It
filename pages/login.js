/* Login Page */
import DefaultLayout from '../layouts/default';
import { isValidPassword, isEmptyString } from '../functions/validate';

import Link from 'next/link';
import { Form, Button, Col, FormGroup, Input, FormFeedback, Label,NavLink } from 'reactstrap';
import Router from 'next/router';
import ls, { set } from "local-storage";
import { ToastContainer, toast } from 'react-toastify';
import '../node_modules/react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const CryptoJS = require("crypto-js")

class Login extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      username: '',
      password: '',
      data: ''
    };
  }

  //handling the submit event and routing to the landing page if valid
  async handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    //validating form fields to ensure they ave been populated
    if(this.state.username.length > 0 && this.state.password.length > 0) {
      //encrypting user password before sending via the network
      var encryptedPass = CryptoJS.AES.encrypt(this.state.password, 'quick Oats');
      try {
        const res = await axios.post('http://localhost:3001/api/login', {
          "username": this.state.username,
          "password": encryptedPass.toString()
        });
        //redirect to home page on successful login
        if(res.data.success) {
          Router.push('/');
        } else {
          toast.warn("Not logged in. Either username or password is incorrect");
        }
      } catch(err) {
        toast.warn("Issue connecting Server.");
        console.log(err);
      }
    }
  }

  handleUsernameChange = (e) => {
    this.setState({ ...this.state, username: e.currentTarget.value})
  }

  handlePasswordChange = (e) => {
    this.setState({ ...this.state, password: e.currentTarget.value})
  }

  render() {
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
        <ToastContainer autoClose={5000}/>
      </DefaultLayout>
    );
  }
}

export default Login;
