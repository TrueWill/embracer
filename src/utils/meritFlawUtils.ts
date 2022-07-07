import { StandardMeritFlaw } from '../types';

const defaultPointText = ' point';

export function getSelectedMeritDescription(
  merit: StandardMeritFlaw,
  pointText = defaultPointText
): string {
  const timesPurchased = merit.timesPurchased || 1;
  const timesText = timesPurchased === 1 ? '' : ` X ${timesPurchased}`;
  const plural = pointText === defaultPointText && merit.points > 1 ? 's' : '';

  return `${merit.name} (${merit.points}${pointText}${plural}${timesText})`;
}

export function getFlawDescription(
  flaw: StandardMeritFlaw,
  pointText = defaultPointText
): string {
  const plural = pointText === defaultPointText && flaw.points > 1 ? 's' : '';

  return `${flaw.name} (${flaw.points}${pointText}${plural})`;
}
