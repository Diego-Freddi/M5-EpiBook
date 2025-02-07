import React from 'react';
import { Container, Alert } from 'react-bootstrap';

const Welcome = () => {
  return (
    <Container className="my-4">
      <Alert variant="info" className="df-welcome">
        <h1 className="display-4">Benvenuto in EpiBooks!</h1>
        <p className="lead">La tua libreria digitale di fiducia</p>
      </Alert>
    </Container>
  );
};

export default Welcome; 