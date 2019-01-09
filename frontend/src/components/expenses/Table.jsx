import React from 'react';
import PropTypes from 'prop-types';
import Expense from './Expense';

// eslint-disable-next-line object-curly-newline
function DisplayTable({ currentExpenses, handleCheckAll, checkAll, onClick }) {
  return (
    <div className="col">
      <div className="card mt-2">
        <div className="card-body p-0" id="exp-detail-card">
          <table className="table table-striped mb-0" id="expense-table">
            <thead>
              <tr className="row m-0 rounded-top" id="expense-head">
                <th className="col-1 check border-0" scope="col"><input type="checkbox" id="check-all" onClick={handleCheckAll} /></th>
                <th className="col-3 col-sm-2 pr-0 pl-0 border-0" scope="col">Date</th>
                <th className="col-sm-3 d-none d-sm-block pr-0 pl-0 border-0" scope="col">Description</th>
                <th className="col-sm-2 d-none d-sm-block pr-0 pl-0 border-0" scope="col">Image</th>
                <th className="col-4 col-sm-2 pr-0 pl-0 border-0" scope="col">Category</th>
                <th className="col-4 col-sm-2 pr-3 pl-0 border-0 text-right" scope="col">Amount</th>
              </tr>
            </thead>
            <tbody id="expense-body">
              {
                currentExpenses.map((expense) => {
                  const { _id: id } = expense;
                  return (
                    <Expense
                      expense={expense}
                      checkAll={checkAll}
                      onClick={onClick}
                      key={id}
                    />
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

DisplayTable.propTypes = {
  currentExpenses: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]))).isRequired,
  handleCheckAll: PropTypes.func.isRequired,
  checkAll: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DisplayTable;
