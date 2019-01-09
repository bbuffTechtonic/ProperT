import React from 'react';
import PropTypes from 'prop-types';
import Dashboard from './Dashboard';
import Login from './Login';

function Landing({ isLoggedIn, handleLoggedInUser, featureFlags }) {
  if (isLoggedIn) {
    return <Dashboard />;
  }

  return <Login handleLoggedInUser={handleLoggedInUser} featureFlags={featureFlags} />;
}

Landing.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleLoggedInUser: PropTypes.func.isRequired,
  featureFlags: PropTypes.objectOf(PropTypes.bool).isRequired,
};

export default Landing;
