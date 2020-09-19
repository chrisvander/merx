import React from 'react';
import CourseOne from '../courses/courseOne.mdx';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const courseComponents = {
    1: <CourseOne />
}

export const Course = ({ match: { params: { courseID }}}) => {
  return (
    <Container>
        <br />
        <Link to='/dashboard'>
            <p style={{ color: 'gray', cursor: 'pointer' }}>
                <i className="fas fa-arrow-left" />&nbsp;&nbsp;Back to Dashboard
            </p>
        </Link>
        {courseComponents[courseID]}
    </Container>
  );
}
