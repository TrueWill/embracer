import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeleteButton from './DeleteButton';

it('should call onClick with id when clicked', async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();

  const { container } = render(
    <DeleteButton id="merit-1" onClick={onClick} />
  );

  await user.click(container.querySelector('i')!);

  expect(onClick).toHaveBeenCalledWith('merit-1');
});

it('should render a trash icon', () => {
  const { container } = render(
    <DeleteButton id="test" onClick={vi.fn()} />
  );

  expect(container.querySelector('.fa-trash')).toBeInTheDocument();
});
