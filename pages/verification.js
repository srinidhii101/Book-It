/* This gives the header, navigation, and footer */
import DefaultLayout from '../layouts/default';

/* Put the reactstrap components in here that are needed */
//import {  } from 'reactstrap';

class Verification extends React.Component {
  /* If you need to track variables, put them here in state */
  // constructor(...args) {
  //   super(...args);
  //   this.state = {
  //     username: '',
  //     password: ''
  //   };
  // }

  render() {
    /* Define variables here */
    //const { username, password } = this.state;

    return (
      <DefaultLayout>
        <div className="loginContainer">

        {/* Your HTML/JSX goes here */}
        Your email has been verified / not message

        </div>
      </DefaultLayout>
    );
  }
}

export default Verification;
