/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import TableNavItem from './TableNavItem';

// eslint-disable-next-line object-curly-newline
function TableNav({ rental, selectExpense, currentCategory, expenseCategories }) {
  let isActive;
  return (
    <nav className="nav flex-md-column nav-pills d-none d-md-block" id="v-pills-tab">
      {
        expenseCategories.map((category) => {
          // eslint-disable-next-line no-unused-expressions
          currentCategory === category
            ? isActive = true
            : isActive = false;
          return (
            <TableNavItem
              selectExpense={selectExpense}
              category={category}
              rental={rental}
              isActive={isActive}
              key={category}
            />
          );
        })
      }
    </nav>
  );
}

TableNav.propTypes = {
  rental: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
  selectExpense: PropTypes.func.isRequired,
  currentCategory: PropTypes.string.isRequired,
  expenseCategories: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default TableNav;
