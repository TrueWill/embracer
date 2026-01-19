import type { RootState, ModeState, SettingState } from '../types';

export const defaultModeState: ModeState = {
  isEraser: false
};

export const defaultSettingState: SettingState = {
  name: 'V20 Dark Ages'
};

export const createMockRootState = (partial: any): RootState => {
  return {
    mode: partial.mode || defaultModeState,
    setting: partial.setting || defaultSettingState,
    ...partial
  } as RootState;
};
