import React from 'react';
import type { RootState } from '../types';
import exportPdf from '../utils/exportPdf';

interface ExportDocumentProps {
  state: RootState;
}

export default function ExportDocument({ state }: ExportDocumentProps) {
  const handleClick = () => {
    // Could dispatch an action, but this doesn't change state.
    // Could use an async action, but we're not really waiting for anything.
    // Might as well just generate the PDF here.
    exportPdf(state);
  };

  return (
    <button type="button" className="btn btn-dark" onClick={handleClick}>
      Download PDF
    </button>
  );
}
