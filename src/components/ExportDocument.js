import React from 'react';
import PropTypes from 'prop-types';
import exportPdf from '../utils/exportPdf';

export default function ExportDocument({ state }) {
  const handleClick = () => {
    // Could dispatch an action, but this doesn't change state.
    // Could use an async action, but we're not really waiting for anything.
    // Might as well just generate the PDF here.
    exportPdf(state);
  };

  return (
    <button type="button" className="btn btn-dark" onClick={handleClick}>
      Download PDF (beta)
    </button>
  );
}

ExportDocument.propTypes = {
  state: PropTypes.object.isRequired
};
