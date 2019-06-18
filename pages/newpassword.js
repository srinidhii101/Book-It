import { Alert} from 'reactstrap';
/* This gives the header, navigation, and footer */
import DefaultLayout from '../layouts/default';

/*This class will be used
**to send the email confirmation to the User*/
export default class NewPassword extends React.Component {
  render() {
    return (
    <DefaultLayout>
       <div className="loginContainer">

      <Alert className="AlertClass"color="success">
        New Password Sent to your email !!
      </Alert>  
      </div>
      </DefaultLayout>
      );
  }
}