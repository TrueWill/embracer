import React from 'react';
import type { TraitState } from '../types';
import Dots from './Dots';
import Rank from './Rank';
import getDots from '../utils/getDots';
import { capitalizeFirstLetter } from '../utils/stringUtils';

interface RankedTraitProps {
  name: string;
  displayName?: string;
  maxDots: number;
  rankDots: number[];
  traitState: TraitState;
  onRankChange: (name: string, dotsFromRank: number) => void;
  onClick: (name: string) => void;
}

export default function RankedTrait(props: RankedTraitProps) {
  const {
    name,
    displayName = capitalizeFirstLetter(name),
    maxDots,
    rankDots,
    traitState,
    onRankChange,
    onClick
  } = props;

  const handleRankChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
