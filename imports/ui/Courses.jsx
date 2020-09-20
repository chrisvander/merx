import React from 'react';
import IntroToInvesting from '../courses/introToInvesting.mdx';
import IntroToSaving from '../courses/introToSaving.mdx';
import BenefitsOfDiversification from '../courses/benefitsOfDiversification.mdx';
import Correlation from '../courses/correlation.mdx';
import PortfolioConstruction from '../courses/portfolioConstruction.mdx'

import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const courseComponents = {
    1: <IntroToInvesting />,
    2: <IntroToSaving />,
    3: <BenefitsOfDiversification />,
    6: <Correlation />,
    7: <PortfolioConstruction />
}

export const Courses = ({ match: { params: { courseID }}}) => {
  const user = Meteor.user();
  let courseStatus = user ? user.profile.courseStatus : null;
  return (
    <Container>
        <br />
        <Link to='/dashboard'>
            <p style={{ color: 'gray', cursor: 'pointer' }}>
                <i className="fas fa-arrow-left" />&nbsp;&nbsp;Back to Dashboard
            </p>
        </Link>
        {courseComponents[courseID]}
        {user && <center><Button 
          variant="secondary"
          onClick={() => {
            if (courseStatus[courseID] == "completed")
              courseStatus[courseID] = "incomplete";
            else 
              courseStatus[courseID] = "completed";
            Meteor.users.update(
              Meteor.userId(),
              {
                $set: {
                  profile: { 
                    ...user.profile,
                    courseStatus
                  }
                }
              }
            );
          }} 
          className="mb-8">
            Mark Course as {courseStatus[courseID] == "completed" ? 'Incomplete' : 'Completed'}
          </Button>
        </center>}
        <br /><br />
    </Container>
  );
}
