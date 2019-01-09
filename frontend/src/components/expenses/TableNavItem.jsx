/* eslint-disable no-unused-expressions */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// eslint-disable-next-line object-curly-newline
function TableNavItem({ category, isActive, selectExpense, rental }) {
  const { _id: id } = rental;
  let className;
  isActive
    ? className = 'nav-link active bg-success d-flex col-12 justify-content-center'
    : className = 'nav-link text-success d-flex col-12 justify-content-center';
  return (
    <React.Fragment>
      <Link to={`/rentals/${id}`} onClick={selectExpense} className={className}>{category}</Link>
    </React.Fragment>
  );
}

TableNavItem.propTypes = {
  category: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  isActive: PropTypes.bool,
  selectExpense: PropTypes.func.isRequired,
  rental: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number.isRequired,
  ])).isRequired,
};

export default TableNavItem;
