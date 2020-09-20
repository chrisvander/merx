import React, { useState } from 'react';
import { Container, Card, Button, Jumbotron, Badge, Row, Col, ProgressBar } from 'react-bootstrap';
import { Courses } from './Courses';
import { Link } from 'react-router-dom';
import { sections, catalog, tracks } from './data/catalog';

const CourseCard = ({ course }) => {
    const user = Meteor.user();
    const courseStatus = (user) ? user.profile.courseStatus : {};
    return (
        <Card style={{ margin: '1em' }} key={course.key}>
            <Card.Body>
                <Card.Title>{course.title}&nbsp;&nbsp;<br />
                    <Badge style={{ fontSize: "0.6em" }} variant="primary">{course.difficulty}</Badge>{'  '}
                    <Badge style={{ fontSize: "0.6em" }} variant={courseStatus[course.key] === 'completed' ? "success" : "secondary"}>
                        {courseStatus[course.key] || "incomplete"}
                    </Badge>
                </Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <Link to={course.status === "Coming Soon" ? '' : `/course/${course.key}`}>
                    <Button 
                        variant={course.status === "Coming Soon" ? "outline-secondary" : "primary"}
                        disabled={course.status === "Coming Soon"}
                    >{course.status}</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

export const Dashboard = (props) => {
    const user = Meteor.user();
    const username = (user) ? user.profile.name : '';
    const courseStatus = (user) ? user.profile.courseStatus : {};
    const track = user ? tracks[user.profile.reason] : 0;
    // console.log(user ? Object.values(user.profile.courseStatus).filter(s => s === 'completed').length / catalog.length : 0)

    return (
        <React.Fragment>
            <Jumbotron fluid style={{ backgroundColor: '#242582', color: '#EBEBEB' }}>
                <Container>
                <h1>Learning Dashboard</h1>
                <h3>Access all your courses here.</h3>
                {user && <div style={{ padding: "20px", marginTop: "2em", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "20px" }}>
                    <h3 style={{ padding: "5px"}}>Your Course Progress</h3>
                    <ProgressBar variant="info" now={parseInt(Object.values(user.profile.courseStatus).filter(s => s === 'completed').length * 100 / catalog.length)} />
                </div>}
                </Container>
            </Jumbotron>
            <Container>
                <h3>Recommended for you, {username}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                {
                    catalog
                        .filter(course => course.track.includes(track))
                        .map(course => <CourseCard key={course.key} course={course} />)
                }
                </div>

                <h5 className="mt-4">Try it out!</h5>
                <Row>
                    <Col md={6}>
                        <Link to="/experiment/1">
                            <Card className="selectable-card" style={{ margin: '1em' }}>
                                <Card.Body>
                                    <Card.Title className="text-dark">Portfolio Playground</Card.Title>
                                    <Card.Subtitle className="text-secondary">Try your hand at building out a portfolio!</Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                </Row>
                

                {Object.keys(sections).map(section_code => {
                    section_name = sections[section_code]

                    return (
                        <div className="mt-5">
                            <h3>{section_name}</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                            {
                                catalog
                                    .filter(course => course.category == section_code)
                                    .map(course => <CourseCard key={course.key} course={course} />)
                            }
                            </div>
                        </div>
                    )
                })}
            </Container>
        </React.Fragment>
    );
}