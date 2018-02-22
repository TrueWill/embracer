import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { humanity } from '../constants/characterOptions';
import Dots from './Dots';

const getDescription = option =>
  `${option.name} (${option.points} point merit)`;

class Morality extends Component {
  static propTypes = {
    optionsMap: PropTypes.instanceOf(Map).isRequired,
    availablePoints: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    maxDots: PropTypes.number.isRequired,
    purchaseOrUnpurchaseDot: PropTypes.func.isRequired,
    updateMorality: PropTypes.func.isRequired
  };

  handleOnClick = () => {
    this.props.purchaseOrUnpurchaseDot();
  };

  handlePathChange = e => {
    const newPath = e.target.value;

    // TODO: Test, refactor

    const newMeritPoints =
      newPath === humanity ? 0 : this.props.optionsMap.get(newPath).points;

    const currentMeritPoints =
      this.props.path === humanity
        ? 0
        : this.props.optionsMap.get(this.props.path).points;

    const availablePoints = this.props.availablePoints + currentMeritPoints;

    if (newMeritPoints <= availablePoints) {
      this.props.updateMorality(newPath, newMeritPoints);
    }
  };

  render() {
    const { optionsMap, path, level, maxDots } = this.props;

    const pathOptions = [];

    optionsMap.forEach((value, key) => {
      const moralityMerit = {
        name: key,
        points: value.points
      };

      pathOptions.push(
        <option value={moralityMerit.name} key={moralityMerit.name}>
          {getDescription(moralityMerit)}
        </option>
      );
    });

    return (
      <div>
        <h3>Morality</h3>
        <select value={path} onChange={this.handlePathChange}>
          <option value={humanity}>{humanity}</option>
          {pathOptions}
        </select>
        <Dots level={level} max={maxDots} onClick={this.handleOnClick} />
      </div>
    );
  }
}

export default Morality;
