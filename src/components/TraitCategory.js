import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { capitalizeFirstLetter } from '../utils/stringUtils';
import { standardTraitMaxDots } from '../constants/characterOptions';
import Trait from './Trait';

class TraitCategory extends Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    traitNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    traitDisplayNameOverride: PropTypes.object.isRequired,
    categoryTraits: PropTypes.object.isRequired,
    setStartingDots: PropTypes.func.isRequired
  };

  handleStartingDotsChange = (trait, startingDots) => {
    this.props.setStartingDots(this.props.categoryName, trait, startingDots);
  };

  render() {
    const {
      categoryName,
      traitNames,
      traitDisplayNameOverride,
      categoryTraits
    } = this.props;

    const traits = traitNames.map(name => (
      <Trait
        key={name}
        name={name}
        displayName={traitDisplayNameOverride[name]}
        maxDots={standardTraitMaxDots}
        availableStartingDots={categoryTraits.availableStartingDots}
        traitState={categoryTraits[name] || {}}
        onStartingDotsChange={this.handleStartingDotsChange}
      />
    ));

    return (
      <div>
        <h3>{capitalizeFirstLetter(categoryName)}</h3>
        {traits}
      </div>
    );
  }
}

export default TraitCategory;
