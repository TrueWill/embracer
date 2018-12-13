import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from './Section';
import { maxMeritPoints } from '../constants/merits';

const getSelectedDescription = merit => {
  const timesPurchased = merit.timesPurchased || 1;
  const timesText = timesPurchased === 1 ? '' : ` X ${timesPurchased}`;

  return `${merit.name} (${merit.points} point${
    merit.points > 1 ? 's' : ''
  }${timesText})`;
};

const getOptionDescription = merit =>
  `${merit.name}${merit.multiple ? '*' : ''} (${merit.points} point${
    merit.points > 1 ? 's' : ''
  })`;

class DeleteButton extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  handleClick = () => {
    this.props.onClick(this.props.id);
  };

  render() {
    return <i className="fa fa-trash pointer" onClick={this.handleClick} />;
  }
}

class Merits extends Component {
  static propTypes = {
    optionsMap: PropTypes.instanceOf(Map).isRequired,
    selected: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        points: PropTypes.number.isRequired,
        timesPurchased: PropTypes.number
      })
    ).isRequired,
    availablePoints: PropTypes.number.isRequired,
    addMerit: PropTypes.func.isRequired,
    removeMerit: PropTypes.func.isRequired
  };

  state = {
    selectedValue: ''
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.optionsMap.get(prevState.selectedValue)) {
      // Clear out stale state
      return {
        selectedValue: ''
      };
    }

    // No state updates required
    return null;
  }

  handleSelectChange = e => {
    this.setState({ selectedValue: e.target.value });
  };

  handleAdd = () => {
    const name = this.state.selectedValue;
    const points = this.props.optionsMap.get(name).points;
    this.props.addMerit(name, points);
    this.setState({ selectedValue: '' });
  };

  handleRemove = name => {
    this.props.removeMerit(name);
  };

  render() {
    const { optionsMap, selected, availablePoints } = this.props;
    const { selectedValue } = this.state;

    const selectedList = selected.map(x => (
      <li key={x.name}>
        {getSelectedDescription(x)}{' '}
        <DeleteButton id={x.name} onClick={this.handleRemove} />
      </li>
    ));

    const optionsList = [];

    optionsMap.forEach((value, key) => {
      const merit = {
        name: key,
        points: value.points,
        multiple: value.multiple
      };

      optionsList.push(
        <option value={merit.name} key={merit.name}>
          {getOptionDescription(merit)}
        </option>
      );
    });

    const selectedPoints =
      selectedValue && optionsMap.get(selectedValue).points;

    return (
      <Section header="Merits">
        <ul>{selectedList}</ul>
        <select value={selectedValue} onChange={this.handleSelectChange}>
          <option value="">(not selected)</option>
          {optionsList}
        </select>
        {selectedValue &&
          selectedPoints <= availablePoints && (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={this.handleAdd}
            >
              Add
            </button>
          )}
        <div>* - Can purchase multiple times</div>
        <div>
          Max points: {maxMeritPoints} Available: {availablePoints} (other areas
          have merits)
        </div>
      </Section>
    );
  }
}

export default Merits;
