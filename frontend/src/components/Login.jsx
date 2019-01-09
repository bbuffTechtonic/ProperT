/* eslint-disable no-alert */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Card, CardBody, Col, Collapse, Row,
} from 'reactstrap';
import '../styles/Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    const hasForgotPassToken = this.getForgotPassToken();
    this.loginURI = 'https://proper-t-express.herokuapp.com/auth';
    this.state = {
      landingCard: [!hasForgotPassToken, false, false, hasForgotPassToken],
    };
  }

  componentDidUpdate(prevProps) {
    const { featureFlags } = this.props;
    if (prevProps.featureFlags !== featureFlags) {
      this.checkGoogleAuth(featureFlags);
    } return null;
  }

  checkGoogleAuth = (authProp) => {
    const { googleAuthEnabled } = authProp;
    this.setState({ auth: googleAuthEnabled });
  }

  handleLogin = (e) => {
    const { handleLoggedInUser } = this.props;
    e.preventDefault();
    const { email, password } = e.target;
    axios.post(`${this.loginURI}/login`, {
      email: email.value,
      password: password.value,
    })
      .then((response) => {
        sessionStorage.setItem('jwt_token', response.data.token);
        handleLoggedInUser();
      })
      .catch(error => alert(error.response.data));
  };

  handleSignUp = (e) => {
    e.preventDefault();
    const {
      firstName, lastName, email, password,
    } = e.target;
    const { handleLoggedInUser } = this.props;
    axios.post(`${this.loginURI}/register`, {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    })
      .then((response) => {
        sessionStorage.setItem('jwt_token', response.data.token);
        handleLoggedInUser();
      })
      .catch((err) => {
        // eslint-disable-next-line no-unused-expressions
        (err.response.data.code === 11000)
          ? alert('An account has already been registerd for the email you\'ve entered')
          : alert('There was a problem registering the user');
      });
  };

  handleForgotPassword = (e) => {
    e.preventDefault();
    const { forgotPassEmail } = e.target;
    axios.post(`${this.loginURI}/forgot`, {
      email: forgotPassEmail.value,
    })
      .then(() => {
        alert(`A link to reset your password has been sent to ${forgotPassEmail.value}`);
      })
      .catch(error => alert(error.response.data));
  };

  getForgotPassToken = () => {
    const params = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (query, key, value) => {
      params[key] = value;
    });
    const resetPassToken = params.reset_pass_token;
    // eslint-disable-next-line no-unused-expressions
    resetPassToken
      ? sessionStorage.setItem('reset_pass_token', resetPassToken)
      : false;
    return !!resetPassToken;
  };

  handleResetPassword = (e) => {
    e.preventDefault();
    const { resetPass, confirmPass } = e.target;
    if (resetPass.value.length < 8) {
      alert('Your password must be at least 8 characters');
      return;
    }

    if (resetPass.value !== confirmPass.value) {
      alert('Confirm password did not match New password');
      return;
    }

    axios('https://proper-t-express.herokuapp.com/user/put', {
      method: 'put',
      headers: { 'x-access-token': sessionStorage.getItem('reset_pass_token') },
      data: {
        resetPassword: resetPass.value,
      },
    })
      .then(() => {
        sessionStorage.removeItem('reset_pass_token');
        alert('Your password has been reset');
        document.getElementById('resetPassForm').reset();
        window.location = 'http://127.0.0.1:3000';
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert('Token has expired, please request a new link to reset your password');
          this.setState({
            landingCard: [false, false, true, false],
          });
          return;
        }

        alert('There was a problem resetting your password');
      });
  };

  toggleLandingCard = (card) => {
    const { landingCard } = this.state;
    const prevState = landingCard;
    const state = prevState.map((x, index) => (card === index ? !x : false));

    this.setState({
      landingCard: state,
    });
  };

  render = () => {
    const { landingCard, loginEmail, loginPassword, auth } = this.state;
    if (auth) {
      return (
        <div className="container p-0 p-sm-3">
          <Row className="mt-5 justify-content-center">
            <Col sm="7" md="5" lg="6" xl="6">
              <div id="landingCard">
                <Collapse isOpen={landingCard[0]} data-parent="#landingCard" id="loginCard" aria-labelledby="loginCard">
                  <div className="card" id="loginCard">
                    <CardBody>
                      <h1 className="text-center">ProperT</h1>
                      <div className="google-login">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block mb-2"
                        >
                          <i className="fab fa-google" />
                          {' '}
                          Sign in with Google
                        </button>
                        <div className="row">
                          <div className="col">
                            <hr />
                          </div>
                          <div className="col-3">
                            <p className="text-center">or</p>
                          </div>
                          <div className="col">
                            <hr />
                          </div>
                        </div>
                      </div>
                      <form id="signinForm" onSubmit={this.handleLogin}>
                        <div className="form-group email">
                          <div className="input-group email">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text"
                                id="inputGroupPrependEmail"
                              >
                                <i className="far fa-envelope" />
                              </span>
                            </div>
                            <input
                              name="email"
                              type="email"
                              className="form-control"
                              id="signInEmail"
                              aria-describedby="signInEmail"
                              placeholder="Email"
                              required
                              value={loginEmail}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="form-group password">
                          <div className="input-group password">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text"
                                id="inputGroupPrependPassword"
                              >
                                <i className="fas fa-lock" />
                              </span>
                            </div>
                            <input
                              name="password"
                              type="password"
                              className="form-control"
                              id="signInPassword"
                              aria-describedby="signInPassword"
                              placeholder="Password"
                              required
                              value={loginPassword}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="forgot pb-1 text-right">
                          <button
                            type="button"
                            className="link-button"
                            onClick={() => this.toggleLandingCard(2)}
                            aria-expanded={landingCard[2]}
                          >
                            <small>Forgot Password?</small>
                          </button>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-success btn-block"
                        >
                            Sign in
                        </button>
                        <div className="new user text-center">
                          <hr />
                          <p>
                              New User?
                            {' '}
                            <button
                              type="button"
                              className="link-button"
                              onClick={() => this.toggleLandingCard(1)}
                              aria-expanded={landingCard[1]}
                            >
                                Sign Up
                            </button>
                          </p>
                        </div>
                      </form>
                    </CardBody>
                  </div>
                </Collapse>
                <Collapse isOpen={landingCard[1]} data-parent="#landingCard" id="signUpCard">
                  <Card>
                    <CardBody>
                      <h1 className="text-center">ProperT</h1>
                      <div className="google-signup">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block mb-2"
                        >
                          <i className="fab fa-google" />
                          {' '}
                          Sign up with Google
                        </button>
                        <div className="row">
                          <div className="col">
                            <hr />
                          </div>
                          <div className="col-3">
                            <p className="text-center">or</p>
                          </div>
                          <div className="col">
                            <hr />
                          </div>
                        </div>
                      </div>
                      <form id="signupForm" onSubmit={this.handleSignUp}>
                        <div className="form-group first-name">
                          <div className="input-group last">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text"
                                id="inputGroupPrependFirstName"
                              >
                                <i className="far fa-user" />
                              </span>
                            </div>
                            <input
                              type="text"
                              name="firstName"
                              className="form-control"
                              id="signUpFirstName"
                              onChange={this.handleInputChange}
                              aria-describedby="firstName"
                              placeholder="First"
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group last-name">
                          <div className="input-group last">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text"
                                id="inputGroupPrependLastName"
                              >
                                <i className="far fa-user" />
                              </span>
                            </div>
                            <input
                              type="text"
                              name="lastName"
                              className="form-control"
                              id="signUpLastName"
                              onChange={this.handleInputChange}
                              aria-describedby="lastName"
                              placeholder="Last"
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group email">
                          <div className="input-group email">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text"
                                id="inputGroupPrependUpEmail"
                              >
                                <i className="far fa-envelope" />
                              </span>
                            </div>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              id="signUpEmail"
                              onChange={this.handleInputChange}
                              aria-describedby="signUpEmail"
                              placeholder="Email"
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group password">
                          <div className="input-group password">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text"
                                id="inputGroupPrependUpPassword"
                              >
                                <i className="fas fa-lock" />
                              </span>
                            </div>
                            <input
                              type="password"
                              name="password"
                              className="form-control"
                              id="signUpPassword"
                              onChange={this.handleInputChange}
                              aria-describedby="signUpPassword"
                              placeholder="Create Password"
                              minLength="8"
                              required
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-success btn-block"
                        >
                        Sign Up
                        </button>
                        <div className="new user text-center">
                          <hr />
                          <p>
                            Already have an account?
                            {' '}
                            <button
                              type="button"
                              className="link-button"
                              onClick={() => this.toggleLandingCard(0)}
                              aria-expanded={landingCard[1]}
                            >
                              Sign In
                            </button>
                          </p>
                        </div>
                      </form>
                    </CardBody>
                  </Card>
                </Collapse>
                <Collapse isOpen={landingCard[2]} data-parent="#landingCard" id="forgotPassCard">
                  <Card>
                    <CardBody className="pb-2">
                      <h6 className="reset-instructions">
                        Enter your email address and we will send you a link to reset your password
                      </h6>
                      <form id="forgotPassForm" onSubmit={this.handleForgotPassword}>
                        <div className="form group email">
                          <div className="input-group email">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text"
                                id="inputGroupPrepend2"
                              >
                                <i className="far fa-envelope" />
                              </span>
                            </div>
                            <input
                              type="email"
                              className="form-control"
                              id="forgotPassEmail"
                              name="forgotPassEmail"
                              placeholder="Email"
                              aria-describedby="inputGroupPrepend2"
                              required
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-success btn-block mt-3"
                        >
                        Send Email
                        </button>
                        <div className="new user text-center">
                          <hr className="mb-1" />
                          <small>
                            <button
                              type="button"
                              className="link-button"
                              onClick={() => this.toggleLandingCard(0)}
                              aria-expanded={landingCard[1]}
                            >
                              Return to Sign In
                            </button>
                          </small>
                        </div>
                      </form>
                    </CardBody>
                  </Card>
                </Collapse>
                <Collapse isOpen={landingCard[3]} data-parent="#landingCard" id="resetPassCard">
                  <Card>
                    <CardBody>
                      <h6 className="reset-instructions">
                          Reset your password
                      </h6>
                      <form id="resetPassForm" onSubmit={this.handleResetPassword}>
                        <div className="form-group resetPassword">
                          <div className="input-group resetPassword">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text"
                                id="inputGroupPrependResetPass"
                              >
                                <i className="fas fa-lock" />
                              </span>
                            </div>
                            <input
                              name="resetPass"
                              type="password"
                              className="form-control"
                              id="resetPass"
                              aria-describedby="resetPassword"
                              placeholder="New Password"
                              minLength="8"
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group confirmPass">
                          <div className="input-group confirmPass">
                            <div className="input-group-prepend">
                              <span
                                className="input-group-text"
                                id="inputGroupPrependConfirmPass"
                              >
                                <i className="fas fa-lock" />
                              </span>
                            </div>
                            <input
                              name="confirmPass"
                              type="password"
                              className="form-control"
                              id="ConfirmPass"
                              aria-describedby="ConfirmPassword"
                              placeholder="Confirm Password"
                              required
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-success btn-block"
                        >
                              Reset
                        </button>
                      </form>
                    </CardBody>
                  </Card>
                </Collapse>
              </div>
            </Col>
            <div className="col-sm-10 col-md-5 order-md-first col-lg-6 col-xl-6 mt-md-0 mt-3">
              <div className="card border-0" id="aboutUs">
                <div className="card-body">
                  <h1 className="card-title text-center" id="about-us-title">About Us</h1>
                  <p className="card-text">We have created a simple modern interface to manage your rental units. Record revenue and expenses, access local leasing resources, and streamline the year-end tax preparation process. Landlord On!</p>
                </div>
              </div>
            </div>
          </Row>
        </div>
      );
    }
    return (
      <div className="container p-0 p-sm-3">
        <Row className="mt-5 justify-content-center">
          <Col sm="7" md="5" lg="6" xl="6">
            <div id="landingCard">
              <Collapse isOpen={landingCard[0]} data-parent="#landingCard" id="loginCard" aria-labelledby="loginCard">
                <div className="card" id="loginCard">
                  <CardBody>
                    <h1 className="text-center">ProperT</h1>
                    <form id="signinForm" onSubmit={this.handleLogin}>
                      <div className="form-group email">
                        <div className="input-group email">
                          <div className="input-group-prepend">
                            <span
                              className="input-group-text"
                              id="inputGroupPrependEmail"
                            >
                              <i className="far fa-envelope" />
                            </span>
                          </div>
                          <input
                            name="email"
                            type="email"
                            className="form-control"
                            id="signInEmail"
                            aria-describedby="signInEmail"
                            placeholder="Email"
                            required
                            value={loginEmail}
                            onChange={this.handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="form-group password">
                        <div className="input-group password">
                          <div className="input-group-prepend">
                            <span
                              className="input-group-text"
                              id="inputGroupPrependPassword"
                            >
                              <i className="fas fa-lock" />
                            </span>
                          </div>
                          <input
                            name="password"
                            type="password"
                            className="form-control"
                            id="signInPassword"
                            aria-describedby="signInPassword"
                            placeholder="Password"
                            required
                            value={loginPassword}
                            onChange={this.handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="forgot pb-1 text-right">
                        <button
                          type="button"
                          className="link-button"
                          onClick={() => this.toggleLandingCard(2)}
                          aria-expanded={landingCard[2]}
                        >
                          <small>Forgot Password?</small>
                        </button>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-success btn-block"
                      >
                          Sign in
                      </button>
                      <div className="new user text-center">
                        <hr />
                        <p>
                            New User?
                          {' '}
                          <button
                            type="button"
                            className="link-button"
                            onClick={() => this.toggleLandingCard(1)}
                            aria-expanded={landingCard[1]}
                          >
                              Sign Up
                          </button>
                        </p>
                      </div>
                    </form>
                  </CardBody>
                </div>
              </Collapse>
              <Collapse isOpen={landingCard[1]} data-parent="#landingCard" id="signUpCard">
                <Card>
                  <CardBody>
                    <h1 className="text-center">ProperT</h1>
                    <div className="google-signup">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block mb-2"
                      >
                        <i className="fab fa-google" />
                        {' '}
                        Sign up with Google
                      </button>
                      <div className="row">
                        <div className="col">
                          <hr />
                        </div>
                        <div className="col-3">
                          <p className="text-center">or</p>
                        </div>
                        <div className="col">
                          <hr />
                        </div>
                      </div>
                    </div>
                    <form id="signupForm" onSubmit={this.handleSignUp}>
                      <div className="form-group first-name">
                        <div className="input-group last">
                          <div className="input-group-prepend">
                            <span
                              className="input-group-text"
                              id="inputGroupPrependFirstName"
                            >
                              <i className="far fa-user" />
                            </span>
                          </div>
                          <input
                            type="text"
                            name="firstName"
                            className="form-control"
                            id="signUpFirstName"
                            onChange={this.handleInputChange}
                            aria-describedby="firstName"
                            placeholder="First"
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group last-name">
                        <div className="input-group last">
                          <div className="input-group-prepend">
                            <span
                              className="input-group-text"
                              id="inputGroupPrependLastName"
                            >
                              <i className="far fa-user" />
                            </span>
                          </div>
                          <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            id="signUpLastName"
                            onChange={this.handleInputChange}
                            aria-describedby="lastName"
                            placeholder="Last"
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group email">
                        <div className="input-group email">
                          <div className="input-group-prepend">
                            <span
                              className="input-group-text"
                              id="inputGroupPrependUpEmail"
                            >
                              <i className="far fa-envelope" />
                            </span>
                          </div>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="signUpEmail"
                            onChange={this.handleInputChange}
                            aria-describedby="signUpEmail"
                            placeholder="Email"
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group password">
                        <div className="input-group password">
                          <div className="input-group-prepend">
                            <span
                              className="input-group-text"
                              id="inputGroupPrependUpPassword"
                            >
                              <i className="fas fa-lock" />
                            </span>
                          </div>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="signUpPassword"
                            onChange={this.handleInputChange}
                            aria-describedby="signUpPassword"
                            placeholder="Create Password"
                            minLength="8"
                            required
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-success btn-block"
                      >
                      Sign Up
                      </button>
                      <div className="new user text-center">
                        <hr />
                        <p>
                          Already have an account?
                          {' '}
                          <button
                            type="button"
                            className="link-button"
                            onClick={() => this.toggleLandingCard(0)}
                            aria-expanded={landingCard[1]}
                          >
                            Sign In
                          </button>
                        </p>
                      </div>
                    </form>
                  </CardBody>
                </Card>
              </Collapse>
              <Collapse isOpen={landingCard[2]} data-parent="#landingCard" id="forgotPassCard">
                <Card>
                  <CardBody className="pb-2">
                    <h6 className="reset-instructions">
                      Enter your email address and we will send you a link to reset your password
                    </h6>
                    <form id="forgotPassForm" onSubmit={this.handleForgotPassword}>
                      <div className="form group email">
                        <div className="input-group email">
                          <div className="input-group-prepend">
                            <span
                              className="input-group-text"
                              id="inputGroupPrepend2"
                            >
                              <i className="far fa-envelope" />
                            </span>
                          </div>
                          <input
                            type="email"
                            className="form-control"
                            id="forgotPassEmail"
                            name="forgotPassEmail"
                            placeholder="Email"
                            aria-describedby="inputGroupPrepend2"
                            required
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-success btn-block mt-3"
                      >
                      Send Email
                      </button>
                      <div className="new user text-center">
                        <hr className="mb-1" />
                        <small>
                          <button
                            type="button"
                            className="link-button"
                            onClick={() => this.toggleLandingCard(0)}
                            aria-expanded={landingCard[1]}
                          >
                            Return to Sign In
                          </button>
                        </small>
                      </div>
                    </form>
                  </CardBody>
                </Card>
              </Collapse>
              <Collapse isOpen={landingCard[3]} data-parent="#landingCard" id="resetPassCard">
                <Card>
                  <CardBody>
                    <h6 className="reset-instructions">
                        Reset your password
                    </h6>
                    <form id="resetPassForm" onSubmit={this.handleResetPassword}>
                      <div className="form-group resetPassword">
                        <div className="input-group resetPassword">
                          <div className="input-group-prepend">
                            <span
                              className="input-group-text"
                              id="inputGroupPrependResetPass"
                            >
                              <i className="fas fa-lock" />
                            </span>
                          </div>
                          <input
                            name="resetPass"
                            type="password"
                            className="form-control"
                            id="resetPass"
                            aria-describedby="resetPassword"
                            placeholder="New Password"
                            minLength="8"
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group confirmPass">
                        <div className="input-group confirmPass">
                          <div className="input-group-prepend">
                            <span
                              className="input-group-text"
                              id="inputGroupPrependConfirmPass"
                            >
                              <i className="fas fa-lock" />
                            </span>
                          </div>
                          <input
                            name="confirmPass"
                            type="password"
                            className="form-control"
                            id="ConfirmPass"
                            aria-describedby="ConfirmPassword"
                            placeholder="Confirm Password"
                            required
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-success btn-block"
                      >
                            Reset
                      </button>
                    </form>
                  </CardBody>
                </Card>
              </Collapse>
            </div>
          </Col>
          <div className="col-sm-10 col-md-5 order-md-first col-lg-6 col-xl-6 mt-md-0 mt-3">
            <div className="card border-0" id="aboutUs">
              <div className="card-body">
                <h1 className="card-title text-center" id="about-us-title">About Us</h1>
                <p className="card-text">We have created a simple modern interface to manage your rental units. Record revenue and expenses, access local leasing resources, and streamline the year-end tax preparation process. Landlord On!</p>
              </div>
            </div>
          </div>
        </Row>
      </div>
    );
  };
}

Login.propTypes = {
  handleLoggedInUser: PropTypes.func.isRequired,
  featureFlags: PropTypes.objectOf(PropTypes.bool).isRequired,
};

export default Login;
