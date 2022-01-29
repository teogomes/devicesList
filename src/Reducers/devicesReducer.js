import {
  ADD_DEVICE,
  ADD_MULTIPLE_DEVICES,
  DELETE_DEVICE,
  EDIT_DEVICE,
} from '../Constants/ActionTypes';

const initialState = {
  devices: [],
};

export const devicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DEVICE:
      return {
        ...state,
        devices: [...state.devices, action.payload],
      };
    case ADD_MULTIPLE_DEVICES:
      return {
        ...state,
        devices: [...state.devices, ...action.payload],
      };
    case EDIT_DEVICE:
      return {
        ...state,
        devices: state.devices.map(device =>
          device.id === action.payload.id ? action.payload : device,
        ),
      };
    case DELETE_DEVICE:
      return {
        ...state,
        devices: state.devices.filter(device => device.id !== action.payload),
      };
    default:
      return state;
  }
};
