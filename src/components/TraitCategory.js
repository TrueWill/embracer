import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { capitalizeFirstLetter } from '../utils/stringUtils';
import UnrankedTrait from './UnrankedTrait';

const maxDots = 5;

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
      <UnrankedTrait
        key={name}
        name={name}
        displayName={traitDisplayNameOverride[name]}
        maxDots={maxDots}
        availableStartingDots={categoryTraits.availableStartingDots}
        traitState={categoryTraits[name] || {}}
        onStartingDotsChange={this.handleStartingDotsChange}
      />
    ));

    return (
      <div>
        <h3>{capitalizeFirstLetter(categoryName)}</h3>
        {traits}
        <Link to="/">Attributes</Link>
      </div>
    );
  }
}

export default TraitCategory;
