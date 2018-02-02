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
    optionsMap: PropTypes.instanceOf(Map).isRequired,
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
    const points = this.props.optionsMap.get(name).points;
    this.props.add(name, points);
    this.setState({ selectedValue: '' });
  };

  render() {
    const { type, optionsMap, selected, availablePoints } = this.props;
    const { selectedValue } = this.state;

    const selectedList = selected.map(x => (
      <li key={x.name}>{getDescription(x)}</li>
    ));

    const optionsList = [];

    optionsMap.forEach((value, key) => {
      const meritFlaw = {
        name: key,
        points: value.points
      };

      optionsList.push(
        <option value={meritFlaw.name} key={meritFlaw.name}>
          {getDescription(meritFlaw)}
        </option>
      );
    });

    const selectedPoints =
      selectedValue && optionsMap.get(selectedValue).points;

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
