import React, { Component } from 'react';
import BasicInfoContainer from '../containers/BasicInfoContainer';

export default class App extends Component {
  render() {
    return (
      <div>
        <h2>Embracer</h2>
        <BasicInfoContainer />
      </div>
    );
  }
}
