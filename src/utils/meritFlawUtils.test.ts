import deepFreeze from 'deep-freeze';
import {
  getSelectedMeritDescription,
  getFlawDescription
} from './meritFlawUtils';

describe('getSelectedMeritDescription', () => {
  const onePointMerit = {
    name: 'Calm Heart',
    points: 1
  };

  const twoPointMerit = {
    name: 'Master of Puppets',
    points: 2
  };

  const multipleTimesMerit = {
    name: 'Skill Aptitude',
    points: 2,
    timesPurchased: 2
  };

  deepFreeze(onePointMerit);
  deepFreeze(twoPointMerit);
  deepFreeze(multipleTimesMerit);

  it('should return expected when one point', () => {
    const result = getSelectedMeritDescription(onePointMerit);

    expect(result).toBe('Calm Heart (1 point)');
  });

  it('should return expected when two points', () => {
    const result = getSelectedMeritDescription(twoPointMerit);

    expect(result).toBe('Master of Puppets (2 points)');
  });

  it('should return expected when purchased multiple times', () => {
    const result = getSelectedMeritDescription(multipleTimesMerit);

    expect(result).toBe('Skill Aptitude (2 points X 2)');
  });

  it('should return expected when one point and specify point text', () => {
    const result = getSelectedMeritDescription(onePointMerit, 'pt M');

    expect(result).toBe('Calm Heart (1pt M)');
  });

  it('should return expected when two points and specify point text', () => {
    const result = getSelectedMeritDescription(twoPointMerit, 'pt M');

    expect(result).toBe('Master of Puppets (2pt M)');
  });

  it('should return expected when purchased multiple times and specify point text', () => {
    const result = getSelectedMeritDescription(multipleTimesMerit, 'pt M');

    expect(result).toBe('Skill Aptitude (2pt M X 2)');
  });
});

describe('getFlawDescription', () => {
  const onePointFlaw = {
    name: 'Amnesia',
    points: 1
  };

  const twoPointFlaw = {
    name: 'Notoriety',
    points: 2
  };

  deepFreeze(onePointFlaw);
  deepFreeze(twoPointFlaw);

  it('should return expected when one point', () => {
    const result = getFlawDescription(onePointFlaw);

    expect(result).toBe('Amnesia (1 point)');
  });

  it('should return expected when two points', () => {
    const result = getFlawDescription(twoPointFlaw);

    expect(result).toBe('Notoriety (2 points)');
  });

  it('should return expected when one point and specify point text', () => {
    const result = getFlawDescription(onePointFlaw, 'pt F');

    expect(result).toBe('Amnesia (1pt F)');
  });

  it('should return expected when two points and specify point text', () => {
    const result = getFlawDescription(twoPointFlaw, 'pt F');

    expect(result).toBe('Notoriety (2pt F)');
  });
});
