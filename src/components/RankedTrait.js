import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dots from './Dots';
import Rank from './Rank';
import getDots from '../utils/getDots';
import { capitalizeFirstLetter } from '../utils/stringUtils';

class RankedTrait extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    displayName: PropTypes.string,
    maxDots: PropTypes.number.isRequired,
    rankDots: PropTypes.arrayOf(PropTypes.number).isRequired,
    traitState: PropTypes.object.isRequired,
    onRankChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
  };

  handleRankChange = e => {
    const dotsFromRank = parseInt(e.target.value, 10);
    this.props.onRankChange(this.props.name, dotsFromRank);
  };

  handleOnClick = () => {
    this.props.onClick(this.props.name);
  };

  render() {
    const {
      name,
      displayName = capitalizeFirstLetter(name),
      maxDots,
      rankDots,
      traitState
    } = this.props;

    return (
      <div>
        {displayName}{' '}
        <Dots
          level={getDots(traitState)}
          max={maxDots}
          onClick={this.handleOnClick}
        />
        <Rank
          dots={rankDots}
          dotValue={traitState.dotsFromRank}
          onChange={this.handleRankChange}
        />
      </div>
    );
  }
}

export default RankedTrait;
