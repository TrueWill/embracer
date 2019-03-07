import React from 'react';
import PropTypes from 'prop-types';
import Dots from './Dots';
import Rank from './Rank';
import getDots from '../utils/getDots';
import { capitalizeFirstLetter } from '../utils/stringUtils';

export default function RankedTrait(props) {
  const {
    name,
    displayName = capitalizeFirstLetter(name),
    maxDots,
    rankDots,
    traitState,
    onRankChange,
    onClick
  } = props;

  const handleRankChange = e => {
    const dotsFromRank = parseInt(e.target.value, 10);
    onRankChange(name, dotsFromRank);
  };

  const handleOnClick = () => {
    onClick(name);
  };

  return (
    <div>
      {displayName}{' '}
      <Dots level={getDots(traitState)} max={maxDots} onClick={handleOnClick} />
      <Rank
        dots={rankDots}
        dotValue={traitState.dotsFromRank}
        onChange={handleRankChange}
      />
    </div>
  );
}

RankedTrait.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string,
  maxDots: PropTypes.number.isRequired,
  rankDots: PropTypes.arrayOf(PropTypes.number).isRequired,
  traitState: PropTypes.object.isRequired,
  onRankChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};
