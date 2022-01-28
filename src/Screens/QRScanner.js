import React from 'react';
import {Text, StyleSheet, Alert} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const QRScanner = ({navigation}) => {
  const onSuccess = e => {
    navigation.navigate('DeviceDetail');
    try {
      const scannedDevice = JSON.parse(e.data);
      if (scannedDevice.owner && scannedDevice.model && scannedDevice.os) {
        navigation.navigate('DeviceDetail', {scannedDevice: scannedDevice});
        return;
      }
      throw error;
    } catch {
      Alert.alert('No valid QR');
    }
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      flashMode={RNCamera.Constants.FlashMode.torch}
      topContent={
        <Text style={styles.centerText}>
          Scan the <Text style={styles.textBold}>QR Code </Text>
          of your device
        </Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

export default QRScanner;
