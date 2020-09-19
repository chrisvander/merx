import React, { useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Course } from './Course';
import { Link } from 'react-router-dom';

const courses = [
    {
        key: 1,
        title: "Introduction to Investing",
        description: "A quick introduction to the world of investing.",
        status: "Open"
    },
    {
        key: 2,
        title: "Introduction to Investing",
        description: "A quick introduction to the world of investing.",
        status: "Open"
    },
    {
        key: 3,
        title: "Introduction to Investing",
        description: "A quick introduction to the world of investing.",
        status: "Open"
    }
]

export const Dashboard = (props) => {
    return (
        <Container>
            <h1 className="mt-5">Learning Dashboard</h1>
            <br />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                {courses.map(course => (
                    <Card style={{ margin: '1em' }} key={course.key}>
                        <Card.Body>
                            <Card.Title>{course.title}</Card.Title>
                            <Card.Text>{course.description}</Card.Text>
                            <Link to={`/course/${course.key}`}>
                                <Button variant={course.status === "Open" ? "primary" : "secondary"}
                                >{course.status}</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            
        </Container>
    );
}