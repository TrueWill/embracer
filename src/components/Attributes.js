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
    attributeBonus: PropTypes.number.isRequired,
    setRank: PropTypes.func.isRequired,
    setFocus: PropTypes.func.isRequired,
    purchaseOrUnpurchaseDot: PropTypes.func.isRequired
  };

  handleRankChange = (trait, dotsFromRank) => {
    this.props.setRank('attributes', trait, dotsFromRank);
  };

  handleFocusChange = (attribute, focus) => {
    this.props.setFocus(attribute, focus);
  };

  handleOnClick = trait => {
    this.props.purchaseOrUnpurchaseDot('attributes', trait);
  };

  render() {
    const { attributes, attributeBonus } = this.props;

    const traits = attributeTraitNames.map(name => (
      <div key={name} className="col-sm-4">
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
      <div className="row">
        <div className="col-sm-12">
          <div className="panel panel-default">
            <div className="panel-heading">Attributes</div>
            <div className="panel-body">{traits}</div>
            <div className="panel-footer">
              Attribute Bonus: {attributeBonus}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Attributes;
