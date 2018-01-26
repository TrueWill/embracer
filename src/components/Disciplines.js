import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TraitCategory from './TraitCategory';

const categoryNameByAffinity = {
  inClan: 'In-clan Disciplines',
  outOfClan: 'Out-of-clan Disciplines'
};

class Disciplines extends Component {
  static propTypes = {
    affinity: PropTypes.oneOf(['inClan', 'outOfClan']).isRequired,
    names: PropTypes.arrayOf(PropTypes.string).isRequired,
    displayNameOverride: PropTypes.object.isRequired,
    traits: PropTypes.object.isRequired,
    setStartingDots: PropTypes.func.isRequired
  };

  handleSetStartingDots = (categoryName, trait, startingDots) => {
    this.props.setStartingDots(
      'disciplines.' + this.props.affinity,
      trait,
      startingDots
    );
  };

  render() {
    const { affinity, names, displayNameOverride, traits } = this.props;

    return (
      <TraitCategory
        categoryName={categoryNameByAffinity[affinity]}
        traitNames={names}
        traitDisplayNameOverride={displayNameOverride}
        categoryTraits={traits}
        setStartingDots={this.handleSetStartingDots}
      />
    );
  }
}

export default Disciplines;
