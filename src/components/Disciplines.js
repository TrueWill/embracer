import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TraitCategoryContainer from '../containers/TraitCategoryContainer';

class Disciplines extends Component {
  static propTypes = {
    inClanDisciplineNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    disciplineTraits: PropTypes.object.isRequired
  };

  render() {
    const { inClanDisciplineNames, disciplines } = this.props;

    const inClanDisciplines = (
      <TraitCategoryContainer
        categoryName="disciplines"
        traitNames={inClanDisciplineNames}
        traitDisplayNameOverride={{}}
      />
    );

    return (
      <div>
        <h2>Disciplines</h2>
        <h3>In-Clan</h3>
        {inClanDisciplines}
      </div>
    );
  }
}

export default Disciplines;
