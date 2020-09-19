import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Form, Button, Modal, Container, Card } from 'react-bootstrap';
import { Accounts } from 'meteor/accounts-base';

const reasons = [
    [
        "Literacy", 
        "Get an educational foundation in finance, investing, and understanding how to make your money work for you.",
        "Choose this option if you're stable financially and just looking to learn more about how to optimize your existing investments or want to know how to utilize some level of savings."
    ],
    [
        "Stability", 
        "Create financial stability so in times of economic downturn you have a backup plan.",
        "Choose this option if you lack savings or don't know how to afford bills and your living expenses if you didn't have a job."
    ],
    [
        "Retirement", 
        "Ensure you are targeting to retire with enough money to last you for the rest of your life.",
        "Choose this option if you have enough savings for if the market went into a downturn or you lost a job, but want to set yourself up well to retire."
    ],
    [
        "Wealth", 
        "Grow your wealth to give you more options to do what you want with your life.",
        "Choose this option if you have disposable savings that you want to put to work."
    ]
]

const CardDisplay = ({ title, body, reason, onClick }) => {
    const [selected, setSelected] = useState(false);

    return (
        <Card 
            className={`mt-4 selectable-card ${selected && 'border-green'}`}
            onClick={() => {
                setSelected(true);
                onClick();
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
                <Container style={{ display: 'flex', height: '80vh', alignItems: 'center'}}>
                    <div className="w-100">
                        <h1 className="mt-6">What are your financial goals?</h1>
                        {reasons.map(([title, body, reason]) => 
                            <CardDisplay 
                                title={title} 
                                body={body} 
                                reason={reason} 
                                onClick={() => this.setState({ dialog: true })}/>
                        )}
                    </div>
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