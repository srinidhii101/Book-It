/* Landing Page */

//wrapping the page in the default layout
import DefaultLayout from "../layouts/default";

//importing modules
import Link from 'next/link';
import { Container, Row, Col, ListGroup, Card, Button } from 'react-bootstrap';

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
                <Card.Body className="backgroundImage">
                  <Card.Title>Car Repair</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                  </Card.Text>
                  <Button variant="primary">View Service</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col className="mt-16">
              <Card>
                <Card.Body className="backgroundImage">
                  <Card.Title>Carpentry</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                  </Card.Text>
                  <Button variant="primary">View Service</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col className="mt-16">
              <Card>
                <Card.Body className="backgroundImage">
                  <Card.Title>Landscaping</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                  </Card.Text>
                  <Button variant="primary">View Service</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col className="mt-16">
              <Card>
                <Card.Body className="backgroundImage">
                  <Card.Title>Cleaning</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                  </Card.Text>
                  <Button variant="primary">View Service</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="mt-16">
              <Card>
                <Card.Body className="backgroundImage">
                  <Card.Title>Techical Support</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                  </Card.Text>
                  <Button variant="primary">View Service</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="mt-16">
                <Card.Body className="backgroundImage">
                  <Card.Title>Consulting</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                  </Card.Text>
                  <Button variant="primary">View Service</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="mt-16">
                <Card.Body className="backgroundImage">
                  <Card.Title>Haircuts</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                  </Card.Text>
                  <Button variant="primary">View Service</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="mt-16">
                <Card.Body className="backgroundImage">
                  <Card.Title>Spa</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                  </Card.Text>
                  <Button variant="primary">View Service</Button>
                </Card.Body>
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
              <ListGroup.Item action>Landscaping</ListGroup.Item>
              <ListGroup.Item action>Haircuts</ListGroup.Item>
              <ListGroup.Item action>Techical Support</ListGroup.Item>
            </ListGroup>
          </Col>
            <Col className="mt-16">
              <ListGroup>
                <label className="landingPageListTitle text-muted">Recently Requested</label>
                <ListGroup.Item action>Henry's Haircuts</ListGroup.Item>
                <ListGroup.Item action>Tashi's Tech</ListGroup.Item>
                <ListGroup.Item action>Carter's Carpentry</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col className="mt-16">
              <ListGroup>
                <label className="landingPageListTitle text-muted">Newly Posted</label>
                <ListGroup.Item action>Larry's Landscaping</ListGroup.Item>
                <ListGroup.Item action>Carol's Consulting</ListGroup.Item>
                <ListGroup.Item action>Clare's Cleaning</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>

      </DefaultLayout>
    </div>
  );
}

export default Index;
