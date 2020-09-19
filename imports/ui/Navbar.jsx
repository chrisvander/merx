import React from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

export const UEFANavbar = () => {
    return (
        <Navbar bg="light" variant="light" className="justify-content-between">
            <Container>
                <Navbar.Brand href="/"><b>merx.</b> | finance education</Navbar.Brand>
                <div className="justify-content-end">
                    {Meteor.userId() ? (
                        <React.Fragment>
                            <Button href="/dashboard" variant="light" className="mr-3">Dashboard</Button>
                            <Button href="/logout" variant="danger" className="mr-3">Log Out</Button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Button href="/login" variant="light" className="mr-3">Log In</Button>
                            <Button href="/get-started">Get Started</Button>
                        </React.Fragment>
                    )}
                </div>
            </Container>
        </Navbar>
    );
}
