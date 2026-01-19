import React from 'react';

const pencilClass = 'fa fa-pencil';
const eraserClass = 'fa fa-eraser';

const pencilTooltipPrefix = 'Pencil mode (add dots)';
const eraserTooltipPrefix = 'Eraser mode (remove dots)';
const tooltipSuffix = ' (click to toggle)';

interface PencilEraserProps {
  isEraser: boolean;
  togglePencilEraserMode: () => void;
}

export default function PencilEraser({ isEraser, togglePencilEraserMode }: PencilEraserProps) {
  const className = isEraser ? eraserClass : pencilClass;
  const tooltip =
    (isEraser ? eraserTooltipPrefix : pencilTooltipPrefix) + tooltipSuffix;

  return (
    <button
      type="button"
      className="btn btn-outline-primary"
      title={tooltip}
      onClick={togglePencilEraserMode}
    >
      <i className={className} aria-hidden="true" />
    </button>
  );
}
