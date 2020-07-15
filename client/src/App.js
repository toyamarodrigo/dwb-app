import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
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

  const formats = [
    { label: '.mp3 [128kb]', value: 1 },
    { label: '.mp3 [320kb]', value: 2 },
    { label: '.mp4 [420p]', value: 3 },
    { label: '.mp4 [720p]', value: 4 },
    { label: '.mp4 [1080p]', value: 5 },
  ];

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
              <Col lg={5}>
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
              <Col lg={2}>
                <Select placeholder="Select Format" options={formats}></Select>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col lg={2} className="text-center">
                <Button className="btn-block btn">Download</Button>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default App;
