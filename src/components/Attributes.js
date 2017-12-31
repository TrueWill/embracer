import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Dots from './Dots';
import Rank from './Rank';
import dotSelector from '../utils/dotSelector';

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
        <div>
          Physical{' '}
          <Dots level={dotSelector(attributes.physical)} max={maxDots} />
          <Rank
            dots={rankDots}
            dotValue={attributes.physical.dotsFromRank}
            onChange={this.handlePhysicalRankChange}
          />
        </div>
        <div>
          Social <Dots level={dotSelector(attributes.social)} max={maxDots} />
          <Rank
            dots={rankDots}
            dotValue={attributes.social.dotsFromRank}
            onChange={this.handleSocialRankChange}
          />
        </div>
        <div>
          Mental <Dots level={dotSelector(attributes.mental)} max={maxDots} />
          <Rank
            dots={rankDots}
            dotValue={attributes.mental.dotsFromRank}
            onChange={this.handleMentalRankChange}
          />
        </div>
        <Link to="/skills">Skills</Link>
      </div>
    );
  }
}

export default Attributes;
