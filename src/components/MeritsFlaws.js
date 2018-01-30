import React, { Component } from 'react';
import PropTypes from 'prop-types';

const typeDescription = {
  merits: 'Merits',
  flaws: 'Flaws'
};

const getDescription = meritFlaw =>
  `${meritFlaw.name} (${meritFlaw.points} point${
    meritFlaw.points > 1 ? 's' : ''
  })`;

class MeritsFlaws extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['merits', 'flaws']).isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        points: PropTypes.number
      })
    ).isRequired,
    selected: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        points: PropTypes.number
      })
    ).isRequired,
    availablePoints: PropTypes.number.isRequired,
    add: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
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
    this.props.add(name, points);
    this.setState({ selectedValue: '' });
  };

  render() {
    const { type, options, selected, availablePoints } = this.props;
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

    // TODO: Hack, would need polyfill
    const selectedPoints =
      selectedValue && options.find(x => x.name === selectedValue).points;

    return (
      <div>
        <h3>{typeDescription[type]}</h3>
        <ul>{selectedList}</ul>
        <select value={selectedValue} onChange={this.handleSelectChange}>
          <option value="">(not selected)</option>
          {optionsList}
        </select>
        {selectedValue &&
          selectedPoints <= availablePoints && (
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
