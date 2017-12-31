import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dots from './Dots';
import Rank from './Rank';
import dotSelector from '../utils/dotSelector';
import { capitalizeFirstLetter } from '../utils/stringUtils';

class Trait extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    displayName: PropTypes.string,
    maxDots: PropTypes.number.isRequired,
    rankDots: PropTypes.arrayOf(PropTypes.number).isRequired,
    traitState: PropTypes.object.isRequired,
    onRankChange: PropTypes.func.isRequired
  };

  handleRankChange = e => {
    const dotsFromRank = parseInt(e.target.value, 10);
    this.props.onRankChange(this.props.name, dotsFromRank);
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
        {displayName} <Dots level={dotSelector(traitState)} max={maxDots} />
        <Rank
          dots={rankDots}
          dotValue={traitState.dotsFromRank}
          onChange={this.handleRankChange}
        />
      </div>
    );
  }
}

export default Trait;
