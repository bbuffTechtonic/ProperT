/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.canvasContext = '';
    this.bWidth = '';
    this.bMargin = '';
    this.totalBars = '';
    this.maxDataValue = '';
    this.bWidthMargin = '';
    this.ctr = '';
    this.numctr = '';
    this.speed = '';
    this.totLabelsOnYAxis = '';
    this.canvasHeight = '';
    this.canvasWidth = '';
    this.cWidth = '';
    this.cHeight = '';
    this.cMargin = '';
    this.cSpace = '';
    this.cMarginSpace = '';
    this.cMarginHeight = '';
    this.bWidth = '';
    this.bMargin = '';
    this.totalBars = '';
    this.maxDataValue = '';
    this.bWidthMargin = '';
    this.ctr = '';
    this.numctr = '';
    this.speed = '';
    this.totLabelsOnYAxis = '';
  }

  componentDidMount() {
    const { fiscalYearProp } = this.props;
    const { canvas } = this.refs;
    this.canvasContext = canvas.getContext('2d');
    this.canvasHeight = canvas.height;
    this.canvasWidth = canvas.width;

    const fY = fiscalYearProp;

    this.barChart(fY);
  }

  componentDidUpdate() {
    const { fiscalYearProp } = this.props;
    const { canvas } = this.refs;
    this.canvasContext = canvas.getContext('2d');
    this.canvasHeight = canvas.height;
    this.canvasWidth = canvas.width;

    const fY = fiscalYearProp;

    this.barChart(fY);
  }

  // barchart constructor
  barChart(year) {
    const arrChartData = [];
    let inc01 = 0;
    let inc02 = 0;
    let inc03 = 0;
    let inc04 = 0;
    let inc05 = 0;
    let inc06 = 0;
    let inc07 = 0;
    let inc08 = 0;
    let inc09 = 0;
    let inc10 = 0;
    let inc11 = 0;
    let inc12 = 0;
    let exp01 = 0;
    let exp02 = 0;
    let exp03 = 0;
    let exp04 = 0;
    let exp05 = 0;
    let exp06 = 0;
    let exp07 = 0;
    let exp08 = 0;
    let exp09 = 0;
    let exp10 = 0;
    let exp11 = 0;
    let exp12 = 0;

    axios.get('https://proper-t-express.herokuapp.com/rentals/groupxyear', {
      headers: { 'x-access-token': sessionStorage.getItem('jwt_token') },
    }).then((response) => {
      for (let i = 0; i < response.data.length; i += 1) {
        if (parseInt(year, 10) === response.data[i]._id.year) {
          if (response.data[i]._id.type === 'Rent') {
            switch (response.data[i]._id.month) {
              case 1:
                inc01 += parseInt(response.data[i].total, 10);
                break;

              case 2:
                inc02 += parseInt(response.data[i].total, 10);
                break;

              case 3:
                inc03 += parseInt(response.data[i].total, 10);
                break;

              case 4:
                inc04 += parseInt(response.data[i].total, 10);
                break;

              case 5:
                inc05 += parseInt(response.data[i].total, 10);
                break;

              case 6:
                inc06 += parseInt(response.data[i].total, 10);
                break;

              case 7:
                inc07 += parseInt(response.data[i].total, 10);
                break;

              case 8:
                inc08 += parseInt(response.data[i].total, 10);
                break;

              case 9:
                inc09 += parseInt(response.data[i].total, 10);
                break;

              case 10:
                inc10 += parseInt(response.data[i].total, 10);
                break;

              case 11:
                inc11 += parseInt(response.data[i].total, 10);
                break;

              case 12:
                inc12 += parseInt(response.data[i].total, 10);
                break;

              default:
                break;
            }
          } else {
            switch (response.data[i]._id.month) {
              case 1:
                exp01 += parseInt(response.data[i].total, 10);
                break;

              case 2:
                exp02 += parseInt(response.data[i].total, 10);
                break;

              case 3:
                exp03 += parseInt(response.data[i].total, 10);
                break;

              case 4:
                exp04 += parseInt(response.data[i].total, 10);
                break;

              case 5:
                exp05 += parseInt(response.data[i].total, 10);
                break;

              case 6:
                exp06 += parseInt(response.data[i].total, 10);
                break;

              case 7:
                exp07 += parseInt(response.data[i].total, 10);
                break;

              case 8:
                exp08 += parseInt(response.data[i].total, 10);
                break;

              case 9:
                exp09 += parseInt(response.data[i].total, 10);
                break;

              case 10:
                exp10 += parseInt(response.data[i].total, 10);
                break;

              case 11:
                exp11 += parseInt(response.data[i].total, 10);
                break;

              case 12:
                exp12 += parseInt(response.data[i].total, 10);
                break;

              default:
                break;
            }
          }
        }
      }

      const janData = { month: 'Jan', exp: exp01, inc: inc01 };
      const febData = { month: 'Feb', exp: exp02, inc: inc02 };
      const marData = { month: 'Mar', exp: exp03, inc: inc03 };
      const aprData = { month: 'Apr', exp: exp04, inc: inc04 };
      const mayData = { month: 'May', exp: exp05, inc: inc05 };
      const junData = { month: 'Jun', exp: exp06, inc: inc06 };
      const julData = { month: 'Jul', exp: exp07, inc: inc07 };
      const augData = { month: 'Aug', exp: exp08, inc: inc08 };
      const sepData = { month: 'Sep', exp: exp09, inc: inc09 };
      const octData = { month: 'Oct', exp: exp10, inc: inc10 };
      const novData = { month: 'Nov', exp: exp11, inc: inc11 };
      const decData = { month: 'Dec', exp: exp12, inc: inc12 };

      arrChartData.push(janData, febData, marData, aprData, mayData,
        junData, julData, augData, sepData, octData, novData, decData);


      const arrData = arrChartData;

      this.chartSettings(arrData);
      this.drawAxisLabelMarkers(arrData);
      this.drawChartWithAnimation(arrData);

      // drawBlueLine(arrData);
      // drawRedLine(arrData);
    }).catch(err => console.error(err));
  }

  // initialize the chart and bar values
  chartSettings(arrData) {
    this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // chart properties
    this.cMargin = 25;
    this.cSpace = 60;
    this.cHeight = this.canvasHeight - 2 * this.cMargin - this.cSpace;
    this.cWidth = this.canvasWidth - 2 * this.cMargin - this.cSpace;
    this.cMarginSpace = this.cMargin + this.cSpace;
    this.cMarginHeight = this.cMargin + this.cHeight;

    // bar properties
    this.bMargin = 15;
    this.totalBars = arrData.length;
    this.bWidth = (this.cWidth / this.totalBars) - this.bMargin;

    // find maximum value to plot on chart
    this.maxDataValue = 0;
    for (let i = 0; i < this.totalBars; i += 1) {
      let barVal = parseInt(arrData[i].inc, 10) - parseInt(arrData[i].exp, 10);
      barVal = Math.abs(barVal);
      if (parseInt(barVal, 10) > parseInt(this.maxDataValue, 10)) {
        this.maxDataValue = barVal;
      }
    }

    this.totLabelsOnYAxis = 10;
    this.canvasContext.font = '10pt Garamond';

    // initialize Animation variables
    this.ctr = 0;
    this.numctr = 100;
    this.speed = 10;
  }

  // draw chart axis, labels and markers
  drawAxisLabelMarkers(arrData) {
    this.canvasContext.lineWidth = '2.0';

    // draw y axis
    this.drawAxis(
      this.cMarginSpace,
      this.cMarginHeight,
      this.cMarginSpace,
      this.cMargin,
    );

    // draw x axis
    this.drawAxis(
      this.cMarginSpace,
      this.cMarginHeight,
      this.cMarginSpace + this.cWidth,
      this.cMarginHeight,
    );

    this.canvasContext.lineWidth = '1.0';

    this.drawMarkers(arrData);
  }

  // draw X and Y axis
  drawAxis(x, y, X, Y) {
    this.canvasContext.beginPath();
    this.canvasContext.moveTo(x, y);
    this.canvasContext.lineTo(X, Y);
    this.canvasContext.closePath();
    this.canvasContext.stroke();
  }

  // draw chart markers on X and Y Axis
  drawMarkers(arrData) {
    const numMarkers = parseInt(this.maxDataValue / this.totLabelsOnYAxis, 10);
    this.canvasContext.textAlign = 'right';
    this.canvasContext.fillStyle = '#000';

    // Y Axis
    for (let i = 0; i <= this.totLabelsOnYAxis; i += 1) {
      const markerVal = i * numMarkers;
      const markerValHt = i * numMarkers * this.cHeight;
      const xMarkers = this.cMarginSpace - 5;
      const yMarkers = this.cMarginHeight - (markerValHt / this.maxDataValue);
      this.canvasContext.fillText(markerVal, xMarkers, yMarkers, this.cSpace);
    }

    // X Axis
    this.canvasContext.textAlign = 'center';

    for (let i = 0; i < this.totalBars; i += 1) {
      // arrval = arrData[i].split(",");
      const name = arrData[i].month;

      const markerXPos = this.cMarginSpace + this.bMargin
      + (i * (this.bWidth + this.bMargin)) + (this.bWidth / 2);
      const markerYPos = this.cMarginHeight + 10;

      this.canvasContext.fillText(name, markerXPos, markerYPos, this.bWidth);
    }

    this.canvasContext.save();

    // Add Y Axis title
    this.canvasContext.translate(this.cMargin + 10, this.cHeight / 2);
    this.canvasContext.rotate(Math.PI * -90 / 180);
    this.canvasContext.fillText('Amount in USD', 0, 0);

    this.canvasContext.restore();

    // Add X Axis Title
    this.canvasContext.fillText('Cash FLow (YTD)', this.cMarginSpace + (this.cWidth / 2), this.cMarginHeight + 30);
  }

  drawChartWithAnimation(arrData) {
    // Loop through the total bars and draw
    for (let i = 0; i < this.totalBars; i += 1) {
      let bVal = parseInt(arrData[i].inc, 10) - parseInt(arrData[i].exp, 10);

      // If Profit draw Green Bar else draws Orange Bar
      if (bVal >= 0) {
        const bHt = (bVal * this.cHeight / this.maxDataValue);
        const bX = this.cMarginSpace + (i * (this.bWidth + this.bMargin)) + this.bMargin;
        const bY = this.cMarginHeight - bHt - 2;
        this.drawGreenRectangle(bX, bY, this.bWidth, bHt, true);
      } else {
        bVal *= -1;
        const bHt = (bVal * this.cHeight / this.maxDataValue);
        const bX = this.cMarginSpace + (i * (this.bWidth + this.bMargin)) + this.bMargin;
        const bY = this.cMarginHeight - bHt - 2;
        this.drawOrangeRectangle(bX, bY, this.bWidth, bHt, true);
      }
    }
  }

  drawGreenRectangle(x, y, w, h, fill) {
    // Draws Green Bars
    this.canvasContext.beginPath();
    this.canvasContext.rect(x, y, w, h);
    this.canvasContext.closePath();

    if (fill) {
      const gradient = this.canvasContext.createLinearGradient(0, 0, 0, 0);
      gradient.addColorStop(0, 'seagreen');
      gradient.addColorStop(1, 'seagreen');
      this.canvasContext.fillStyle = gradient;
      this.canvasContext.strokeStyle = gradient;
      this.canvasContext.fill();
    }

    this.canvasContext.stroke();
  }

  drawOrangeRectangle(x, y, w, h, fill) {
    // Draws Orange Bars
    this.canvasContext.beginPath();
    this.canvasContext.rect(x, y, w, h);
    this.canvasContext.closePath();

    if (fill) {
      const gradient = this.canvasContext.createLinearGradient(0, 0, 0, 0);
      gradient.addColorStop(0, '#da3e3e');
      gradient.addColorStop(1, '#da3e3e');
      this.canvasContext.fillStyle = gradient;
      this.canvasContext.strokeStyle = gradient;
      this.canvasContext.fillRect(x, y, w, h);
      // context.fill();
    }
    this.canvasContext.stroke();
  }

  render() {
    return (
      <div className="Graph">
        <canvas ref="canvas" width="1000px" height="400px" />
      </div>
    );
  }
}

Graph.propTypes = {
  fiscalYearProp: PropTypes.number.isRequired,
};

export default Graph;
