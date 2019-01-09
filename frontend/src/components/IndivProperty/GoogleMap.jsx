import React from 'react';
import PropTypes from 'prop-types';

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myAddress: '',
    };
  }

  componentDidMount() {
    this.setMyState();
  }

  componentDidUpdate(prevProps) {
    const { address } = this.props;
    if (prevProps.address !== address) {
      this.setMyState();
    }
    return null;
  }

  setMyState() {
    const { address } = this.props;
    this.setState({
      myAddress: this.getAddressURL(address),
    });
  }

  getAddressURL(urlAddress) {
    this.resAddress = '';
    for (let i = 0; i < urlAddress.length; i += 1) {
      const res = urlAddress.substr(i, 1);

      if (res === ' ') {
        this.resAddress = `${this.resAddress}+`;
      } else {
        this.resAddress = this.resAddress + res;
      }
    }
    return this.resAddress;
  }


  render() {
    const { myAddress } = this.state;
    return (
      <div id="google-map">
        <iframe
          title="google map"
          src={`https://www.google.com/maps/embed/v1/place?q=${myAddress}&key=AIzaSyArK62E3bpCX94L6N799aAfUUD8wjEOKjg`}
        />
      </div>
    );
  }
}

GoogleMap.propTypes = {
  address: PropTypes.string.isRequired,
};

// Implement anywhere: <GoogleMap address={"2000 Central Ave, Boulder, CO"} />
export default GoogleMap;
