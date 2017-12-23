import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Dots from './Dots';
import Rank from './Rank';

const maxDots = 10;
const rankDots = [7, 5, 3];

const buildHandleRankChange = (trait, setRank) => e => {
  const dots = parseInt(e.target.value, 10);
  const rank = rankDots.indexOf(dots) + 1;
  setRank('attributes', trait, rank, dots);
};

// TODO: Set initial rank selection

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
        <div>
          Physical <Dots level={attributes.physical.dots} max={maxDots} />
          <Rank dots={rankDots} onChange={this.handlePhysicalRankChange} />
        </div>
        <div>
          Social <Dots level={attributes.social.dots} max={maxDots} />
          <Rank dots={rankDots} onChange={this.handleSocialRankChange} />
        </div>
        <div>
          Mental <Dots level={attributes.mental.dots} max={maxDots} />
          <Rank dots={rankDots} onChange={this.handleMentalRankChange} />
        </div>
        <Link to="/skills">Skills</Link>
      </div>
    );
  }
}

export default Attributes;
