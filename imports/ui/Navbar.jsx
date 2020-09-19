import React from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

export const UEFANavbar = () => {
    return (
        <Navbar bg="light" variant="light" className="justify-content-between">
            <Container>
                <Navbar.Brand href="/"><b>merx.</b> | finance education</Navbar.Brand>

                <div className="justify-content-end">
                <React.Fragment>
                        <Button href="/login" variant="light" className="mr-3">Log In</Button>
                        <Button href="/get-started">Get Started</Button>
                        </React.Fragment>
                    {/* {Meteor.userId() ? 
                        <Button href="/logout" variant="light" className="mr-3">Log Out</Button>
                    :   (<React.Fragment>
                        <Button href="/login" variant="light" className="mr-3">Log In</Button>
                        <Button href="/get-started">Get Started</Button>
                        </React.Fragment>)} */}
                </div>
            </Container>
        </Navbar>
    );
}
