import { ReactNode } from 'react';

interface SectionProps {
  header: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

export default function Section({
  header,
  footer,
  children
}: SectionProps): JSX.Element {
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
