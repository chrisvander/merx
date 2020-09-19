import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { Accounts } from 'meteor/accounts-base';


class GetStarted extends React.Component {
    constructor(props) {
        super(props);
        this.email = React.createRef();
        this.password = React.createRef();
    }

    handleSubmit(event) {
        event.preventDefault();
        
        const email = this.email.current.value;
        const password = this.password.current.value;

        console.log("FORM SUBMITTED", email, password);

        Meteor.call("createUser", { email, password }, (err, userId) => {
            if (err) {
                console.log(err);
            } else {
                this.props.history.push("/dashboard");
            }
        });
    }

    render() {
        return (
            <Modal.Dialog className="pt-4">
                <Modal.Body>
                    <h1>Get Started</h1>
                    <br />
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control ref={this.email} type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
    
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control ref={this.password} type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal.Dialog>
        );
    }
};

export default GetStarted;