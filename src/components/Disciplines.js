import React from 'react';
import PropTypes from 'prop-types';
import TraitCategory from './TraitCategory';

const categoryNameByAffinity = {
  inClan: 'In-clan Disciplines',
  outOfClan: 'Out-of-clan Disciplines'
};

export default function Disciplines({
  affinity,
  names,
  displayNameOverride,
  traits,
  setStartingDots,
  purchaseOrUnpurchaseDot
}) {
  const handleSetStartingDots = (categoryName, trait, startingDots) => {
    setStartingDots('disciplines.' + affinity, trait, startingDots);
  };

  const handlePurchaseOrUnpurchaseDot = (categoryName, trait) => {
    purchaseOrUnpurchaseDot('disciplines.' + affinity, trait);
  };

  const adjustAvailable = availableStartingDots => availableStartingDots;

  return (
    <TraitCategory
      categoryName={categoryNameByAffinity[affinity]}
      traitNames={names}
      traitDisplayNameOverride={displayNameOverride}
      categoryTraits={traits}
      adjustAvailable={adjustAvailable}
      setStartingDots={handleSetStartingDots}
      purchaseOrUnpurchaseDot={handlePurchaseOrUnpurchaseDot}
    />
  );
}

Disciplines.propTypes = {
  affinity: PropTypes.oneOf(['inClan', 'outOfClan']).isRequired,
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
  displayNameOverride: PropTypes.object.isRequired,
  traits: PropTypes.object.isRequired,
  setStartingDots: PropTypes.func.isRequired,
  purchaseOrUnpurchaseDot: PropTypes.func.isRequired
};
