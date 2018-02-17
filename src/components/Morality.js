import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dots from './Dots';

class Morality extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    maxDots: PropTypes.number.isRequired,
    purchaseOrUnpurchaseDot: PropTypes.func.isRequired
  };

  handleOnClick = () => {
    this.props.purchaseOrUnpurchaseDot();
  };

  render() {
    const { path, level, maxDots } = this.props;

    return (
      <div>
        <h3>Morality</h3>
        {path} <Dots level={level} max={maxDots} onClick={this.handleOnClick} />
      </div>
    );
  }
}

export default Morality;
