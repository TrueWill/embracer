import React, { Component } from 'react';
import PropTypes from 'prop-types';
import exportPdf from '../utils/exportPdf';

class ExportDocument extends Component {
  static propTypes = {
    state: PropTypes.object.isRequired
  };

  handleClick = () => {
    // Could dispatch an action, but this doesn't change state.
    // Could use an async action, but we're not really waiting for anything.
    // Might as well just generate the PDF here.
    exportPdf(this.props.state);
  };

  render() {
    return (
      <button type="button" className="btn btn-dark" onClick={this.handleClick}>
        Download PDF (beta)
      </button>
    );
  }
}

export default ExportDocument;
