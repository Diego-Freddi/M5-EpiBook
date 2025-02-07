import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="df-footer bg-dark text-white py-4 mt-auto">
      <Container>
        <div className="text-center">
          <p className="mb-0">&copy; 2024 EpiBooks - Tutti i diritti riservati</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 