import React from 'react';
import DeviceList from '../src/Screens/DeviceList';
import {render, fireEvent} from '../jest/test-utils';

const devices = [
  {
    id: 'testId',
    owner: 'owner',
    model: 'model',
    os: 'os',
    notes: 'notes',
  },
];

describe('DeviceList', () => {
  it('Pressing fab button navigates to DeviceDetail', () => {
    // Given
    const mockNavigation = {
      navigate: jest.fn(),
      setOptions: jest.fn(),
    };
    const {getByTestId} = render(<DeviceList navigation={mockNavigation} />);
    const fabButton = getByTestId('FabButton');

    // When
    fireEvent(fabButton, 'press');

    // Then
    expect(mockNavigation.navigate).toBeCalledWith('DeviceDetail');
  });

  it('Given no devices then NoContent view is shown', () => {
    // Given
    const emptyDevices = [];

    // When
    const {getByTestId} = render(<DeviceList />, {
      emptyDevices,
    });

    // Then
    expect(getByTestId('NoContent')).not.toBe(undefined);
  });

  it('Given devices then NoContent view is hidden', () => {
    // Given
    const {queryByTestId} = render(<DeviceList />, {
      devices,
    });

    // Then
    expect(queryByTestId('NoContent')).toBe(null);
  });
});

describe('Device Item', () => {
  it('Card filled correctly', () => {
    // Given
    const {getByTestId} = render(<DeviceList />, {
      devices,
    });
    const device = devices[0];

    // When
    const model = getByTestId('Model');
    const owner = getByTestId('Owner');
    const os = getByTestId('OS');
    const notes = getByTestId('Notes');

    // Then
    expect(model.children[0]).toBe(device.model);
    expect(owner.children[0]).toBe(device.owner);
    expect(os.children[0]).toBe(device.os);
    expect(notes.children[0]).toBe(device.notes);
  });
  it('on card press navigates to Device Detail with selectedDevice', () => {
    // Given
    const mockNavigation = {
      navigate: jest.fn(),
      setOptions: jest.fn(),
    };

    const {getByTestId} = render(<DeviceList navigation={mockNavigation} />, {
      devices,
    });
    const card = getByTestId('Card');

    // When
    fireEvent(card, 'press');

    // Then
    expect(mockNavigation.navigate).toBeCalledWith('DeviceDetail', {
      device: devices[0],
    });
  });

  it('on qr press modal is shown', () => {
    // Given
    const {getByTestId} = render(<DeviceList />, {
      devices,
    });
    const modal = getByTestId('QRModal');
    const qr = getByTestId('QR');
    expect(modal.props.visible).toBe(false);

    // When
    fireEvent(qr, 'press');

    // Then
    expect(modal.props.visible).toBe(true);
  });

  it('When QR Modal is shown, on outside press closes modal', () => {
    // Given
    const {getByTestId} = render(<DeviceList />, {
      devices,
    });
    const modal = getByTestId('QRModal');
    const modalContainer = getByTestId('ModalContainer');
    const qr = getByTestId('QR');

    // When
    fireEvent(qr, 'press');
    fireEvent(modalContainer, 'press');

    // Then
    expect(modal.props.visible).toBe(false);
  });
});
