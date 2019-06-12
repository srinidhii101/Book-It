/* Landing Page */

//wrapping the page in the default layout
import DefaultLayout from "../layouts/default";

//importing modules
import { Container, Row, Col, ListGroup, Card, Button, CardBody, CardText, CardTitle, ListGroupItem } from 'reactstrap';

//The file structure for the landing page
function Index() {
  return (
    <div>
      <DefaultLayout>
        {/* Top display items */}
        <Container className="container-fluid">
          <Row>
            <Col className="mt-16">
              <Card>
                <CardBody className="backgroundImage">
                  <CardTitle>Car Repair</CardTitle>
                  <CardText>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                  </CardText>
                  <Button color="primary">View Service</Button>
                </CardBody>
              </Card>
            </Col>
            <Col className="mt-16">
              <Card>
                <CardBody className="backgroundImage">
                  <CardTitle>Carpentry</CardTitle>
                  <CardText>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                  </CardText>
                  <Button color="primary">View Service</Button>
                </CardBody>
              </Card>
            </Col>
            <Col className="mt-16">
              <Card>
                <CardBody className="backgroundImage">
                  <CardTitle>Landscaping</CardTitle>
                  <CardText>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                  </CardText>
                  <Button color="primary">View Service</Button>
                </CardBody>
              </Card>
            </Col>
            <Col className="mt-16">
              <Card>
                <CardBody className="backgroundImage">
                  <CardTitle>Cleaning</CardTitle>
                  <CardText>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                  </CardText>
                  <Button color="primary">View Service</Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="mt-16">
              <Card>
                <CardBody className="backgroundImage">
                  <CardTitle>Techical Support</CardTitle>
                  <CardText>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                  </CardText>
                  <Button color="primary">View Service</Button>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card className="mt-16">
                <CardBody className="backgroundImage">
                  <CardTitle>Consulting</CardTitle>
                  <CardText>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                  </CardText>
                  <Button color="primary">View Service</Button>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card className="mt-16">
                <CardBody className="backgroundImage">
                  <CardTitle>Haircuts</CardTitle>
                  <CardText>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                  </CardText>
                  <Button color="primary">View Service</Button>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card className="mt-16">
                <CardBody className="backgroundImage">
                  <CardTitle>Spa</CardTitle>
                  <CardText>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                  </CardText>
                  <Button color="primary">View Service</Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        <hr className="landingPageHr"></hr>

        {/* Bottom display lists */}
        <Container className="container-fluid">
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
