import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dots from './Dots';
import StartingDots from './StartingDots';
import getDots from '../utils/getDots';
import { capitalizeFirstLetter } from '../utils/stringUtils';
import styles from './Trait.module.css';

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
    onStartingDotsChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
  };

  handleStartingDotsChange = e => {
    const startingDots = parseInt(e.target.value, 10);
    this.props.onStartingDotsChange(this.props.name, startingDots);
  };

  handleOnClick = () => {
    this.props.onClick(this.props.name);
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
        <div className={styles.name}>{displayName}</div>
        <Dots
          level={getDots(traitState)}
          max={maxDots}
          onClick={this.handleOnClick}
        />
        {availableStartingDots.length > 0 && (
          <StartingDots
            available={availableStartingDots}
            value={traitState.startingDots}
            disallowClear={name === 'generation'}
            onChange={this.handleStartingDotsChange}
          />
        )}
      </div>
    );
  }
}

export default Trait;
