import React from 'react';
import PropTypes from 'prop-types';

export default function DeleteButton({ id, onClick }) {
  const handleClick = () => {
    onClick(id);
  };

  return <i className="fa fa-trash pointer" onClick={handleClick} />;
}

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
