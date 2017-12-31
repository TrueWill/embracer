import React from 'react';
import PropTypes from 'prop-types';

const unfilledClass = 'fa fa-circle-thin';
const filledClass = 'fa fa-circle';

const Dots = ({ level = 0, max = 5 }) => {
  const items = Array(max);

  for (let i = 0; i < max; i++) {
    items[i] = i < level ? filledClass : unfilledClass;
  }

  return (
    <div>
      {items.map((value, index) => (
        <i key={index} className={value} aria-hidden="true" />
      ))}
    </div>
  );
};

Dots.propTypes = {
  level: PropTypes.number,
  max: PropTypes.number
};

export default Dots;
