import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';

const courses = [
    {
        title: "Introduction to Investing",
        description: "A quick introduction to the world of investing.",
        status: "Complete"
    },
    {
        title: "Introduction to Investing",
        description: "A quick introduction to the world of investing.",
        status: "In Progress"
    },
    {
        title: "Introduction to Investing",
        description: "A quick introduction to the world of investing.",
        status: "Start"
    }
]

export const Dashboard = (props) => {
    return (
        <Container>
            <br /><br />
            <h1>Learning Dashboard</h1>
            <br />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                {courses.map(course => (
                    <Card style={{ margin: '1em' }}>
                        <Card.Body>
                            <Card.Title>{course.title}</Card.Title>
                            <Card.Text>{course.description}</Card.Text>
                            <Button variant={course.status === "Start" ? "primary" : "secondary"}>{course.status}</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            
        </Container>
    );
}