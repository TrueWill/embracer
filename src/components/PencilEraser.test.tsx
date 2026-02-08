import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PencilEraser from './PencilEraser';

it('should show pencil icon when not eraser mode', () => {
  const { container } = render(
    <PencilEraser isEraser={false} togglePencilEraserMode={vi.fn()} />
  );

  expect(container.querySelector('.fa-pencil')).toBeInTheDocument();
  expect(container.querySelector('.fa-eraser')).not.toBeInTheDocument();
});

it('should show eraser icon when eraser mode', () => {
  const { container } = render(
    <PencilEraser isEraser={true} togglePencilEraserMode={vi.fn()} />
  );

  expect(container.querySelector('.fa-eraser')).toBeInTheDocument();
  expect(container.querySelector('.fa-pencil')).not.toBeInTheDocument();
});

it('should show pencil tooltip when not eraser mode', () => {
  render(
    <PencilEraser isEraser={false} togglePencilEraserMode={vi.fn()} />
  );

  expect(screen.getByTitle('Pencil mode (add dots) (click to toggle)')).toBeInTheDocument();
});

it('should show eraser tooltip when eraser mode', () => {
  render(
    <PencilEraser isEraser={true} togglePencilEraserMode={vi.fn()} />
  );

  expect(screen.getByTitle('Eraser mode (remove dots) (click to toggle)')).toBeInTheDocument();
});

it('should call togglePencilEraserMode when clicked', async () => {
  const user = userEvent.setup();
  const toggle = vi.fn();

  render(<PencilEraser isEraser={false} togglePencilEraserMode={toggle} />);

  await user.click(screen.getByRole('button'));

  expect(toggle).toHaveBeenCalledTimes(1);
});
