/* Login Page */
import DefaultLayout from '../layouts/default';

import Link from 'next/link';
import { Table } from 'reactstrap';

class Orders extends React.Component {

  render() {
    /* Wrapping the form with a navigation and footer */
    return (
      <DefaultLayout>
        <div className="container">
          {/* Page Title */}
          <h3 className="mt-16 loginFormTitle">Your Order History</h3>
          {/* Table */}
          <Table bordered responsive hover className="mt-8">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Description</th>
                <th>Vendor</th>
                <th>Order Status</th>
                <th>Order Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Create an additional power point.</td>
                <td>Oskof Electricals</td>
                <td>In-Progress</td>
                <td>2019-06-13</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Conference room and chairs</td>
                <td>Best Furnitures</td>
                <td>Closed</td>
                <td>2019-05-23</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>General Landscaping</td>
                <td>Felixco Lawn Care</td>
                <td>Pending Approval</td>
                <td>2019-03-25</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </DefaultLayout>
    );
  }
}

export default Orders;
