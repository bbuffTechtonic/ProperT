/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line object-curly-newline
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import '../styles/AddProperty.css';

// eslint-disable-next-line object-curly-newline
function AddProperty({ modal, toggle, toggleSubmit, onSubmit, onChange }) {
  return (
    <Modal isOpen={modal} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle} id="add-prop-modal-header">Add Property</ModalHeader>
      <ModalBody>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <form id="add-new-property" onSubmit={onSubmit}>
                  <div className="form row">
                    <div className="form-group col-md-9">
                      <label htmlFor="address-1">
                      Address 1
                      </label>
                      <input type="text" name="address-1" className="form-control" id="address-1" placeholder="12 Main St." required />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="address-2">
                      Address 2
                      </label>
                      <input type="text" name="address-2" className="form-control" id="address-2" placeholder="2A" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="city">
                      City
                      </label>
                      <input type="text" name="city" className="form-control" id="city" placeholder="Kalamazoo" required />
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="state" required>
                        State
                      </label>
                      <select id="state" name="state" className="form-control">
                        <option value="Select State" />
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                      </select>
                    </div>
                    <div className="form-group col-md-2">
                      <label htmlFor="zip">
                      Zip
                      </label>
                      <input type="text" pattern="[0-9]{5}" name="zip" className="form-control" id="zip" required title="Please enter zip code" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label htmlFor="tenant-first-name">
                      Tenant First Name
                      </label>
                      <input type="text" name="tenant-first-name" className="form-control" id="tenant-first-name" placeholder="John" />
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="tenant-last-name">
                      Tenant Last Name
                      </label>
                      <input type="text" name="tenant-last-name" className="form-control" id="tenant-last-name" placeholder="Doe" />
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="tenant-email">
                      Tenant Email
                      </label>
                      <input type="email" name="tenant-email" className="form-control" id="tenant-email" placeholder="jdoe@email.com" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label htmlFor="rental-amount">
                      Monthly Rent ($)
                      </label>
                      <input type="number" min="0" name="rental-amount" className="form-control" id="rental-amount" placeholder="1,350.00" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-3">
                      <label htmlFor="lease-start">
                      Lease Start Date:
                      </label>
                      <input type="date" name="lease-start" className="form-control" id="lease-start" placeholder="6/1/2018" />
                    </div>
                    <div className="form-group col-md-3">
                      <label htmlFor="lease-end">
                      Lease End Date:
                      </label>
                      <input type="date" name="lease-end" className="form-control" id="lease-end" placeholder="5/31/2019" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="propertyImage">
                      Upload Rental Image
                      </label>
                      <input type="file" name="propertyImage" accept=".jpg, .jpeg, .png" className="form-control-file" id="propertyImage" onChange={onChange} />
                    </div>
                    <div className="form-group col-md-6">
                      <img id="addRentalImage" className="tableImg" alt="Rental" width="200px" />
                    </div>
                  </div>
                  <input type="submit" onClick={toggleSubmit} data-dismiss="modal" value="Submit" className="btn btn-success btn-sm" id="submit-new-prop-button" />
                  <Button type="button" className="btn btn-success btn-sm" data-dismiss="modal" onClick={toggle}>Cancel</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}

AddProperty.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  toggleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AddProperty;
