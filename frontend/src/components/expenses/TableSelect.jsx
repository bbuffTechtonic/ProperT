import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line object-curly-newline
function TableSelect({ currentSelection, options, handleSelection, selectStyles }) {
  return (
    <React.Fragment>
      <select onChange={handleSelection} defaultValue={currentSelection} className={selectStyles}>
        {
          options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))
        }
      </select>
    </React.Fragment>
  );
}

TableSelect.propTypes = {
  currentSelection: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  selectStyles: PropTypes.string.isRequired,
  handleSelection: PropTypes.func.isRequired,
};

export default TableSelect;
