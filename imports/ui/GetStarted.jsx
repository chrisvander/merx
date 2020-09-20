import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Form, Button, Modal, Container, Card, Alert } from 'react-bootstrap';
import { Accounts } from 'meteor/accounts-base';
import { Redirect } from 'react-router-dom';
import { reasons } from './data/reasons';

export const CardDisplay = ({ title, body, reason, selected, setSelected }) => {
    return (
        <Card
            className={`mt-4 selectable-card ${selected && 'border-green'}`}
            onClick={() => {
                setSelected();
            }}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle>{body}</Card.Subtitle>
                <br />
                <Card.Text>{reason}</Card.Text>
            </Card.Body>
        </Card>
    )
}

class GetStarted extends React.Component {
    constructor(props) {
        super(props);
        this.email = React.createRef();
        this.password = React.createRef();
        this.name = React.createRef();

        this.state = {
            dialog: false,
            selected: null,
            redirect: false,
            error: null
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const email = this.email.current.value;
        const password = this.password.current.value;
        const name = this.name.current.value;

        console.log("FORM SUBMITTED", email, password);

        Meteor.call("createCustomUser", email, password, this.state.selected, name, (err) => {
            if (err) {
                console.error(err);
                this.setState({ error: err });
            } else {
                Meteor.loginWithPassword(email, password, err => {
                    if (err) console.error(err)
                    else this.setState({ redirect: true });
                });
            }
        });
    }

    render() {
        if (this.state.redirect) return <Redirect to="/dashboard" />
        return (
            <React.Fragment>
                <Container style={{ display: 'flex', minHeight: '80vh', alignItems: 'center' }}>
                    <div className="w-100 mt-8 mb-8">
                        <h1 className="mt-6">What are your financial goals?</h1>
                        {reasons.map(([key, title, body, reason]) =>
                            <CardDisplay
                                key={key}
                                title={title}
                                body={body}
                                reason={reason}
                                selected={this.state.selected === key}
                                setSelected={() => this.setState({ selected: key })} />
                        )}
                        {this.state.selected != null && <Button className="mt-5" onClick={() => this.setState({ dialog: true })}>Continue</Button>}
                    </div>
                </Container>
                {this.state.dialog && <React.Fragment>
                    <div style={{
                        height: '100vh',
                        width: '100vw',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        backgroundColor: 'black',
                        opacity: 0.4
                    }} />
                    <Modal.Dialog className="pt-4" style={{
                        position: 'absolute',
                        top: '100px',
                        left: '50%',
                        transform: 'translate(-50%, 0)',
                        minWidth: 320,
                        borderRadius: 20
                    }}>
                        <Modal.Body style={{ padding: '2em' }}>
                            <h1>Get Started</h1>
                            {this.state.error && <Alert variant="danger">
                                {this.state.error.message}
                            </Alert>}
                            <br />
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control ref={this.name} type="text" placeholder="Enter your first name" />
                                </Form.Group>
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
                                <Button variant="primary" type="submit" onClick={this.handleSubmit.bind(this)}>
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