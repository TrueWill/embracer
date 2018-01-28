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
    ).isRequired,
    addMeritFlaw: PropTypes.func.isRequired,
    removeMeritFlaw: PropTypes.func.isRequired
  };

  state = {
    selectedValue: ''
  };

  // TODO: Implement remove

  handleSelectChange = e => {
    this.setState({ selectedValue: e.target.value });
  };

  handleAdd = () => {
    const name = this.state.selectedValue;
    // TODO: Polyfill find or implement differently
    const points = this.props.options.find(x => x.name === name).points;
    this.props.addMeritFlaw(name, points);
    this.setState({ selectedValue: '' });
  };

  render() {
    const { options, selected } = this.props;
    const { selectedValue } = this.state;

    const selectedList = selected.map(x => (
      <li key={x.name}>{getDescription(x)}</li>
    ));

    // TODO: Inefficient and hacky
    const optionsList = options
      .filter(x => !selected.some(y => y.name === x.name))
      .map(x => (
        <option value={x.name} key={x.name}>
          {getDescription(x)}
        </option>
      ));

    return (
      <div>
        <h3>Merits / Flaws</h3>
        <ul>{selectedList}</ul>
        <select value={selectedValue} onChange={this.handleSelectChange}>
          <option value="">(not selected)</option>
          {optionsList}
        </select>
        {selectedValue && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleAdd}
          >
            Add
          </button>
        )}
      </div>
    );
  }
}

export default MeritsFlaws;
