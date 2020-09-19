import React, { useState } from 'react';
import { Container, Jumbotron, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

const reasons = [
  ["Literacy", "Get an educational foundation in finance, investing, and understanding how to make your money work for you."],
  ["Stability", "Create financial stability so in times of economic downturn you have a backup plan."],
  ["Retirement", "Ensure you are targeting to retire with enough money to last you for the rest of your life."],
  ["Wealth", "Grow your wealth to give you more options to do what you want with your life."]
]

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
          {reasons.map(([title, desc]) => (
            <Col key={title}>
              <h2>{title}</h2>
              <p>{desc}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </React.Fragment>
  );
}
