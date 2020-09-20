import React, { useState } from 'react';
import { Container, Jumbotron, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { reasons } from './data/reasons';

export const WelcomePage = () => {
  return (
    <React.Fragment>
      <Jumbotron fluid style={{ backgroundColor: '#242582', color: '#EBEBEB', margin: 0 }}>
        <Container>
          <Row>
            <Col style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
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
            </Col>
            <Col style={{
              display: 'flex',
              justifyContent: 'center',
              height: 400
            }}>
              <img src="/computer.png" style={{
                maxHeight: 400
              }}/>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      <div className="wavy-bg" style={{ display: 'flex', justifyContent: 'center' }}>
        <Container style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: -20 }}>
          <Row>
            {reasons.map(([key, title, desc]) => (
              <Col key={key} className="pink-bg" l={3}>
                <Card className="floating-pink-card">
                  <h2>{title}</h2>
                  <p>{desc}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}
