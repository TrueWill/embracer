import React, { Component } from 'react';
import RankedTrait from './RankedTrait';
import Focus from './Focus';
import Section from './Section';
import {
  attributeTraitNames,
  attributeMaxDots,
  attributesRankDots
} from '../constants/characterOptions';

type AttributesProps = {
  attributes: object;
  attributeBonus: number;
  foci: {
    [key: string]: string[];
  };
  setRank: (...args: any[]) => any;
  setFocus: (...args: any[]) => any;
  purchaseOrUnpurchaseDot: (...args: any[]) => any;
};

class Attributes extends Component<AttributesProps, {}> {
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
    const { attributes, attributeBonus, foci } = this.props;

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
      <Section
        header="Attributes"
        footer={
          <React.Fragment>Attribute Bonus: {attributeBonus}</React.Fragment>
        }
      >
        <div className="row">{traits}</div>
      </Section>
    );
  }
}

export default Attributes;
