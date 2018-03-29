import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from './Section';
import { maxMeritPoints } from '../constants/merits';

const getDescription = merit =>
  `${merit.name} (${merit.points} point${merit.points > 1 ? 's' : ''})`;

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
        name: PropTypes.string,
        points: PropTypes.number
      })
    ).isRequired,
    availablePoints: PropTypes.number.isRequired,
    addMerit: PropTypes.func.isRequired,
    removeMerit: PropTypes.func.isRequired
  };

  state = {
    selectedValue: ''
  };

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
        {getDescription(x)}{' '}
        <DeleteButton id={x.name} onClick={this.handleRemove} />
      </li>
    ));

    const optionsList = [];

    optionsMap.forEach((value, key) => {
      const merit = {
        name: key,
        points: value.points
      };

      optionsList.push(
        <option value={merit.name} key={merit.name}>
          {getDescription(merit)}
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
        <div>
          Max points: {maxMeritPoints} Available: {availablePoints} (other areas
          have merits)
        </div>
      </Section>
    );
  }
}

export default Merits;
