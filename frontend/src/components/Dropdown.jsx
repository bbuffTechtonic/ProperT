/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/Nav.css';

class NavbarDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
    };
  }

  handleClickOutside = () => {
    this.setState({ listOpen: false });
  }

  toggleList = () => {
    const { listOpen } = this.state;
    this.setState({ listOpen: !listOpen });
  }

  selectItem = (rental) => {
    const { updateCurrentRental, toggleNav } = this.props;
    this.toggleList();
    toggleNav();
    updateCurrentRental(rental);
  }

  render() {
    const { list } = this.props;
    const { listOpen } = this.state;
    return (
      <Dropdown nav inNavbar isOpen={listOpen} toggle={this.toggleList}>
        <DropdownToggle nav caret>
          { list.length > 0 ? 'Select Rental' : 'No Properties' }
        </DropdownToggle>
        <DropdownMenu style={{ background: '#989b9e' }}>
          {
            listOpen && (
              list.map((item) => {
                const { _id: id } = item;
                return (
                  <Link to={`/rentals/${id}`} id="dropdown-item" className="dropdown-item text-center" key={id} onClick={() => this.selectItem(item)}>
                    {item.address1}
                  </Link>
                );
              })
            )}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

NavbarDropdown.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number.isRequired,
      ]),
    ).isRequired,
  ).isRequired,
  updateCurrentRental: PropTypes.func.isRequired,
  toggleNav: PropTypes.func.isRequired,
};

export default NavbarDropdown;
