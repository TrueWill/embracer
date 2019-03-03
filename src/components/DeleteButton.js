import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DeleteButton extends Component {
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
