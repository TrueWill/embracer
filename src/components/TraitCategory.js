import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { capitalizeFirstLetter } from '../utils/stringUtils';
import { standardTraitMaxDots } from '../constants/characterOptions';
import Trait from './Trait';
import Section from './Section';
import chunk from 'lodash.chunk';

class TraitCategory extends Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    traitNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    traitDisplayNameOverride: PropTypes.object.isRequired,
    categoryTraits: PropTypes.object.isRequired,
    adjustAvailable: PropTypes.func.isRequired,
    setStartingDots: PropTypes.func.isRequired,
    purchaseOrUnpurchaseDot: PropTypes.func.isRequired
  };

  handleStartingDotsChange = (trait, startingDots) => {
    this.props.setStartingDots(this.props.categoryName, trait, startingDots);
  };

  handleOnClick = trait => {
    this.props.purchaseOrUnpurchaseDot(this.props.categoryName, trait);
  };

  render() {
    const {
      categoryName,
      traitNames,
      traitDisplayNameOverride,
      categoryTraits,
      adjustAvailable
    } = this.props;

    const traits = traitNames.map(name => {
      const traitState = categoryTraits[name] || {};

      const availableStartingDots = adjustAvailable(
        categoryTraits.availableStartingDots,
        name,
        traitState.dotsPurchased || 0
      );

      return (
        <Trait
          key={name}
          name={name}
          displayName={traitDisplayNameOverride[name]}
          maxDots={standardTraitMaxDots}
          availableStartingDots={availableStartingDots}
          traitState={traitState}
          onStartingDotsChange={this.handleStartingDotsChange}
          onClick={this.handleOnClick}
        />
      );
    });

    const traitsPerColumn = 9;

    const columns = chunk(traits, traitsPerColumn).map((column, index) => (
      <div key={index} className="col-sm-4">
        {column}
      </div>
    ));

    return (
      <Section header={capitalizeFirstLetter(categoryName)}>
        <div className="row">{columns}</div>
      </Section>
    );
  }
}

export default TraitCategory;
