import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import store from 'store';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import LDClient from 'ldclient-js';
import Landing from './components/Landing';
import AccountManagement from './components/AccountManagement';
import PropertyDetails from './components/PropertyDetails';
import Nav from './components/Nav';
import Footer from './components/Footer';
import './App.css';

class App extends Component {
  constructor() {
    super();
    const loginStatus = !!sessionStorage.getItem('jwt_token');
    this.state = {
      isLoggedIn: loginStatus,
      rentals: [],
      currentRental: store.get('currentRental') || {},
    };
  }

  componentDidMount = () => {
    const { isLoggedIn } = this.state;
    if (isLoggedIn) {
      this.checkTokenStatus();
      this.getAllRentals();
    }
    const user = {
      key: 'allusers',
    };
    this.ldclient = LDClient.initialize('5c08a03c1412625ab643f790', user);
    this.ldclient.on('ready', this.onLaunchDarklyReady.bind(this));
  }

  onLaunchDarklyReady = () => {
    this.setState({
      featureFlags: { googleAuthEnabled: this.ldclient.variation('propert-google-auth') },
    });
  }

  checkTokenStatus = () => {
    axios.get('https://proper-t-express.herokuapp.com/auth/verify', {
      headers: { 'x-access-token': sessionStorage.getItem('jwt_token') },
    })
      // eslint-disable-next-line no-console
      .then(() => console.log('Token is valid'))
      .catch(() => {
        this.handleLogout();
        // eslint-disable-next-line no-alert
        alert('Your session has expired please sign in again');
      });

    return false;
  }

  handleLoggedInUser = () => {
    this.setState({
      isLoggedIn: true,
    });
  }

  getAllRentals = () => {
    axios.get('https://proper-t-express.herokuapp.com/rentals', {
      headers: { 'x-access-token': sessionStorage.getItem('jwt_token') },
    }).then((response) => {
      this.setState({ rentals: response.data });
    // eslint-disable-next-line no-console
    }).catch(err => console.error(err));
  }

  updateCurrentRental = (rental) => {
    const { currentRental } = this.state;
    const rentalEdited = _.isEqual(currentRental, rental);
    if (!rentalEdited) {
      this.getAllRentals();
    }
    store.set('currentRental', rental);
    this.setState({ currentRental: store.get('currentRental') });
  }

  handleLogout = () => {
    sessionStorage.removeItem('jwt_token');
    this.setState({ isLoggedIn: false });
    sessionStorage.clear();
    store.clearAll();
  }

  render() {
    // eslint-disable-next-line object-curly-newline
    const { isLoggedIn, currentRental, rentals, featureFlags } = this.state;
    return (
      <Router>
        <div className="App">
          <Nav
            currentRental={currentRental}
            updateCurrentRental={this.updateCurrentRental}
            isLoggedIn={isLoggedIn}
            handleLogout={this.handleLogout}
            rentals={rentals}
            getAllRentals={this.getAllRentals}
          />
          <main id="main">
            <Route
              exact
              path="/"
              render={props => (
                <Landing
                  {...props}
                  isLoggedIn={isLoggedIn}
                  handleLoggedInUser={this.handleLoggedInUser}
                  featureFlags={featureFlags}
                />
              )}
            />
            <Route
              path="/user"
              render={() => (
                isLoggedIn
                  ? <AccountManagement />
                  : <Redirect to="/" />
              )}
            />
            <Route
              path="/rentals/:id/"
              render={props => (
                isLoggedIn
                  ? (
                    <PropertyDetails
                      {...props}
                      currentRental={currentRental}
                      updateCurrentRental={this.updateCurrentRental}
                    />)
                  : <Redirect to="/" />
              )}
            />
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
