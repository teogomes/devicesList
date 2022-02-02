import {ADD_DEVICE, DELETE_DEVICE, EDIT_DEVICE} from '../src/Redux/ActionTypes';
import {devicesReducer} from '../src/Redux/Reducers/devicesReducer';

const initialState = {
  devices: [],
};

const devices = [
  {
    id: 'testId',
    owner: 'owner',
    model: 'model',
    os: 'os',
    notes: 'notes',
  },
];

describe('DeviceReducer', () => {
  it('returns the initial state', () => {
    expect(devicesReducer(undefined, {})).toEqual(initialState);
  });

  it('adds new device', () => {
    // Given
    const action = {
      type: ADD_DEVICE,
      payload: devices[0],
    };

    // Then
    expect(devicesReducer(initialState, action)).toEqual({
      ...initialState,
      devices: devices,
    });
  });

  it('edits device', () => {
    // Given
    const state = {
      devices,
    };
    const editDevice = JSON.parse(JSON.stringify(devices[0]));
    editDevice.owner = 'new Owner';
    const action = {
      type: EDIT_DEVICE,
      payload: editDevice,
    };

    // Then
    expect(devicesReducer(state, action)).toEqual({
      ...state,
      devices: [editDevice],
    });
  });

  it('deletes device', () => {
    // Given
    const state = {
      devices,
    };
    const action = {
      type: DELETE_DEVICE,
      payload: devices[0].id,
    };

    // Then
    expect(devicesReducer(state, action)).toEqual({
      ...state,
      devices: [],
    });
  });
});
