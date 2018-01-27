import React, { Component } from 'react';
import PropTypes from 'prop-types';

const getDescription = meritFlaw =>
  `${meritFlaw.name} (${Math.abs(meritFlaw.points)} point ${
    meritFlaw.points < 0 ? 'flaw' : 'merit'
  })`;

class MeritsFlaws extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        points: PropTypes.number // negative for flaws
      })
    ).isRequired,
    selected: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        points: PropTypes.number
      })
    ).isRequired
  };

  render() {
    const { options, selected } = this.props;

    const selectedList = selected.map(x => (
      <li key={x.name}>{getDescription(x)}</li>
    ));

    const optionsList = options.map(x => (
      <option value={x.name} key={x.name}>
        {getDescription(x)}
      </option>
    ));

    return (
      <div>
        <h3>Merits / Flaws</h3>
        <ul>{selectedList}</ul>
        <select>{optionsList}</select><button type="button" className="btn btn-primary">Add</button>
      </div>
    );
  }
}

export default MeritsFlaws;
