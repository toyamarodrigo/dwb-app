import React from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Row className="justify-content-center align-items-center vertical-center">
        <Col>
          <Container>
            <Row className="justify-content-center">
              <Col lg={12}>
                <h1 className="text-center">dw-tube</h1>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row className="justify-content-center">
              <Col lg={6}>
                <Form>
                  <Form.Group>
                    <Form.Control type="text" placeholder="http://..." />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default App;
