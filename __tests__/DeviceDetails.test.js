import React from 'react';
import {render} from '../jest/test-utils';
import DeviceDetail from '../src/Screens/DeviceDetail';

const devices = [
  {
    id: 'testId',
    owner: 'owner',
    model: 'model',
    os: 'os',
    notes: 'notes',
  },
];

describe('Edit DeviceDetails', () => {
  it('Given Device, fields are filled correcty', () => {
    // Given
    const device = devices[0];
    const params = {device};

    // When
    const {getByTestId} = render(<DeviceDetail route={{params}} />);
    const ownerInput = getByTestId('OwnerInput');
    const modelInput = getByTestId('ModelInput');
    const osInput = getByTestId('OSInput');
    const notesInput = getByTestId('NotesInput');

    // Then
    expect(modelInput.props.value).toBe(device.model);
    expect(ownerInput.props.value).toBe(device.owner);
    expect(osInput.props.value).toBe(device.os);
    expect(notesInput.props.value).toBe(device.notes);
  });

  it('Given Device, delete button is shown', () => {
    // Given
    const device = devices[0];
    const params = {device};

    // When
    const {getByTestId} = render(<DeviceDetail route={{params}} />);

    // Then
    expect(getByTestId('DeleteButton')).not.toBe(undefined);
  });

  it('Given Device, action button has edit as title', () => {
    // Given
    const device = devices[0];
    const params = {device};
    const {getByTestId} = render(<DeviceDetail route={{params}} />);

    // When
    const actionButton = getByTestId('ActionButton');

    // Then
    expect(actionButton.children[0].props.children).toBe('Edit');
  });
});

describe('Add DeviceDetails', () => {
  it('Given No Device, delete button is hideen', () => {
    // Given
    const {queryByTestId} = render(<DeviceDetail />);

    // Then
    expect(queryByTestId('DeleteButton')).toBe(null);
  });
  it('No Device, action button has edit as title', () => {
    // Given
    const {getByTestId} = render(<DeviceDetail />);

    // When
    const actionButton = getByTestId('ActionButton');

    // Then
    expect(actionButton.children[0].props.children).toBe('Add');
  });
});
