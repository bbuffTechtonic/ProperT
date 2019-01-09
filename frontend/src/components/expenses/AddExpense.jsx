/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line object-curly-newline
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import '../../styles/AddExpense.css';

// eslint-disable-next-line object-curly-newline
function AddExpense({ isOpen, toggle, toggleSubmit, rental, onSubmit, onChange }) {
  const { _id: id } = rental;
  return (
    <Modal id="add-expense-modal" isOpen={isOpen} toggle={toggle}>
      <ModalHeader id="add-expense-modal-header" toggle={toggle}>
        Add Expense
      </ModalHeader>
      <ModalBody>
        <div className="modal-body container-fluid">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <form id="add-expense-form" data-rental={id} onSubmit={onSubmit}>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="add-expense-date">
                        Date:
                        </label>
                        <input type="date" id="add-expense-date" required />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="add-expense-category">
                        Category:
                        </label>
                        <select className="custom-select col-5" id="add-expense-category-select" required>
                          <option value="Mileage">Mileage</option>
                          <option value="Mortgage">Mortgage</option>
                          <option value="Maintenance">Maintenance</option>
                          <option value="Supplies">Supplies</option>
                          <option value="HOA">HOA Fees</option>
                          <option value="Rent">Rent</option>
                          <option value="Misc">Misc</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="add-expense-amount">
                        Amount: $
                        </label>
                        <input type="number" min="0" step="0.01" id="add-expense-amount" required />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="add-expense-description">
                        Description:
                        </label>
                        <input type="text" id="add-expense-description" required />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-6 image-upload">
                        <label htmlFor="add-expense-image">
                        Image:
                        </label>
                        <input type="file" name="pic" accept="image/*" onChange={onChange} id="add-expense-image" />
                      </div>
                      <div className="form-group col-md-6">
                        <img id="addExpenseImage" className="tableImg" alt="Expense receipt" width="200px" />
                      </div>
                    </div>
                    <input type="submit" onClick={toggleSubmit} data-dismiss="modal" value="Submit" className="btn btn-success btn-sm" id="add-expense-save" />
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

AddExpense.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  toggleSubmit: PropTypes.func.isRequired,
  rental: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AddExpense;
