import React from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

export const UEFANavbar = () => {
    return (
        <Navbar bg="light" variant="light" className="justify-content-between">
            <Container>
                <Navbar.Brand href="/"><b>merx.</b>&nbsp;<span className="hide-mobile">| finance education</span></Navbar.Brand>
                <div className="justify-content-end">
                    {Meteor.userId() ? (
                        <React.Fragment>
                            <Button href="/profile" variant="light" className="mr-3">Profile</Button>
                            <Button href="/dashboard" variant="light" className="mr-3">Dashboard</Button>
                            <Button href="/logout" variant="danger" className="mr-3">Log Out</Button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Button href="/login" variant="light" className="mr-3">Log In</Button>
                            <Button href="/get-started" style={{ 
                                borderColor: '#F64C72',
                                backgroundColor: '#F64C72' 
                            }}>Get Started</Button>
                        </React.Fragment>
                    )}
                </div>
            </Container>
        </Navbar>
    );
}
