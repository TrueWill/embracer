import * as actions from './characterCreationActions';
import * as types from '../constants/actionTypes';

describe('purchase or unpurchase dot', () => {
  it('should dispatch purchase dot if not in eraser mode', () => {
    const f = actions.purchaseOrUnpurchaseDot('attributes', 'mental');

    const getState = () => ({
      mode: {
        isEraser: false
      }
    });

    const dispatch = jest.fn();

    f(dispatch, getState);

    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: types.PURCHASE_DOT,
      payload: {
        category: 'attributes',
        trait: 'mental'
      }
    });
  });

  it('should dispatch unpurchase dot if in eraser mode', () => {
    const f = actions.purchaseOrUnpurchaseDot('attributes', 'mental');

    const getState = () => ({
      mode: {
        isEraser: true
      }
    });

    const dispatch = jest.fn();

    f(dispatch, getState);

    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: types.UNPURCHASE_DOT,
      payload: {
        category: 'attributes',
        trait: 'mental'
      }
    });
  });
});

describe('purchase or unpurchase morality dot', () => {
  it('should dispatch purchase morality dot if not in eraser mode', () => {
    const f = actions.purchaseOrUnpurchaseMoralityDot();

    const getState = () => ({
      mode: {
        isEraser: false
      }
    });

    const dispatch = jest.fn();

    f(dispatch, getState);

    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: types.PURCHASE_MORALITY_DOT
    });
  });

  it('should dispatch unpurchase morality dot if in eraser mode', () => {
    const f = actions.purchaseOrUnpurchaseMoralityDot();

    const getState = () => ({
      mode: {
        isEraser: true
      }
    });

    const dispatch = jest.fn();

    f(dispatch, getState);

    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: types.UNPURCHASE_MORALITY_DOT
    });
  });
});

describe('update morality', () => {
  it('should calculate merit points when path and clan affinity', () => {
    const f = actions.updateMoralityIfPointsAvailable('Path of Metamorphosis');

    const getState = () => ({
      character: {
        basicInfo: {
          clan: 'Tzimisce'
        },
        merits: [],
        morality: {
          path: 'Humanity',
          startingDots: 5
        }
      }
    });

    const dispatch = jest.fn();

    f(dispatch, getState);

    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: types.UPDATE_MORALITY,
      payload: {
        path: 'Path of Metamorphosis',
        meritPoints: 2
      }
    });
  });

  it('should calculate merit points when humanity', () => {
    const f = actions.updateMoralityIfPointsAvailable('Humanity');

    const getState = () => ({
      character: {
        basicInfo: {
          clan: 'Tzimisce'
        },
        merits: [],
        morality: {
          path: 'Path of Metamorphosis',
          meritPoints: 2,
          startingDots: 4
        }
      }
    });

    const dispatch = jest.fn();

    f(dispatch, getState);

    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: types.UPDATE_MORALITY,
      payload: {
        path: 'Humanity',
        meritPoints: 0
      }
    });
  });

  it('should dispatch when available points equal to merit points', () => {
    const f = actions.updateMoralityIfPointsAvailable(
      'Path of Honorable Accord'
    );

    const getState = () => ({
      character: {
        basicInfo: {
          clan: ''
        },
        merits: [
          {
            name: 'Additional Common Discipline',
            points: 4
          }
        ],
        morality: {
          path: 'Path of Evil Revelations',
          meritPoints: 3,
          startingDots: 4
        }
      }
    });

    const dispatch = jest.fn();

    f(dispatch, getState);

    expect(dispatch.mock.calls.length).toBe(1);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: types.UPDATE_MORALITY,
      payload: {
        path: 'Path of Honorable Accord',
        meritPoints: 3
      }
    });
  });

  it('should not dispatch when available points less than merit points', () => {
    const f = actions.updateMoralityIfPointsAvailable(
      'Path of Honorable Accord'
    );

    const getState = () => ({
      character: {
        basicInfo: {
          clan: ''
        },
        merits: [
          {
            name: 'Additional Uncommon Discipline',
            points: 5
          }
        ],
        morality: {
          path: 'Humanity',
          startingDots: 5
        }
      }
    });

    const dispatch = jest.fn();

    f(dispatch, getState);

    expect(dispatch.mock.calls.length).toBe(0);
  });
});
