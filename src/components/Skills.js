import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UnrankedTrait from './UnrankedTrait';

const maxDots = 5;

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

const traitDisplayNameOverride = {
  animalKen: 'Animal Ken'
};

class Skills extends Component {
  static propTypes = {
    skills: PropTypes.object.isRequired,
    setStartingDots: PropTypes.func.isRequired
  };

  handleStartingDotsChange = (trait, startingDots) => {
    this.props.setStartingDots('skills', trait, startingDots);
  };

  render() {
    const { skills } = this.props;

    const traits = traitNames.map(name => (
      <UnrankedTrait
        key={name}
        name={name}
        displayName={traitDisplayNameOverride[name]}
        maxDots={maxDots}
        availableStartingDots={skills.availableStartingDots}
        traitState={skills[name] || {}}
        onStartingDotsChange={this.handleStartingDotsChange}
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
