import React from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export const UEFANavbar = () => {
    return (
        <Navbar bg="light" variant="light" className="justify-content-between">
            <Container>
                <Link to="/"><Navbar.Brand><b>merx.</b>&nbsp;<span className="hide-mobile">| finance education</span></Navbar.Brand></Link>
                <div className="justify-content-end">
                    {Meteor.userId() ? (
                        <React.Fragment>
                            <Link to="/profile"><Button variant="light" className="mr-3">Profile</Button></Link>
                            <Link to="/dashboard"><Button variant="light" className="mr-3">Dashboard</Button></Link>
                            <Link to="/logout"><Button variant="danger" className="mr-3">Log Out</Button></Link>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Link to="/login"><Button variant="light" className="mr-3">Log In</Button></Link>
                            <Link to="/get-started"><Button style={{ 
                                borderColor: '#F64C72',
                                backgroundColor: '#F64C72' 
                            }}>Get Started</Button></Link>
                        </React.Fragment>
                    )}
                </div>
            </Container>
        </Navbar>
    );
}
