import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button } from 'reactstrap';
import moment from 'moment';
import EditProperty from './EditProperty';
import GoogleMap from './GoogleMap';
import '../../styles/IndivPropDetails.css';
import defaultImage from '../../images/images.png';

class IndivPropertyDetails extends Component {
  constructor(props) {
    super(props);
    this.url = 'https://proper-t-express.herokuapp.com/rentals';
    this.state = {
      modal: false,
    };
  }

  toggle = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal,
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
    const preview = document.querySelector('#editRentalImage');
    const file = document.querySelector('#edit-prop-form input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    }, false);

    if (file) {
      return reader.readAsDataURL(file);
    }
    return null;
  }

  handlePropertyUpdate = (e) => {
    e.preventDefault();
    // eslint-disable-next-line object-curly-newline, max-len
    const { address1, address2, city, state, zip, image, tenantFirstName, tenantLastName, tenantEmail, leaseStart, leaseEnd, rentalAmount } = e.target;
    const { currentRental: { _id: id } } = this.props;

    const newData = {
      address1: address1.value,
      address2: address2.value,
      city: city.value,
      state: state.value,
      zip: zip.value,
      image: image.src,
      tenantFirstName: tenantFirstName.value,
      tenantLastName: tenantLastName.value,
      tenantEmail: tenantEmail.value,
      leaseStart: leaseStart.value,
      leaseEnd: leaseEnd.value,
      monthlyRent: rentalAmount.value,
    };

    axios(`${this.url}/${id}`, {
      method: 'put',
      headers: { 'x-access-token': sessionStorage.getItem('jwt_token') },
      data: newData,
    })
      .then((response) => {
        const { updateCurrentRental } = this.props;
        updateCurrentRental(response.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('problem updating property', err);
      });
  }

  render() {
    const { modal } = this.state;
    const { currentRental } = this.props;
    let startDate;
    let endDate;

    if (!currentRental.leaseStart) {
      currentRental.leaseStart = '';
      startDate = '';
    } else {
      startDate = moment(new Date(currentRental.leaseStart.replace(/-/g, '/').replace(/T.+/, ''))).format('L');
    }

    if (!currentRental.leaseEnd) {
      currentRental.leaseEnd = '';
      endDate = '';
    } else {
      endDate = moment(new Date(currentRental.leaseEnd.replace(/-/g, '/').replace(/T.+/, ''))).format('L');
    }

    if (!currentRental.monthlyRent) {
      currentRental.monthlyRent = '';
    }

    const leaseRange = `${startDate} - ${endDate}`;

    const mapAddress = `${currentRental.address1}, ${currentRental.city}, ${currentRental.state} ${currentRental.zip}`;

    return (
      <section id="indiv-property-details">
        <div className="row">
          <div className="col-md-3">
            <div className="row">
              <div className="col-md-12">
                <img id="prop-image" className="img-fluid rounded mx-auto d-block" src={currentRental.image || defaultImage} alt="current property" />
              </div>
            </div>
            <div className="row" id="map">
              <div className="col-md-12">
                <GoogleMap address={mapAddress} />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" id="prop-details-container">
              <h5 id="indiv-property-details-header" className="card-header text-left">Property Details</h5>
              <div className="row">
                <div className="col-md-7">
                  <div className="card-body text-left" id="prop-info">
                    <div id="indiv-prop-address">
                      <h5>{currentRental.address1}</h5>
                      <h5>{currentRental.address2}</h5>
                      <h5>
                        {`${currentRental.city}, ${currentRental.state} ${currentRental.zip}`}
                      </h5>
                    </div>
                    <br />
                    <div id="prop-specs">
                      <p id="tenant-name" className="card-text indiv-prop-spec">{`Current Tenant: ${currentRental.tenantFirstName} ${currentRental.tenantLastName}`}</p>
                      <p id="tenant-email" className="card-text indiv-prop-spec">{`Current Tenant Email: ${currentRental.tenantEmail}`}</p>
                      <p id="rental-amount" className="card-text indiv-prop-spec">{`Monthly Rental Amount: $${currentRental.monthlyRent}`}</p>
                      <p id="lease-range" className="card-text indiv-prop-spec">{`Lease Date Range: ${leaseRange}`}</p>
                    </div>
                    <br />
                    <EditProperty
                      isOpen={modal}
                      currentRental={currentRental}
                      toggle={this.toggle}
                      toggleSubmit={this.toggleSubmit}
                      onSubmit={this.handlePropertyUpdate}
                      onChange={this.handleImageUpload}
                    />
                    <Button id="edit-prop-button" className="btn btn-success btn-sm" type="button" onClick={this.toggle}>Edit Details</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

IndivPropertyDetails.propTypes = {
  currentRental: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
  updateCurrentRental: PropTypes.func.isRequired,
};

export default IndivPropertyDetails;
