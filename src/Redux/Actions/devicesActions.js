import {
  ADD_DEVICE,
  EDIT_DEVICE,
  DELETE_DEVICE,
  ADD_MULTIPLE_DEVICES,
} from '../ActionTypes';

export const addDevice = device => dispatch => {
  dispatch({
    type: ADD_DEVICE,
    payload: device,
  });
};

export const addMultipleDevices = devices => dispatch => {
  dispatch({
    type: ADD_MULTIPLE_DEVICES,
    payload: devices,
  });
};

export const editDevice = device => dispatch => {
  dispatch({
    type: EDIT_DEVICE,
    payload: device,
  });
};

export const deleteDevice = device => dispatch => {
  dispatch({
    type: DELETE_DEVICE,
    payload: device,
  });
};
