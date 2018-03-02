import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from './Section';

const typeDescription = {
  merits: 'Merits',
  flaws: 'Flaws'
};

const getDescription = meritFlaw =>
  `${meritFlaw.name} (${meritFlaw.points} point${
    meritFlaw.points > 1 ? 's' : ''
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

  handleSelectChange = e => {
    this.setState({ selectedValue: e.target.value });
  };

  handleAdd = () => {
    const name = this.state.selectedValue;
    const points = this.props.optionsMap.get(name).points;
    this.props.add(name, points);
    this.setState({ selectedValue: '' });
  };

  handleRemove = name => {
    this.props.remove(name);
  };

  render() {
    const { type, optionsMap, selected, availablePoints } = this.props;
    const { selectedValue } = this.state;

    const selectedList = selected.map(x => (
      <li key={x.name}>
        {getDescription(x)}{' '}
        <DeleteButton id={x.name} onClick={this.handleRemove} />
      </li>
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
      <Section header={typeDescription[type]}>
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
      </Section>
    );
  }
}

export default MeritsFlaws;
