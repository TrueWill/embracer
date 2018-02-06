import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RankedTrait from './RankedTrait';
import Focus from './Focus';
import {
  attributeTraitNames,
  attributeMaxDots,
  attributesRankDots,
  foci
} from '../constants/characterOptions';

class Attributes extends Component {
  static propTypes = {
    attributes: PropTypes.object.isRequired,
    setRank: PropTypes.func.isRequired,
    setFocus: PropTypes.func.isRequired,
    purchaseDot: PropTypes.func.isRequired
  };

  handleRankChange = (trait, dotsFromRank) => {
    this.props.setRank('attributes', trait, dotsFromRank);
  };

  handleFocusChange = (attribute, focus) => {
    this.props.setFocus(attribute, focus);
  };

  handleOnClick = trait => {
    this.props.purchaseDot('attributes', trait);
  };

  render() {
    const { attributes } = this.props;

    const traits = attributeTraitNames.map(name => (
      <div key={name}>
        <RankedTrait
          name={name}
          maxDots={attributeMaxDots}
          rankDots={attributesRankDots}
          traitState={attributes[name]}
          onRankChange={this.handleRankChange}
          onClick={this.handleOnClick}
        />
        <Focus
          attribute={name}
          foci={foci[name]}
          value={attributes[name].focus}
          onChange={this.handleFocusChange}
        />
      </div>
    ));

    return (
      <div>
        <h3>Attributes</h3>
        {traits}
      </div>
    );
  }
}

export default Attributes;
