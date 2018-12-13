import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Focus extends Component {
  static propTypes = {
    attribute: PropTypes.string.isRequired,
    foci: PropTypes.arrayOf(PropTypes.string).isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    value: ''
  };

  handleChange = e => {
    const focus = e.target.value;
    this.props.onChange(this.props.attribute, focus);
  };

  render() {
    const { foci, value } = this.props;

    const options = foci.map(f => (
      <option key={f} value={f}>
        {f}
      </option>
    ));

    return (
      <select value={value} onChange={this.handleChange}>
        <option value="">(no focus selected)</option>
        {options}
      </select>
    );
  }
}

export default Focus;
