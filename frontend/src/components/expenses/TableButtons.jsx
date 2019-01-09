import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line object-curly-newline
function TableButtons({ toggle, onClick, handleSearch, searchInput }) {
  return (
    <div className="row" id="search-delete-add-row">
      <div className="col-md-3 offset-md-3 col-5">
        <input type="text" value={searchInput} id="search-input" placeholder="Search" className="col mb-2" onChange={handleSearch} />
      </div>
      <div className="d-flex flex-fill justify-content-end">
        <button className="btn btn-success btn-sm mr-1 mb-1 text-center" id="add-expense-button" data-toggle="modal" data-target="#add-expense-modal" type="button" onClick={toggle}>New Expense</button>
        <button className="btn btn-danger btn-sm mr-4 mb-1 col-4 col-md-2" id="delete-expenses" type="button" onClick={onClick}>Delete</button>
      </div>
    </div>
  );
}

TableButtons.propTypes = {
  toggle: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  searchInput: PropTypes.string.isRequired,
};

export default TableButtons;
