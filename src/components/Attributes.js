import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Trait from './Trait';
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
    setFocus: PropTypes.func.isRequired
  };

  handleRankChange = (trait, dotsFromRank) => {
    this.props.setRank('attributes', trait, dotsFromRank);
  };

  handleFocusChange = (attribute, focus) => {
    this.props.setFocus(attribute, focus);
  };

  render() {
    const { attributes } = this.props;

    const traits = attributeTraitNames.map(name => (
      <div key={name}>
        <Trait
          name={name}
          maxDots={attributeMaxDots}
          rankDots={attributesRankDots}
          traitState={attributes[name]}
          onRankChange={this.handleRankChange}
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
