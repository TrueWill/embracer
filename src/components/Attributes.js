import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Trait from './Trait';

const maxDots = 10;
const rankDots = [7, 5, 3];
const traitNames = ['physical', 'social', 'mental'];

class Attributes extends Component {
  static propTypes = {
    attributes: PropTypes.object.isRequired,
    setRank: PropTypes.func.isRequired
  };

  handleRankChange = (trait, dotsFromRank) => {
    this.props.setRank('attributes', trait, dotsFromRank);
  };

  render() {
    const { attributes } = this.props;

    const traits = traitNames.map(name => (
      <Trait
        key={name}
        name={name}
        maxDots={maxDots}
        rankDots={rankDots}
        traitState={attributes[name]}
        onRankChange={this.handleRankChange}
      />
    ));

    return (
      <div>
        <h3>Attributes</h3>
        {traits}
        <Link to="/skills">Skills</Link>
      </div>
    );
  }
}

export default Attributes;
