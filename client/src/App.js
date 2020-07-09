import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import validator from 'validator';
import axios from 'axios';
import fileDownload from 'js-file-download';

import './App.scss';

function App() {
  const [url, setUrl] = useState('');

  const handleChange = (e) => {
    e.persist();
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validURL = validator.isURL(url, { require_protocol: true });

    if (!validURL) {
      console.log(
        'Please ensure this URL is correct and includes the https protocol'
      );
    } else {
      console.log(`URL is: ${url}`);

      axios({
        url: `http://localhost:5000/download?URL=${url}`,
        method: 'GET',
        responseType: 'blob',
      })
        .then((res) => {
          console.log(res);
          fileDownload(res.data, 'video.mp4');
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    console.log(url);
  }, [url]);

  return (
    <div className="App">
      <Row className="justify-content-center align-items-center vertical-center">
        <Col>
          <Container>
            <Row className="justify-content-center">
              <Col lg={12}>
                <h1 className="text-center">Download Youtube Videos</h1>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row className="justify-content-center">
              <Col lg={6}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="http://..."
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Button className="mx-2">.mp4</Button>
              <Button className="mx-2">.mp3</Button>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default App;
