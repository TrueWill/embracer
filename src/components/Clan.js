import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { clans } from '../constants/characterOptions';

export default class Clan extends Component {
  static propTypes = {
    clan: PropTypes.string.isRequired,
    updateClan: PropTypes.func.isRequired
  };

  handleClanChange = e => {
    this.props.updateClan(e.target.value);
  };

  render() {
    const { clan } = this.props;

    const clanOptions = clans.map(c => (
      <option value={c} key={c}>
        {c}
      </option>
    ));

    return (
      <div>
        <h3>Clan</h3>
        <select value={clan} onChange={this.handleClanChange}>
          <option value="">(not selected)</option>
          {clanOptions}
        </select>
        (changing will reset Disciplines, Merits, and Morality)
      </div>
    );
  }
}
