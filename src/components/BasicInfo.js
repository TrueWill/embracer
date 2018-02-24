import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClanContainer from '../containers/ClanContainer';
import Archetype from './Archetype';

export default class BasicInfo extends Component {
  static propTypes = {
    basicInfo: PropTypes.object.isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired
  };

  render() {
    const basicInfo = this.props.basicInfo;

    return (
      <div>
        <Archetype
          archetype={basicInfo.archetype}
          updateArchetype={this.props.actions.updateArchetype}
        />
        <ClanContainer />
      </div>
    );
  }
}
