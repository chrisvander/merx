import React from 'react';
import PortfolioPlayground from '../experiments/portfolio.mdx';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const experimentComponents = {
    1: <PortfolioPlayground />,
}

export const Experiments = ({ match: { params: { experimentID }}}) => {
  return (
    <Container style={{minHeight: '90vh'}}>
        <br />
        <Link to='/dashboard'>
            <p style={{ color: 'gray', cursor: 'pointer' }}>
                <i className="fas fa-arrow-left" />&nbsp;&nbsp;Back to Dashboard
            </p>
        </Link>
        {experimentComponents[experimentID]}
    </Container>
  );
}
