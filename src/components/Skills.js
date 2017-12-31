import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Trait from './Trait';

const maxDots = 5;
const rankDots = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
const traitNames = [
  'academics',
  'animalKen',
  'athletics',
  'awareness',
  'brawl',
  'computer',
  'crafts',
  'dodge',
  'drive',
  'empathy',
  'firearms',
  'intimidation',
  'investigation',
  'leadership',
  'linguistics',
  'lore',
  'medicine',
  'melee',
  'occult',
  'performance',
  'science',
  'security',
  'stealth',
  'streetwise',
  'subterfuge',
  'survival'
];

class Skills extends Component {
  static propTypes = {
    skills: PropTypes.object.isRequired,
    setRank: PropTypes.func.isRequired
  };

  handleRankChange = (trait, dotsFromRank) => {
    this.props.setRank('skills', trait, dotsFromRank);
  };

  render() {
    const { skills } = this.props;

    const traits = traitNames.map(name => (
      <Trait
        key={name}
        name={name}
        maxDots={maxDots}
        rankDots={rankDots}
        traitState={skills[name]}
        onRankChange={this.handleRankChange}
      />
    ));

    return (
      <div>
        <h3>Skills</h3>
        {traits}
        <Link to="/">Attributes</Link>
      </div>
    );
  }
}

export default Skills;
