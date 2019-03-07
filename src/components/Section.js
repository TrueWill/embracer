import React from 'react';
import PropTypes from 'prop-types';

export default function Section({ header, footer, children }) {
  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="card">
          <div className="card-header">{header}</div>
          <div className="card-body">
            <div className="container-fluid">{children}</div>
          </div>
          {footer && <div className="card-footer">{footer}</div>}
        </div>
      </div>
    </div>
  );
}

Section.propTypes = {
  header: PropTypes.node.isRequired,
  footer: PropTypes.node,
  children: PropTypes.node.isRequired
};
