//wrapping the page in the default layout
import DefaultLayout from "../layouts/default";

//importing modules
import { Container, Jumbotron, Row, Col, ListGroup, Card, Button, CardBody, CardText, CardHeader, CardTitle, ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTools, faPeopleCarry, faHeartbeat, faCalendarDay, faRecycle, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';

class Index extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      recent: [],
      popular: [],
      last: [],
    };
  }

  componentDidMount() {
    fetch('http://bluenose.cs.dal.ca:25057/api/services/stats')
      .then((data) => data.json())
      .then((res) => {
        let recentlyCreated = [];
        let lastBooked = [];
        let popularBookings = [];
        res.popular.map(bookings => { popularBookings.push(bookings.name) });
        res.last.map(bookings => { lastBooked.push(bookings.name) });
        res.recent.map(bookings => { recentlyCreated.push(bookings.name) });
        this.setState({ recent: recentlyCreated, popular: popularBookings, last: lastBooked });
      }).catch((err)=>{toast.warn("There were issues connecting to the server. Please check your connection.")});
  }

  render() {

    return (
      <div>
        <DefaultLayout>
          <Jumbotron className="hero-image">
              <Container>
                <h1 className="display-4 text-light">Find a service</h1>
                <hr className="my-2" />
                <p className="text-light">Browse the latest Haligonian services offered in areas from auto Repair to tutoring.
                Our ad free e-commerce platform will get you access to your favourite services in no time.</p>
                <p className="lead">
                <Link href="/browse">
                  <Button color="primary">Browse Services</Button>
                </Link>
                </p>
              </Container>
          </Jumbotron>
          {/* Top display items */}
          <Container className="container-fluid">
            <Row>
              <Col className="mt-8">
                <Card>
                  <CardHeader>Repair</CardHeader>
                  <CardBody className="m-auto">
                    <FontAwesomeIcon icon={faTools} size="6x"/>
                  </CardBody>
                </Card>
              </Col>
              <Col className="mt-8">
                <Card>
                  <CardHeader>Transport</CardHeader>
                  <CardBody className="m-auto">
                    <FontAwesomeIcon icon={faPeopleCarry} size="6x"/>
                  </CardBody>
                </Card>
              </Col>
              <Col className="mt-8">
                <Card>
                  <CardHeader>Health</CardHeader>
                  <CardBody className="m-auto">
                    <FontAwesomeIcon icon={faHeartbeat} size="6x"/>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col className="mt-8">
                <Card>
                  <CardHeader>Event Planning</CardHeader>
                  <CardBody className="m-auto">
                    <FontAwesomeIcon icon={faCalendarDay} size="6x"/>
                  </CardBody>
                </Card>
              </Col>
              <Col className="mt-8">
                <Card>
                  <CardHeader>Cleaning</CardHeader>
                  <CardBody className="m-auto">
                    <FontAwesomeIcon icon={faRecycle} size="6x"/>
                  </CardBody>
                </Card>
              </Col>
              <Col className="mt-8">
                <Card>
                  <CardHeader>Tutoring</CardHeader>
                  <CardBody className="m-auto">
                    <FontAwesomeIcon icon={faChalkboardTeacher} size="6x"/>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>

          <hr className="landingPageHr"></hr>

          {/* Bottom display lists */}
          <Container className="container-fluid mb-16">
            <Row>
            <Col className="mt-16">
              <ListGroup>
                <label className="landingPageListTitle text-muted">Popular Services</label>
                {this.state.popular &&
                  this.state.popular.map((result, index) =>{
                    return (<ListGroupItem key={index} action>{result}</ListGroupItem>)
                  })
                }
              </ListGroup>
            </Col>
              <Col className="mt-16">
                <ListGroup>
                  <label className="landingPageListTitle text-muted">Recently Requested</label>
                  {this.state.last &&
                    this.state.last.map((result, index) =>{
                      return (<ListGroupItem key={index} action>{result}</ListGroupItem>)
                    })
                  }
                </ListGroup>
              </Col>
              <Col className="mt-16">
                <ListGroup>
                  <label className="landingPageListTitle text-muted">Newly Posted</label>
                  {this.state.recent &&
                    this.state.recent.map((result, index) =>{
                      return (<ListGroupItem key={index} action>{result}</ListGroupItem>)
                    })
                  }
                </ListGroup>
              </Col>
            </Row>
          </Container>
          <ToastContainer autoClose={5000}/>
        </DefaultLayout>
      </div>
    );
  }
}

export default Index;
