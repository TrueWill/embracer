import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Trait from './Trait';

const maxDots = 10;
const rankDots = [7, 5, 3];

class Attributes extends Component {
  static propTypes = {
    attributes: PropTypes.object.isRequired,
    setRank: PropTypes.func.isRequired
  };

  handleRankChange = (trait, dotsFromRank) => {
    this.props.setRank('attributes', trait, dotsFromRank);
  };

  render() {
    const attributes = this.props.attributes;

    return (
      <div>
        <h3>Attributes</h3>
        <Trait
          name="physical"
          maxDots={maxDots}
          rankDots={rankDots}
          traitState={attributes.physical}
          onRankChange={this.handleRankChange}
        />
        <Trait
          name="social"
          maxDots={maxDots}
          rankDots={rankDots}
          traitState={attributes.social}
          onRankChange={this.handleRankChange}
        />
        <Trait
          name="mental"
          maxDots={maxDots}
          rankDots={rankDots}
          traitState={attributes.mental}
          onRankChange={this.handleRankChange}
        />
        <Link to="/skills">Skills</Link>
      </div>
    );
  }
}

export default Attributes;
