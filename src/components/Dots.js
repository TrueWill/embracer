import React from 'react';
import PropTypes from 'prop-types';

const unfilledClass = 'far fa-circle';
const filledClass = 'fas fa-circle';

// TODO: Add tests

const Dots = ({ level = 0, max = 5 }) => {
  const items = Array(max);

  for (let i = 0; i < max; i++) {
    if (i < level) {
      items[i] = filledClass;
    } else {
      items[i] = unfilledClass;
    }
  }

  return (
    <div>
      {items.map((value, index) => <i key={index} className={value} />)}
    </div>
  );
};

Dots.propTypes = {
  level: PropTypes.number,
  max: PropTypes.number
};

export default Dots;
