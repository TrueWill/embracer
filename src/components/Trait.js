import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dots from './Dots';
import StartingDots from './StartingDots';
import dotSelector from '../utils/dotSelector';
import { capitalizeFirstLetter } from '../utils/stringUtils';

class Trait extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    displayName: PropTypes.string,
    maxDots: PropTypes.number.isRequired,
    availableStartingDots: PropTypes.arrayOf(
      PropTypes.shape({
        dots: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired
      })
    ).isRequired,
    traitState: PropTypes.object.isRequired,
    onStartingDotsChange: PropTypes.func.isRequired
  };

  handleStartingDotsChange = e => {
    const startingDots = parseInt(e.target.value, 10);
    this.props.onStartingDotsChange(this.props.name, startingDots);
  };

  render() {
    const {
      name,
      displayName = capitalizeFirstLetter(name),
      maxDots,
      availableStartingDots,
      traitState
    } = this.props;

    return (
      <div>
        {displayName} <Dots level={dotSelector(traitState)} max={maxDots} />
        {availableStartingDots.length > 0 && (
          <StartingDots
            available={availableStartingDots}
            value={traitState.startingDots}
            onChange={this.handleStartingDotsChange}
          />
        )}
      </div>
    );
  }
}

export default Trait;
