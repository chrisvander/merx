import React, { useState } from 'react';
import { Container, Jumbotron, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { reasons } from './GetStarted';

export const WelcomePage = () => {
  return (
    <React.Fragment>
      <Jumbotron fluid style={{ backgroundColor: '#242582', color: '#EBEBEB' }}>
        <Container>
          <h1>Welcome to <b>merx.</b></h1>
          <h3>We make financial education accessible for everyone.</h3>
          <br />
          {Meteor.userId() ? 
            <Link to="/dashboard"><Button>Learning Dashboard</Button></Link>
            : <Link to="/get-started"><Button style={{ 
                borderColor: '#F64C72',
                backgroundColor: '#F64C72' 
            }}>Get Started</Button></Link>
          }
        </Container>
      </Jumbotron>
      <Container>
        <Row>
          {reasons.map(([key, title, desc]) => (
            <Col key={key}>
              <h2>{title}</h2>
              <p>{desc}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </React.Fragment>
  );
}
