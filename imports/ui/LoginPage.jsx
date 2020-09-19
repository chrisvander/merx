import React, { useState, useRef  } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

export const LoginPage = (props) => {
  
  const [redirect, setRedirect] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = (evt) => {
    evt.preventDefault();
    Meteor.loginWithPassword(username, password, err => {
      if (err) console.error("DNE")
      else props.history.push("/dashboard");
    });
  }
  // if (redirect) return <Redirect to='/dashboard' />
  return (
    <Modal.Dialog>
      <Modal.Body>
        <h1>Login</h1>
        <br />
        <Form onSubmit={login}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control onChange={u => setUsername(u.target.value)} type="email" placeholder="Email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control onChange={p => setPassword(p.target.value)} type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
              Login
          </Button>
          <a href="/get-started">
            <Button className="mx-4" variant="light">
              Sign Up
            </Button>
          </a>
        </Form>
      </Modal.Body>
    </Modal.Dialog>
  );
};
