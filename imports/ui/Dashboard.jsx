import React, { useState } from 'react';
import { Container, Card, Button, Jumbotron } from 'react-bootstrap';
import { Course } from './Course';
import { Link } from 'react-router-dom';

const intro = [
    {
        key: 1,
        title: "Introduction to Investing",
        description: "A quick introduction to the world of investing.",
        status: "Open"
    },
    {
        key: 4,
        title: "What's Interest?",
        description: "An introduction to the fundamentals of making money work for you.",
        status: "Coming Soon"
    },
    {
        key: 6,
        title: "Making Debt Pay You",
        description: "Introduction to the math behind leverage and how rich people stay rich.",
        status: "Coming Soon"
    }
]

const personal_finance = [
    {
        key: 2,
        title: "Introduction to Saving",
        description: "An introduction to why saving money and starting early is important.",
        status: "Open"
    }
]

const stocks = [
    {
        key: 3,
        title: "Portfolio Construction",
        description: "How to construct optimal portfolios.",
        status: "Open"
    }
]

const re = [
    {
        key: 5,
        title: "Introduction to Mortgages",
        description: "How to use mortgages to your advantage.",
        status: "Open"
    }
]

const CourseCard = ({ course }) => (
    <Card style={{ margin: '1em' }} key={course.key}>
        <Card.Body>
            <Card.Title>{course.title}</Card.Title>
            <Card.Text>{course.description}</Card.Text>
            <Link to={course.status === "Coming Soon" ? '' : `/course/${course.key}`}>
                <Button 
                    variant={course.status === "Coming Soon" ? "outline-secondary" : "primary"}
                    disabled={course.status === "Coming Soon"}
                >{course.status}</Button>
            </Link>
        </Card.Body>
    </Card>
);

export const Dashboard = (props) => {
    return (
        <React.Fragment>
            <Jumbotron fluid style={{ backgroundColor: '#242582', color: '#EBEBEB' }}>
                <Container>
                <h1>Learning Dashboard</h1>
                <h3>Access all your courses here.</h3>
                </Container>
            </Jumbotron>
            <Container>
                <h3>Introduction</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                    {intro.map(course => <CourseCard course={course} />)}
                </div>
                <h3>Personal Finance</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                    {personal_finance.map(course => <CourseCard course={course} />)}
                </div>
                <h3>Stocks & Bonds</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                    {stocks.map(course => <CourseCard course={course} />)}
                </div>
                <h3>Real Estate</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                    {re.map(course => <CourseCard course={course} />)}
                </div>
            </Container>
        </React.Fragment>
    );
}