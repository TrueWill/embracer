import React from 'react';
import PropTypes from 'prop-types';

const pencilClass = 'fa fa-pencil';
const eraserClass = 'fa fa-eraser';

const pencilTooltipPrefix = 'Pencil mode (add dots)';
const eraserTooltipPrefix = 'Eraser mode (remove dots)';
const tooltipSuffix = ' (click to toggle)';

const PencilEraser = ({ isEraser }) => {
  const className = isEraser ? eraserClass : pencilClass;
  const tooltip =
    (isEraser ? eraserTooltipPrefix : pencilTooltipPrefix) + tooltipSuffix;

  return (
    <button type="button" className="btn btn-default" title={tooltip}>
      <i className={className} aria-hidden="true" />
    </button>
  );
};

PencilEraser.propTypes = {
  isEraser: PropTypes.bool.isRequired
};

export default PencilEraser;
