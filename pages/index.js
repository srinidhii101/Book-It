/* Landing Page */

//wrapping the page in the default layout
import DefaultLayout from "../layouts/default";

//importing modules
import { Container, Jumbotron, Row, Col, ListGroup, Card, Button, CardBody, CardText, CardHeader, CardTitle, ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTools, faPeopleCarry, faHeartbeat, faCalendarDay, faRecycle, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
//The file structure for the landing page
function Index() {
  return (
    <div>
      <DefaultLayout>
        <Jumbotron>
          <Container>
            <h1 className="display-4">Find a service</h1>
            <hr className="my-2" />
            <p>Browse the latest Haligonian services offered in areas from auto Repair to tutoring.
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
              <ListGroupItem action>Landscaping</ListGroupItem>
              <ListGroupItem action>Haircuts</ListGroupItem>
              <ListGroupItem action>Techical Support</ListGroupItem>
            </ListGroup>
          </Col>
            <Col className="mt-16">
              <ListGroup>
                <label className="landingPageListTitle text-muted">Recently Requested</label>
                <ListGroupItem action>Henry's Haircuts</ListGroupItem>
                <ListGroupItem action>Tashi's Tech</ListGroupItem>
                <ListGroupItem action>Carter's Carpentry</ListGroupItem>
              </ListGroup>
            </Col>
            <Col className="mt-16">
              <ListGroup>
                <label className="landingPageListTitle text-muted">Newly Posted</label>
                <ListGroupItem action>Larry's Landscaping</ListGroupItem>
                <ListGroupItem action>Carol's Consulting</ListGroupItem>
                <ListGroupItem action>Clare's Cleaning</ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </Container>

      </DefaultLayout>
    </div>
  );
}

export default Index;
