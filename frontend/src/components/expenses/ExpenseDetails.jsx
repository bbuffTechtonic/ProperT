/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import TableButtons from './TableButtons';
import TableNav from './TableNav';
import DisplayTable from './Table';
import AddExpense from './AddExpense';
import TableSelect from './TableSelect';
import '../../styles/PropDetails.css';
// import defaultImage from '../../images/images.png';

class ExpenseDetails extends Component {
  constructor(props) {
    super(props);
    const defaultDate = new Date().getFullYear();
    this.state = {
      modal: false,
      currentExpenses: [],
      checkAll: false,
      searchInput: '',
      currentCategory: 'All',
      currentYear: defaultDate,
      totalYears: [],
    };
    this.handleYearSelect.bind(this);
  }

  componentDidMount() {
    this.getAllExpenses();
    this.getAllYears();
    this.selectedCheckboxes = new Set();
  }

  componentDidUpdate(prevProps, prevState) {
    const { rental } = this.props;
    const { currentYear } = this.state;
    if (rental !== prevProps.rental) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ searchInput: '' });
      this.getAllExpenses();
      this.getAllYears();
    }
    if (prevState.currentYear !== currentYear) {
      this.getAllExpenses();
      this.getAllYears();
    }
    return null;
  }

  handleDelete = () => {
    this.setState({ searchInput: '' });
    this.selectedCheckboxes.forEach((id) => {
      axios({
        url: `https://proper-t-express.herokuapp.com/rentals/expenses/${id}`,
        method: 'delete',
        headers: {
          'x-access-token': sessionStorage.getItem('jwt_token'),
          'Content-Type': 'application/json',
        },
      }).then(() => {
        this.getAllExpenses();
      }).catch(err => console.error(err));
    });
  }

  handleModalToggle = () => {
    this.setState({ searchInput: '' });
    this.getAllExpenses();
    const { modal } = this.state;
    this.setState({ modal: !modal });
  }

  handleModalToggleSubmit = (e) => {
    const result = e.currentTarget.form.checkValidity();
    if (result) {
      this.setState({ searchInput: '' });
      this.getAllExpenses();
      const { modal } = this.state;
      this.setState({ modal: !modal });
    }
    return null;
  }

  handleSearch = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ searchInput: value });
    this.getAllExpenses(value.trim());
  }

  handleSelectedExpense = (e) => {
    this.setState({ searchInput: '' });
    const { rental: { _id: id } } = this.props;
    const { currentYear } = this.state;
    const selectedExpense = e.target.value || e.target.textContent;
    // eslint-disable-next-line no-unused-expressions
    selectedExpense === 'All'
      ? this.getAllExpenses()
      : axios({
        url: `https://proper-t-express.herokuapp.com/rentals/${id}/expenses/${currentYear}/${selectedExpense}`,
        headers: {
          'x-access-token': sessionStorage.getItem('jwt_token'),
        },
      }).then((expenses) => {
        this.setState({ currentExpenses: expenses.data, currentCategory: selectedExpense });
      }).catch(err => console.error(err));
  }

  getAllExpenses = (searchValue) => {
    const { rental: { _id: id } } = this.props;
    const { currentYear } = this.state;
    let url;
    // eslint-disable-next-line no-unused-expressions
    searchValue
      ? url = `https://proper-t-express.herokuapp.com/rentals/${id}/expenses/${currentYear}?description=${searchValue}`
      : url = `https://proper-t-express.herokuapp.com/rentals/${id}/expenses/${currentYear}`;
    axios({
      url,
      headers: {
        'x-access-token': sessionStorage.getItem('jwt_token'),
      },
    }).then((response) => {
      this.setState({ currentExpenses: response.data, currentCategory: 'All' });
    }).catch(err => console.error(err));
  }

  handleCheckAll = () => {
    const { checkAll } = this.state;
    if (checkAll) {
      this.selectedCheckboxes.forEach((id) => {
        console.log(id);
      });
    }
    this.setState({ checkAll: !checkAll });
  }

  updateSet = (id) => {
    if (this.selectedCheckboxes.has(id)) {
      this.selectedCheckboxes.delete(id);
    } else {
      this.selectedCheckboxes.add(id);
    }
  }

  handleImageUpload = () => {
    const preview = document.querySelector('#addExpenseImage');
    const file = document.querySelector('#add-expense-form input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    }, false);

    if (file) {
      return reader.readAsDataURL(file);
    }
    return null;
  }

  handleAddExpense = (e) => {
    e.preventDefault();
    const { dataset: { rental } } = e.target;
    axios({
      url: `https://proper-t-express.herokuapp.com/rentals/${rental}/expenses/${e.target[1].value}`,
      method: 'post',
      headers: {
        'x-access-token': sessionStorage.getItem('jwt_token'),
        'Content-Type': 'application/json',
      },
      data: {
        date: e.target[0].value,
        amount: e.target[2].value,
        description: e.target[3].value,
        image: document.getElementById('addExpenseImage').src,
      },
    })
      .then(() => {
        this.getAllExpenses();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getAllYears = () => {
    const { rental: { _id: id } } = this.props;
    axios.get(`https://proper-t-express.herokuapp.com/rentals/${id}/years`, {
      headers: {
        'x-access-token': sessionStorage.getItem('jwt_token'),
      },
    }).then((response) => {
      this.setState({ totalYears: response.data });
    }).catch(err => console.error(err));
  }

  handleYearSelect = (e) => {
    const year = e.target.value;
    this.setState({ currentYear: year });
  }

  render() {
    const expenseCategories = ['All', 'Rent', 'Mortgage', 'HOA', 'Mileage', 'Maintenance', 'Supplies', 'Misc'];
    // eslint-disable-next-line object-curly-newline, max-len
    const { modal, currentExpenses, checkAll, searchInput, currentCategory, currentYear, totalYears } = this.state;
    const { rental } = this.props;
    return (
      <section id="expense-details">
        <TableButtons
          toggle={this.handleModalToggle}
          handleSearch={this.handleSearch}
          searchInput={searchInput}
          onClick={this.handleDelete}
        />
        <AddExpense
          toggle={this.handleModalToggle}
          toggleSubmit={this.handleModalToggleSubmit}
          isOpen={modal}
          rental={rental}
          onSubmit={this.handleAddExpense}
          onChange={this.handleImageUpload}
        />
        <div className="row">
          <div className="col-md-3">
            <div className="card mt-2" id="table-nav">
              <div className="card-body p-md-2 p-0" id="exp-nav-card">
                <div className="row">
                  <TableSelect
                    handleSelection={this.handleYearSelect}
                    currentSelection={currentYear}
                    options={totalYears}
                    selectStyles="custom-select m-auto mb-md-2 col-5 col-md-8 text-center"
                  />
                  <TableSelect
                    handleSelection={this.handleSelectedExpense}
                    currentSelection={currentCategory}
                    options={expenseCategories}
                    selectStyles="d-md-none m-auto custom-select col-5 text-center"
                  />
                </div>
                <TableNav
                  selectExpense={this.handleSelectedExpense}
                  rental={rental}
                  currentCategory={currentCategory}
                  expenseCategories={expenseCategories}
                />
              </div>
            </div>
          </div>
          <DisplayTable
            currentExpenses={currentExpenses}
            handleCheckAll={this.handleCheckAll}
            checkAll={checkAll}
            onClick={this.updateSet}
          />
        </div>
      </section>
    );
  }
}

ExpenseDetails.propTypes = {
  rental: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ])).isRequired,
};

export default ExpenseDetails;
