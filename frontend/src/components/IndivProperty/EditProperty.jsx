/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line object-curly-newline
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import '../../styles/EditProperty.css';

// eslint-disable-next-line object-curly-newline
function EditProperty({ isOpen, toggle, currentRental, onSubmit, onChange }) {
  let startDateDisplay;
  let endDateDisplay;

  if (currentRental.leaseStart !== '') {
    startDateDisplay = (new Date(currentRental.leaseStart.replace(/-/g, '/').replace(/T.+/, ''))).toISOString().substr(0, 10);
  } else {
    startDateDisplay = '';
  }

  if (currentRental.leaseEnd !== '') {
    endDateDisplay = (new Date(currentRental.leaseEnd.replace(/-/g, '/').replace(/T.+/, ''))).toISOString().substr(0, 10);
  } else {
    endDateDisplay = '';
  }


  return (
    <Modal id="edit-property-modal" isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle} id="edit-prop-modal-header">Edit Your Property</ModalHeader>
      <ModalBody>
        <div className="modal-body container-fluid">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <form id="edit-prop-form" onSubmit={onSubmit}>
                    <div className="form row">
                      <div className="form-group col-md-9">
                        <label htmlFor="address1">
                        Address 1
                        </label>
                        <input type="text" name="address1" className="form-control" id="edit-prop-address-street" defaultValue={currentRental.address1} />
                      </div>
                      <div className="form-group col-md-3">
                        <label htmlFor="address2">
                        Address 2
                        </label>
                        <input type="text" name="address2" className="form-control" id="edit-prop-address-street2" defaultValue={currentRental.address2} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="city">
                        City
                        </label>
                        <input type="text" name="city" className="form-control" id="edit-prop-address-city" defaultValue={currentRental.city} />
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="state">
                        State
                        </label>
                        <select id="edit-prop-address-state" name="state" className="form-control" defaultValue={currentRental.state}>
                          <option value="Select a State" />
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
                        <input type="text" name="zip" className="form-control" id="edit-prop-address-zip" defaultValue={currentRental.zip} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="tenantFirstName">
                        Tenant First Name
                        </label>
                        <input type="text" name="tenantFirstName" className="form-control" id="edit-tenant-first-name" defaultValue={currentRental.tenantFirstName} />
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="tenantLastName">
                        Tenant Last Name
                        </label>
                        <input type="text" name="tenantLastName" className="form-control" id="edit-tenant-last-name" defaultValue={currentRental.tenantLastName} />
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="tenantEmail">
                        Tenant Email
                        </label>
                        <input type="email" name="tenantEmail" className="form-control" id="edit-tenant-email" defaultValue={currentRental.tenantEmail} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="leaseStart">
                        Lease Start Date:
                        </label>
                        <input type="date" name="leaseStart" className="form-control" id="edit-lease-start" defaultValue={startDateDisplay} />
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="leaseEnd">
                        Lease End Date:
                        </label>
                        <input type="date" name="leaseEnd" className="form-control" id="edit-lease-end" defaultValue={endDateDisplay} />
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="rentalAmount">
                        Monthly Rental Amount ($)
                        </label>
                        <input type="number" min="0" name="rentalAmount" className="form-control" id="edit-rental-amount" defaultValue={currentRental.monthlyRent} />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="editPropertyImage">
                        Upload Rental Image
                        </label>
                        <input type="file" name="editPropertyImage" accept=".jpg, .jpeg, .png" onChange={onChange} className="form-control-file" id="propertyImage" />
                      </div>
                      <div className="form-group col-md-6">
                        <img id="editRentalImage" className="tableImg" alt="Rental" width="200px" name="image" src={currentRental.image} />
                      </div>
                    </div>
                    <Button onClick={toggle} className="btn btn-success btn-sm" id="submit-edit-property" type="submit">Save Changes</Button>
                    <Button onClick={toggle} type="button" className="btn btn-success btn-sm" data-dismiss="modal">Cancel</Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}

EditProperty.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  currentRental: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ])).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EditProperty;
