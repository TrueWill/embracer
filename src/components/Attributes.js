import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Trait from './Trait';

const maxDots = 10;
const rankDots = [7, 5, 3];

const buildHandleRankChange = (trait, setRank) => e => {
  const dotsFromRank = parseInt(e.target.value, 10);
  setRank('attributes', trait, dotsFromRank);
};

class Attributes extends Component {
  static propTypes = {
    attributes: PropTypes.object.isRequired,
    setRank: PropTypes.func.isRequired
  };

  handlePhysicalRankChange = buildHandleRankChange(
    'physical',
    this.props.setRank
  );
  handleSocialRankChange = buildHandleRankChange('social', this.props.setRank);
  handleMentalRankChange = buildHandleRankChange('mental', this.props.setRank);

  render() {
    const attributes = this.props.attributes;

    return (
      <div>
        <h3>Attributes</h3>
        <Trait
          name="Physical"
          maxDots={maxDots}
          rankDots={rankDots}
          traitState={attributes.physical}
          onChange={this.handlePhysicalRankChange}
        />
        <Trait
          name="Social"
          maxDots={maxDots}
          rankDots={rankDots}
          traitState={attributes.social}
          onChange={this.handleSocialRankChange}
        />
        <Trait
          name="Mental"
          maxDots={maxDots}
          rankDots={rankDots}
          traitState={attributes.mental}
          onChange={this.handleMentalRankChange}
        />
        <Link to="/skills">Skills</Link>
      </div>
    );
  }
}

export default Attributes;
