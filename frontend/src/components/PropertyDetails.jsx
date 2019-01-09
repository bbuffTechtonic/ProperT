import React from 'react';
import PropTypes from 'prop-types';
import IndivPropertyDetails from './IndivProperty/IndivPropertyDetails';
import ExpenseDetails from './expenses/ExpenseDetails';
import '../styles/EditProperty.css';

function PropertyDetails({ currentRental, updateCurrentRental }) {
  return (
    <section id="property-details">
      <section className="container prop-details-container">
        <IndivPropertyDetails
          currentRental={currentRental}
          updateCurrentRental={updateCurrentRental}
        />
      </section>
      <section className="container" id="expense-details">
        <ExpenseDetails rental={currentRental} />
      </section>
    </section>
  );
}

PropertyDetails.propTypes = {
  currentRental: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
  updateCurrentRental: PropTypes.func.isRequired,
};

export default PropertyDetails;
