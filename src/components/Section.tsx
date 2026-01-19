import React from 'react';

interface SectionProps {
  header: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export default function Section({ header, footer, children }: SectionProps) {
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
