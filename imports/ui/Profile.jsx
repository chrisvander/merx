import React, { useState, useEffect } from 'react';
import { Container, Jumbotron, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { CardDisplay } from './GetStarted';
import { reasons } from './data/reasons';


export const Profile = () => {
    const [selected, setSelected] = useState(null);
    const [editing, setEditing] = useState(false);

    const account = Meteor.user();

    useEffect(() => {
        if (account) 
            setSelected(account.profile.reason);
    }, [account]);

    console.log(account)

    return (
        <React.Fragment>
            <Jumbotron fluid style={{ backgroundColor: '#242582', color: '#EBEBEB' }}>
                <Container>
                    <h1>Profile</h1>
                    {account && <h3>Made just for you, {account.profile.name}.</h3>}
                    <br />
                    <Button onClick={() => setEditing(!editing)}>{editing ? 'Done' : 'Edit'}</Button>
                </Container>
            </Jumbotron>
            <Container>
                <Row>
                    <Col md={4}>
                        <h3>User Details</h3>
                        <Form.Group as={Row}>
                            <Form.Label column sm={4}><b>First Name</b></Form.Label>
                            <Col sm={8}>
                                {account && <Form.Control onChange={e => {
                                    Meteor.users.update(
                                        Meteor.userId(),
                                        {
                                            $set: {
                                                profile: {
                                                    ...account.profile,
                                                    name: e.target.value
                                                }
                                            }
                                        }
                                    );
                                }} plaintext={!editing} readOnly={!editing} defaultValue={account.profile.name} type="text" placeholder="Bob Smith" />}
                            </Col>
                            <Form.Label column sm={4}><b>Email</b></Form.Label>
                            <Col sm={8}>
                                
                                {account && <Form.Control onChange={e => {
                                    Meteor.users.update(
                                        Meteor.userId(),
                                        {
                                            $set: {
                                                username: e.target.value
                                            }
                                        }
                                    );
                                }} plaintext={!editing} readOnly={!editing} defaultValue={account.username} type="text" placeholder="email@yahoo.com" />}
                            </Col>
                        </Form.Group>
                    </Col>
                    <Col md={8}>
                        <h3>Goal</h3>
                        {reasons.map(([key, title, body, reason]) => 
                            <CardDisplay 
                                title={title} 
                                body={body} 
                                reason={reason} 
                                selected={selected === key}
                                setSelected={() => {
                                    Meteor.users.update(
                                        Meteor.userId(),
                                        {
                                            $set: {
                                                profile: {
                                                    ...account.profile,
                                                    reason: key
                                                }
                                            }
                                        }
                                    );
                                    setSelected(key);
                                }}/>
                        )}
                    </Col>
                </Row>
            </Container>
            <br /><br />
        </React.Fragment>
    )
}
