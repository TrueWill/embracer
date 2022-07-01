import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { noop, getOptionValues } from '../utils/testUtils';
import { clans } from '../constants/clanOptions';
import Clan from './Clan';

const getClanSelect = () => screen.getByTestId('clan');
const getBloodlineSelect = () => screen.getByTestId('bloodline');

it('should display clan options', () => {
  render(<Clan clan={{ name: '' }} updateClan={noop} />);

  const clanNames = Array.from(clans.keys());

  expect(getOptionValues(getClanSelect())).toEqual(['', ...clanNames]);
});

it('should select current clan', () => {
  const currentClan = 'Tzimisce';

  render(<Clan clan={{ name: currentClan }} updateClan={noop} />);

  expect(getClanSelect()).toHaveValue(currentClan);
});

it('should not display bloodline options when no clan', () => {
  render(<Clan clan={{ name: '' }} updateClan={noop} />);

  expect(getOptionValues(getBloodlineSelect())).toEqual(['']);
});

it('should display bloodline options when clan', () => {
  render(<Clan clan={{ name: 'Tzimisce' }} updateClan={noop} />);

  expect(getOptionValues(getBloodlineSelect())).toEqual([
    '',
    'Carpathian',
    'Koldun'
  ]);
});

it('should select current bloodline', () => {
  const currentBloodline = 'Koldun';

  render(
    <Clan
      clan={{
        name: 'Tzimisce',
        bloodline: currentBloodline,
        meritPoints: 4
      }}
      updateClan={noop}
    />
  );

  expect(getBloodlineSelect()).toHaveValue(currentBloodline);
});

it('should update clan', async () => {
  const updateClan = jest.fn();

  render(<Clan clan={{ name: '' }} updateClan={updateClan} />);

  const newClan = 'Tzimisce';

  await userEvent.selectOptions(getClanSelect(), newClan);

  expect(updateClan.mock.calls.length).toBe(1);
  expect(updateClan.mock.calls[0]).toEqual([newClan]);
});

it('should update bloodline', async () => {
  const updateClan = jest.fn();
  const currentClan = 'Tzimisce';

  render(<Clan clan={{ name: currentClan }} updateClan={updateClan} />);

  const newBloodline = 'Koldun';
  const newBloodlineMeritPoints = 4;

  await userEvent.selectOptions(getBloodlineSelect(), newBloodline);

  expect(updateClan.mock.calls.length).toBe(1);
  expect(updateClan.mock.calls[0]).toEqual([
    currentClan,
    newBloodline,
    newBloodlineMeritPoints
  ]);
});

it('should clear bloodline when update clan', async () => {
  const updateClan = jest.fn();

  render(
    <Clan
      clan={{
        name: 'Tzimisce',
        bloodline: 'Koldun',
        meritPoints: 4
      }}
      updateClan={updateClan}
    />
  );

  const newClan = 'Nosferatu';

  await userEvent.selectOptions(getClanSelect(), newClan);

  expect(updateClan.mock.calls.length).toBe(1);
  expect(updateClan.mock.calls[0]).toEqual([newClan]);
});
