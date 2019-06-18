/* This gives the header, navigation, and footer */
import DefaultLayout from '../layouts/default';
import Link from 'next/link';

import {Button} from 'reactstrap';

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
          
          <label className="labelCss">Congrats!</label>
          <label className="nextLabel">Your Email has been successfully verified</label>
          <Link href="/browse">
          <Button className="nextClick" color="primary" size="sm">Browse Our Services</Button>
          </Link>

        

        </div>
      </DefaultLayout>
    );
  }
}

export default Verification;
