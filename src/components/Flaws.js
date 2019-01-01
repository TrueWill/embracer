import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from './Section';
import { getFlawDescription } from '../utils/meritFlawUtils';
import { maxFlawPoints } from '../constants/flaws';

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

class Flaws extends Component {
  static propTypes = {
    optionsMap: PropTypes.instanceOf(Map).isRequired,
    selected: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        points: PropTypes.number
      })
    ).isRequired,
    availablePoints: PropTypes.number.isRequired,
    addFlaw: PropTypes.func.isRequired,
    removeFlaw: PropTypes.func.isRequired
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
    this.props.addFlaw(name, points);
    this.setState({ selectedValue: '' });
  };

  handleRemove = name => {
    this.props.removeFlaw(name);
  };

  render() {
    const { optionsMap, selected, availablePoints } = this.props;
    const { selectedValue } = this.state;

    const selectedList = selected.map(x => (
      <li key={x.name}>
        {getFlawDescription(x)}{' '}
        <DeleteButton id={x.name} onClick={this.handleRemove} />
      </li>
    ));

    const optionsList = [];

    optionsMap.forEach((value, key) => {
      const flaw = {
        name: key,
        points: value.points
      };

      optionsList.push(
        <option value={flaw.name} key={flaw.name}>
          {getFlawDescription(flaw)}
        </option>
      );
    });

    const selectedPoints =
      selectedValue && optionsMap.get(selectedValue).points;

    return (
      <Section header="Flaws">
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
          Max points: {maxFlawPoints} Available: {availablePoints}
        </div>
      </Section>
    );
  }
}

export default Flaws;
