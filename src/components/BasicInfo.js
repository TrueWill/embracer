import React, { Component } from 'react';
import ClanContainer from '../containers/ClanContainer';
import ArchetypeContainer from '../containers/ArchetypeContainer';

export default class BasicInfo extends Component {
  render() {
    return (
      <div>
        <ArchetypeContainer />
        <ClanContainer />
      </div>
    );
  }
}
