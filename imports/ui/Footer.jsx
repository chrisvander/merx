import React from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export const Footer = () => {
    return (
        <div className="footer-bg">
            <Container className="pt-3">
                <br />
                <center>Copyright <b>merx.</b> 2020</center>
            </Container>
        </div>
    );
}
