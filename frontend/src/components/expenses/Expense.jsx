import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import '../../styles/Expense.css';

class Expense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { checkAll } = this.props;
    if (checkAll !== prevProps.checkAll) {
      if (checkAll) {
        this.setCheckedFalse();
      }
    }
    return null;
  }

  setCheckedFalse() {
    this.setState({ checked: false });
  }

  toggleCheck = (e) => {
    const { checkAll } = this.props;
    const { onClick } = this.props;
    const id = e.currentTarget.dataset.expense;
    const { checked } = this.state;
    if (checkAll) {
      this.setState({ checked: false });
    } else {
      this.setState({ checked: !checked });
      onClick(id);
    }
  }

  render() {
    const { checked } = this.state;
    const { expense, checkAll } = this.props;
    // eslint-disable-next-line object-curly-newline
    const { _id: id, date, description, image, type, amount } = expense;
    const expenseDate = new Date(date.replace(/-/g, '/').replace(/T.+/, ''));
    const expenseAmount = amount.toFixed(2);
    let td = '';
    if (type === 'Rent') {
      td = <td style={{ color: 'black' }} className="amount text-right col-4 col-sm-2 pr-3">{`$${expenseAmount}`}</td>;
    } else {
      td = <td style={{ color: 'red' }} className="amount text-right col-4 col-sm-2 pr-3">{`$${expenseAmount}`}</td>;
    }
    return (
      <tr id="expense-row" className="expense-row row m-0" key={`${id}`}>
        <th className="col-1" scope="col"><input data-expense={id} type="checkbox" checked={checked || checkAll} onChange={this.toggleCheck} /></th>
        <td className="col-3 col-sm-2" style={{ wordWrap: 'break-word' }}>{`${moment(expenseDate).format('MM/DD')}`}</td>
        <td className="col-sm-3 d-none d-sm-block">{description}</td>
        <td className="expense-image col-sm-2 d-none d-sm-block"><img className="thumbnail" src={image} alt="Receipt" width="50px" /></td>
        <td className="category col-4 col-sm-2">{type}</td>
        {td}
      </tr>
    );
  }
}

Expense.propTypes = {
  expense: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
  checkAll: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Expense;
