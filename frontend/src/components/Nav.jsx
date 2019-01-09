/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LogoPic from '../images/logo-white-on-tp.png';
import AddProperty from './AddProperty';
import '../styles/Nav.css';
import NavbarDropdown from './Dropdown';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      collapsed: true,
    };
    this.loginURI = 'https://proper-t-express.herokuapp.com/auth/';
  }

  componentDidUpdate(prevProps) {
    const { rentals, getAllRentals, isLoggedIn } = this.props;
    // eslint-disable-next-line no-multi-spaces
    const propsComparisonResult =  _.isEqual(rentals, prevProps.rentals);
    if (!propsComparisonResult || prevProps.isLoggedIn !== isLoggedIn) {
      getAllRentals();
    }
    return null;
  }

  toggle = () => {
    const { modal } = this.state;
    this.setState({ collapsed: true });
    this.setState({
      modal: !modal,
    });
  }

  toggleNav = () => {
    const { collapsed } = this.state;
    this.setState({
      collapsed: !collapsed,
    });
  }

  toggleSubmit = (e) => {
    const result = e.currentTarget.form.checkValidity();
    if (result) {
      const { modal } = this.state;
      this.setState({
        modal: !modal,
      });
    }
    return null;
  }

  handleImageUpload = () => {
    const preview = document.querySelector('#addRentalImage');
    const file = document.querySelector('#add-new-property input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    }, false);

    if (file) {
      return reader.readAsDataURL(file);
    }
    return null;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: 'https://proper-t-express.herokuapp.com/rentals',
      method: 'post',
      headers: {
        'x-access-token': sessionStorage.getItem('jwt_token'),
        'Content-Type': 'application/json',
      },
      data: {
        address1: e.target[0].value,
        address2: e.target[1].value,
        city: e.target[2].value,
        state: e.target[3].value,
        zip: e.target[4].value,
        tenantFirstName: e.target[5].value,
        tenantLastName: e.target[6].value,
        tenantEmail: e.target[7].value,
        monthlyRent: e.target[8].value,
        leaseStart: e.target[9].value,
        leaseEnd: e.target[10].value,
        image: document.getElementById('addRentalImage').src,
      },
    }).then((response) => {
      const { getAllRentals } = this.props;
      // eslint-disable-next-line no-console
      console.log(response);
      getAllRentals();
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
  }

  render() {
    const { modal, collapsed } = this.state;
    // eslint-disable-next-line object-curly-newline
    const { currentRental, updateCurrentRental, isLoggedIn, handleLogout, rentals } = this.props;
    const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark" id="nav-bar">
          <div className="container">
            <img id="nav-logo" className="navbar-brand" width="70px" src={LogoPic} alt="company logo" />
            {
          // eslint-disable-next-line operator-linebreak
          isLoggedIn &&
          (
            <React.Fragment>
              <button onClick={this.toggleNav} className={classTwo} type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
              <div className={classOne} id="navbarText">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to="/" onClick={this.toggleNav} className="nav-link">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id="add-property-modal" onClick={this.toggle}>Add Property</a>
                    <AddProperty
                      modal={modal}
                      toggle={this.toggle}
                      toggleSubmit={this.toggleSubmit}
                      onSubmit={this.handleSubmit}
                      onChange={this.handleImageUpload}
                    />
                  </li>
                  <li className="nav-item">
                    <Link to="/user" onClick={this.toggleNav} className="nav-link">My Account</Link>
                  </li>
                  <li className="nav-item">
                    <NavbarDropdown
                      className="nav-item"
                      list={rentals}
                      updateCurrentRental={updateCurrentRental}
                      currentRental={currentRental}
                      toggleNav={this.toggleNav}
                    />
                  </li>
                </ul>
                <Link to="/" className="btn btn-sm btn-outline-success" onClick={handleLogout}>Logout</Link>
              </div>
            </React.Fragment>)}
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

NavBar.propTypes = {
  currentRental: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ])).isRequired,
  getAllRentals: PropTypes.func.isRequired,
  updateCurrentRental: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
  rentals: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number.isRequired,
  ])).isRequired).isRequired,
};

export default NavBar;
