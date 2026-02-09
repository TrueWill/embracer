import React from 'react';
import { render, screen } from '@testing-library/react';
import Rituals from './Rituals';

it('should render nothing when no rituals', () => {
  const { container } = render(
    <Rituals rituals={[]} updateRituals={vi.fn()} />
  );

  expect(container.firstChild).toBeNull();
});

it('should render Rituals section when rituals exist', () => {
  const rituals = [
    {
      ritualType: 'necromantic',
      displayName: 'Necromantic Rituals',
      permutations: [
        { description: 'None', value: [] },
        { description: '1 Basic', value: [1] }
      ],
      selected: []
    }
  ];

  render(<Rituals rituals={rituals} updateRituals={vi.fn()} />);

  expect(screen.getByText('Rituals')).toBeInTheDocument();
  expect(screen.getByText('Necromantic Rituals')).toBeInTheDocument();
});

it('should render multiple ritual types', () => {
  const rituals = [
    {
      ritualType: 'necromantic',
      displayName: 'Necromantic Rituals',
      permutations: [{ description: 'None', value: [] }],
      selected: []
    },
    {
      ritualType: 'thaumaturgic',
      displayName: 'Thaumaturgic Rituals',
      permutations: [{ description: 'None', value: [] }],
      selected: []
    }
  ];

  render(<Rituals rituals={rituals} updateRituals={vi.fn()} />);

  expect(screen.getByText('Necromantic Rituals')).toBeInTheDocument();
  expect(screen.getByText('Thaumaturgic Rituals')).toBeInTheDocument();
});
