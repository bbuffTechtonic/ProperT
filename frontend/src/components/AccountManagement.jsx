/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
import React from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';
import {
  TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';

class AccountManagement extends React.Component {
  constructor(props) {
    super(props);
    this.url = 'https://proper-t-express.herokuapp.com/user';
    this.state = {
      editFirstName: '',
      editLastName: '',
      editEmail: '',
      editAvatar: '',
      activeTab: '1',
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    axios.get(this.url, {
      headers: { 'x-access-token': sessionStorage.getItem('jwt_token') },
    })
      .then((user) => {
        const {
          firstName, lastName, email, avatar,
        } = user.data;
        this.setState({
          editFirstName: firstName,
          editLastName: lastName,
          editEmail: email,
          editAvatar: avatar,
        });
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log('There was a problem finding the user info');
      });

    return false;
  }

  handleSaveChanges = (e) => {
    e.preventDefault();
    const { editFirstName, editLastName, editEmail } = e.target;
    const editAvatar = document.querySelector('#profilePic');
    axios(`${this.url}/put`, {
      method: 'put',
      headers: { 'x-access-token': sessionStorage.getItem('jwt_token') },
      data: {
        firstName: editFirstName.value,
        lastName: editLastName.value,
        email: editEmail.value,
        avatar: editAvatar.src,
      },
    })
      .then((response) => {
        sessionStorage.setItem('jwt_token', response.data.token);
        alert('Your changes have been saved');
        this.getUserInfo();
      })
      .catch(() => {
        alert('There was a problem saving account changes');
      });

    return false;
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  toggle = (tab) => {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  handleChangeAvatar = (e) => {
    const preview = document.querySelector('#profilePic');
    // TODO: refactor document.querySelector to use React Refs
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      preview.src = reader.result;
      this.setState({ editAvatar: preview.src });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  handleUpdatePassword = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = e.target;
    if (newPassword.value.length < 8) {
      alert('Your password must be at least 8 characters');
      return;
    }

    if (newPassword.value !== confirmPassword.value) {
      alert('Confirm password did not match New password');
      return;
    }

    axios(`${this.url}/put`, {
      method: 'put',
      headers: { 'x-access-token': sessionStorage.getItem('jwt_token') },
      data: {
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
      },
    })
      .then((response) => {
        sessionStorage.setItem('jwt_token', response.data.token);
        alert('Your password has been updated');
        document.getElementById('updatePassForm').reset();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          alert('Current password is invalid');
          return;
        }
        alert('There was a problem updating your password');
      });
  }

  render = () => {
    const {
      activeTab, editFirstName, editLastName, editEmail, editAvatar,
    } = this.state;
    return (
      <div className="container acct-mgmt-container">
        <div className="row justify-content-center">
          <div className="mt-5 mb-5 col">
            <div className="card">
              <div className="card-body">
                <h3 className="text-center mb-3">Manage your account</h3>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={({ active: activeTab === '1' })}
                      onClick={() => { this.toggle('1'); }}
                      href="#"
                    >
                      Account Info
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={({ active: activeTab === '2' })}
                      onClick={() => { this.toggle('2'); }}
                      href="#"
                    >
                      Password
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <form className="text-left" onSubmit={this.handleSaveChanges}>
                      <div className="row justify-content-center">
                        <div className="col-12 col-sm-6 col-lg-5">
                          <div className="form group avatar mt-3">
                            <img
                              id="profilePic"
                              src={editAvatar}
                              alt="No avatar uploaded"
                              className="img-thumbnail img-fluid col-6 offset-3 col-sm-8 offset-sm-2 col-lg-8 offset-lg-2"
                            />
                            <div className="row justify-content-center">
                              <div className="col-10 col-sm-12 col-md-9 mt-2">
                                <label className="custom-file-label" htmlFor="customFile">
                                  Change Avatar
                                </label>
                                <div className="custom-file" id="customFile">
                                  <input
                                    type="file"
                                    name="editAvatar"
                                    className="custom-file-input"
                                    id="customFile"
                                    onChange={this.handleChangeAvatar}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form group first mt-3">
                            <label htmlFor="first-name">
                              First name
                            </label>
                            <div className="input-group first">
                              <div className="input-group-prepend">
                                <span
                                  className="input-group-text"
                                  id="inputGroupPrepend1"
                                >
                                  <i className="far fa-user" />
                                </span>
                              </div>
                              <input
                                type="text"
                                className="form-control"
                                name="editFirstName"
                                value={editFirstName}
                                id="first-name"
                                onChange={this.handleInputChange}
                                aria-describedby="inputGroupPrepend1"
                                required
                              />
                            </div>
                          </div>
                          <div className="form group last">
                            <label htmlFor="last">
                              Last name
                            </label>
                            <div className="input-group last">
                              <div className="input-group-prepend">
                                <span
                                  className="input-group-text"
                                  id="inputGroupPrepend2"
                                >
                                  <i className="far fa-user" />
                                </span>
                              </div>
                              <input
                                type="text"
                                className="form-control"
                                name="editLastName"
                                value={editLastName}
                                onChange={this.handleInputChange}
                                id="last-name"
                                aria-describedby="inputGroupPrepend2"
                                required
                              />
                            </div>
                          </div>
                          <div className="form group ">
                            <label htmlFor="email">
                              Email Address
                            </label>
                            <div className="input-group email">
                              <div className="input-group-prepend">
                                <span
                                  className="input-group-text"
                                  id="inputGroupPrepend3"
                                >
                                  <i className="far fa-envelope" />
                                </span>
                              </div>
                              <input
                                type="text"
                                name="editEmail"
                                value={editEmail}
                                onChange={this.handleInputChange}
                                className="form-control"
                                id="email"
                                aria-describedby="inputGroupPrepend3"
                                required
                              />
                            </div>
                          </div>
                          <button
                            className="btn btn-success float-right mt-4 btn-sm"
                            type="submit"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </form>
                  </TabPane>
                  <TabPane tabId="2">
                    <form id="updatePassForm" className="text-left" onSubmit={this.handleUpdatePassword}>
                      <div className="form group current p-0 col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-6 offset-lg-3 mt-3">
                        <label htmlFor="current">
                          Current Password
                        </label>
                        <div className="input-group old">
                          <div className="input-group-prepend">
                            <span
                              className="input-group-text"
                              id="inputGroupPrepend4"
                            >
                              <i className="fas fa-key" />
                            </span>
                          </div>
                          <input
                            type="password"
                            name="currentPassword"
                            className="form-control"
                            id="password"
                            placeholder="Current"
                            aria-describedby="inputGroupPrepend4"
                            required
                          />
                        </div>
                      </div>
                      <div className="form group new p-0 col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                        <label htmlFor="new">
                          New Password
                          {' '}
                        </label>
                        <small>(min 8 characters)</small>
                        <div className="input-group new">
                          <div className="input-group-prepend">
                            <span
                              className="input-group-text"
                              id="inputGroupPrepend5"
                            >
                              <i className="fas fa-key" />
                            </span>
                          </div>
                          <input
                            type="password"
                            name="newPassword"
                            className="form-control"
                            id="new-password"
                            placeholder="New"
                            minLength="8"
                            aria-describedby="inputGroupPrepend5"
                            required
                          />
                        </div>
                      </div>
                      <div className="form group confirm p-0 col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                        <label htmlFor="confirm">
                          Confirm New Password
                        </label>
                        <div className="input-group confirm">
                          <div className="input-group-prepend">
                            <span
                              className="input-group-text"
                              id="inputGroupPrepend6"
                            >
                              <i className="fas fa-key" />
                            </span>
                          </div>
                          <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            id="confirm-password"
                            placeholder="Confirm"
                            onChange={this.handleInputChange}
                            aria-describedby="inputGroupPrepend6"
                            required
                          />
                        </div>
                      </div>
                      <button
                        className="btn btn-success float-right mt-4 btn-sm"
                        type="submit"
                      >
                      Update Password
                      </button>
                    </form>
                  </TabPane>
                </TabContent>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// AccountManagement.propTypes = {

// };

export default AccountManagement;
