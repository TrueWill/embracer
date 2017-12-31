import React from 'react';
import PropTypes from 'prop-types';
import Dots from './Dots';
import Rank from './Rank';
import dotSelector from '../utils/dotSelector';

const Trait = ({ name, maxDots, rankDots, traitState, onChange }) => (
  <div>
    {name} <Dots level={dotSelector(traitState)} max={maxDots} />
    <Rank
      dots={rankDots}
      dotValue={traitState.dotsFromRank}
      onChange={onChange}
    />
  </div>
);

Trait.propTypes = {
  name: PropTypes.string.isRequired,
  maxDots: PropTypes.number.isRequired,
  rankDots: PropTypes.arrayOf(PropTypes.number).isRequired,
  traitState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Trait;
