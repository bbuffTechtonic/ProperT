/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';

function Money({ totIncome, totExpenses, totProfit }) {
  let td = '';
  if (parseInt(totProfit, 10) > 0) {
    td = <td style={{ color: 'green' }} id="totProfit" className="text-center">${totProfit}</td>;
  } else {
    const absProfit = Math.abs(parseInt(totProfit, 10));
    td = <td style={{ color: 'red' }} id="totProfit" className="text-center">${absProfit}</td>;
  }
  return (
    <div className="container">
      <section className="money">
        <div id="ytd-totals" className="row">
          <div className="col-sm-8 offset-sm-2 col-12">
            <div className="card">
              <div className="card-body">
                <table className="table table-striped table-sm mt-10">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Revenue (YTD)</th>
                      <th scope="col">Expenses (YTD)</th>
                      <th scope="col">Profit/Loss(YTD)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td id="totIncome" className="text-center">${totIncome}</td>
                      <td id="totExpenses" className="text-center">${totExpenses}</td>
                      {td}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

Money.propTypes = {
  totIncome: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]).isRequired,
  totExpenses: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]).isRequired,
  totProfit: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]).isRequired,
};

export default Money;
