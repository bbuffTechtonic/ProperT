/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React from 'react';
import { CSVLink } from 'react-csv';
import axios from 'axios';
import Graph from './Graph';
import Money from './Money';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    const date = new Date(Date.now());
    const currentYear = date.getFullYear();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      optYears: [],
      years: [],
      fiscalYear: currentYear,
      totExpenses: '10,000.00',
      totIncome: '20,000.00',
      totProfit: '10,000.00',
      exports: [],
    };
  }

  async componentDidMount() {
    this.getDistinctYears();
    this.exportExpenses();
    // const value = JSON.parse(store.get('rentals'));
    // await this.setState({ rentals: value });
  }

  getDistinctYears = () => {
    axios.get('http://localhost:3001/rentals/years', {
      headers: { 'x-access-token': sessionStorage.getItem('jwt_token') },
    }).then((response) => {
      this.setState({ years: response.data });
      this.setState({ optYears: this.getYears() });
      const { fiscalYear } = this.state;
      this.getYearTotals(fiscalYear);
    }).catch(err => console.error(err));
  }

  getYears() {
    let oYear;
    const uniqueOptArray = [];
    const { years } = this.state;

    for (let i = 0; i < years.length; i += 1) {
      oYear = years[i]._id.year;
      uniqueOptArray.push(<option key={i} value={oYear}>{oYear}</option>);
    }

    return uniqueOptArray;
  }

  getYearTotals(year) {
    let totExpenses = 0;
    let totIncome = 0;
    // let oYear;

    axios.get('http://localhost:3001/rentals/groupxyear', {
      headers: { 'x-access-token': sessionStorage.getItem('jwt_token') },
    }).then((response) => {
      for (let i = 0; i < response.data.length; i += 1) {
        if (year === response.data[i]._id.year) {
          if (response.data[i]._id.type === 'Rent') {
            totIncome += parseInt(response.data[i].total, 10);
          } else {
            totExpenses += parseInt(response.data[i].total, 10);
          }
        }
      }

      this.setState({
        totExpenses,
        totIncome,
        totProfit: totIncome - totExpenses,
      });
    }).catch(err => console.error(err));
  }

  exportExpenses() {
    axios.get('http://localhost:3001/rentals/exporttocsv', {
      headers: { 'x-access-token': sessionStorage.getItem('jwt_token') },
    }).then((response) => {
      this.setState({ exports: response.data });
    }).catch(err => console.error(err));
  }

  async handleClick(e) {
    const fsY = e.target.value;
    await this.setState({ fiscalYear: fsY });
    this.getYearTotals(parseInt(fsY, 10));
  }

  render() {
    const {
      optYears, fiscalYear, totExpenses, totIncome, totProfit, exports,
    } = this.state;
    return (
      <div className="container">
        <section className="dashboard">
          <br />
          <h1>Dashboard</h1>
          <br />
          <div id="fiscal-year" className="row justify-content-center">
            <div id="fy-col" className="input-group col-6 col-sm-3">
              <div className="input-group-prepend">
                <label className="input-group-text">Year</label>
              </div>
              <select onChange={this.handleClick} defaultValue={fiscalYear} className="custom-select" id="my-year">
                {optYears}
              </select>
            </div>
            <div>
              <CSVLink data={exports}>Download Expenses</CSVLink>
            </div>
          </div>
          <br />

          <Graph fiscalYearProp={fiscalYear} />
          <Money totIncome={totIncome} totExpenses={totExpenses} totProfit={totProfit} />
          <br />
        </section>
      </div>
    );
  }
}

export default Dashboard;
