import {ADD_DEVICE, DELETE_DEVICE, EDIT_DEVICE} from '../Constants/ActionTypes';

export const devicesReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_DEVICE:
      return {
        ...state,
        devices: [...state.devices, action.payload],
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
        devices: state.devices.filter(
          device => device.id !== action.payload.id,
        ),
      };
    default:
      return state;
  }
};
