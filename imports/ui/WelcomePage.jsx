import React, { useState } from 'react';
import { Container, Jumbotron } from 'react-bootstrap';

export const WelcomePage = () => {
  return (
    <Jumbotron fluid>
      <Container>
        <h1>Welcome to <b>merx.</b></h1>
        <h3>We make financial education accessible for everyone.</h3>
      </Container>
    </Jumbotron>
  );
}
