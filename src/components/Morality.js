import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { humanity } from '../constants/characterOptions';
import Dots from './Dots';
import Section from './Section';

const getDescription = option =>
  `${option.name} (${option.points} point merit)`;

class Morality extends Component {
  static propTypes = {
    optionsMap: PropTypes.instanceOf(Map).isRequired,
    path: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    maxDots: PropTypes.number.isRequired,
    purchaseOrUnpurchaseMoralityDot: PropTypes.func.isRequired,
    updateMoralityIfPointsAvailable: PropTypes.func.isRequired
  };

  handleOnClick = () => {
    this.props.purchaseOrUnpurchaseMoralityDot();
  };

  handlePathChange = e => {
    const newPath = e.target.value;

    this.props.updateMoralityIfPointsAvailable(newPath);
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
      <Section header="Morality">
        <select value={path} onChange={this.handlePathChange}>
          <option value={humanity}>{humanity}</option>
          {pathOptions}
        </select>
        <Dots level={level} max={maxDots} onClick={this.handleOnClick} />
      </Section>
    );
  }
}

export default Morality;
