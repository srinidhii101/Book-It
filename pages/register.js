/* Register Page */
import DefaultLayout from '../layouts/default';
import { isValidEmail, isValidPassword, isEmptyString } from '../functions/validate';
import { ToastContainer, toast } from 'react-toastify';
import '../node_modules/react-toastify/dist/ReactToastify.css'; 
import axios from 'axios';
const CryptoJS = require("crypto-js")


import Link from 'next/link';
// import { Form, Button, Col } from 'react-bootstrap';
import { Form, Button, Col, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
//import Router from 'next/router';

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
 async handleSubmit(e) {
      e.preventDefault();
      e.stopPropagation();
      if(this.state.username.length > 0 && this.state.password.length > 0) {
        //TODO: Give authentication
        
       // Router.push('/');
      
      this.setState({ validForm: true });

      var encryptedPass = CryptoJS.AES.encrypt(this.state.password, 'quick Oats');
      
    


      try {
            const res = await axios.post('http://localhost:3001/api/users', 
         {
           "role": "customer",
           "username": this.state.username,
           "email": this.state.email,
           "password": this.state.password
           
        });

        if(res.data.success) 
        {
          toast.success("Account created!");
        }

        else {
          toast.warn("There were issues adding your service.");
          console.log(res.data)
             }
      }

  

  catch(err) {
    toast.warn("There were issues adding your service.");
    console.log(err);
  }

  }

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
          className="loginForm mt-32"
          noValidate
          validated={(isEmptyString(this.state.username) && isValidEmail(this.state.email) && isValidPassword(this.state.password)).toString()}
          onSubmit={e => this.handleSubmit(e)} >

            {/* Title */}
            <FormGroup className="loginFormTitle">
              <h1>Register with Book it!</h1>
            </FormGroup>

            {/* Username */}
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="text"
                placeholder="Username"
                required
                autoFocus
                valid={!isEmptyString(this.state.username)}
                invalid={isEmptyString(this.state.username)}
                onChange={this.handleUsernameChange} />
              <FormFeedback type="invalid">
                  Please enter a username.
              </FormFeedback>
            </FormGroup>

            {/* Username */}
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="example@bookit.com"
                valid={isValidEmail(this.state.email)}
                invalid={!isValidEmail(this.state.email)}
                required
                onChange={this.handleEmailChange} />
              <FormFeedback type="invalid">
                  Please enter a valid email.
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
                  Passwords must be 8 characters while containing one number and one letter.
              </FormFeedback>
            </FormGroup>

            {/* Register and Login Buttons */}
            <div className="loginButtons">
              <Link href="/login">
                <Button color="link" type="button">
                  Login
                </Button>
              </Link>
              <Button
                color="primary"
                type="submit"
                className="loginButton">
                Sign up
              </Button>
            </div>

          </Form>


         
        </div>
        <ToastContainer autoClose={5000}/>
      </DefaultLayout>
    );
  }
}

export default Register;
