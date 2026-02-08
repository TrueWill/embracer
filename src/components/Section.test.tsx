import React from 'react';
import { render, screen } from '@testing-library/react';
import Section from './Section';

it('should render header', () => {
  render(<Section header="Test Header">content</Section>);

  expect(screen.getByText('Test Header')).toBeInTheDocument();
});

it('should render children', () => {
  render(<Section header="H">child content</Section>);

  expect(screen.getByText('child content')).toBeInTheDocument();
});

it('should render footer when provided', () => {
  render(
    <Section header="H" footer="Footer text">
      content
    </Section>
  );

  expect(screen.getByText('Footer text')).toBeInTheDocument();
});

it('should not render footer when not provided', () => {
  const { container } = render(<Section header="H">content</Section>);

  expect(container.querySelector('.card-footer')).not.toBeInTheDocument();
});
