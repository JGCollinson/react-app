import React from "react";
import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Container } from "../../components/Grid";

const NotFound = () => (
  <Container fluid>
    <Row>
      <Col size="md-12">
        <Jumbotron>
          <h1>404 Page Not Found, Bro</h1>
          <br/>
          <h1>
            <span role="img" aria-label="Skull & Cross Bones">
              ☢☹☣
            </span>
          </h1>
        </Jumbotron>
      </Col>
    </Row>
  </Container>
);

export default NotFound;