import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Form, Button, Modal, Container } from 'react-bootstrap';
import { Accounts } from 'meteor/accounts-base';


class GetStarted extends React.Component {
    constructor(props) {
        super(props);
        this.email = React.createRef();
        this.password = React.createRef();
        this.state = {
            dialog: false
        }
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
            <React.Fragment>
                <Container style={{ display: 'flex', height: '100vh', alignItems: 'center'}}>
                    <h1 className="mt-6">What are your financial goals?</h1>
                    <Button onClick={() => this.setState({dialog: true})}>Open</Button>
                </Container>
                {this.state.dialog && <React.Fragment>
                    <div style={{ 
                        height: '100vh', 
                        width: '100vw', 
                        position: 'absolute', 
                        top:0,
                        left:0,
                        backgroundColor:'black', 
                        opacity: 0.4
                    }} />
                    <Modal.Dialog className="pt-4" style={{ 
                        position: 'absolute', 
                        top: '100px',
                        left: '50%',
                        transform: 'translate(-50%, 0)',
                        minWidth: 320
                    }}>
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
                                &nbsp;
                                <Button variant="secondary" onClick={() => this.setState({ dialog: false })}>
                                    Cancel
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal.Dialog>
                </React.Fragment>}
            </React.Fragment>
        );
    }
};

export default GetStarted;