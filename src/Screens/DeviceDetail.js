import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
} from 'react-native';
import useThemedStyles from '../Theme/useThemedStyles';

// Actions
import {addDevice, deleteDevice, editDevice} from '../Actions/devicesActions';

// Services
import {getQuoteOfTheDay} from '../Services/quoteCalls';
import {ScrollView} from 'react-native';

const DeviceDetail = ({
  navigation,
  route,
  addDevice,
  editDevice,
  deleteDevice,
}) => {
  const selectedDevice = route?.params?.device;
  const scannedDevice = route?.params?.scannedDevice;
  const styles = useThemedStyles(style);
  const [validDevice, setValidDevice] = useState(false);
  const [device, setDevice] = useState({
    id: Math.random(),
    owner: '',
    model: '',
    os: '',
  });

  useEffect(() => {
    if (selectedDevice) {
      setDevice(selectedDevice);
    } else if (scannedDevice) {
      setDevice(scannedDevice);
    }
  }, [route?.params]);

  const checkValidDevice = () =>
    device.owner !== '' && device.model !== '' && device.os !== '';

  useEffect(() => {
    setValidDevice(checkValidDevice());
  }, [device]);

  const onActionButtonPress = () => {
    selectedDevice ? editDevice(device) : addDevice(device);
    navigation?.goBack();
  };

  const onQRScanPress = () => {
    navigation.navigate('QRScanner');
  };

  const onDeletePress = () => {
    deleteDevice(device.id);
    getQuoteOfTheDay().then(res => {
      if (res.data.length > 0) {
        Alert.alert('Quote of the day', res.data[0].q, [
          {text: 'OK', onPress: () => navigation.goBack()},
        ]);
      }
    });
  };

  const handleChange = (name, value) => {
    setDevice(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}>
      <View>
        <View>
          <Text style={styles.textInputTitle}>Owner</Text>
          <TextInput
            testID="OwnerInput"
            value={device.owner}
            onChangeText={text => handleChange('owner', text)}
            style={styles.textInput}
          />
        </View>
        <View>
          <Text style={styles.textInputTitle}>Model</Text>
          <TextInput
            testID="ModelInput"
            value={device.model}
            onChangeText={text => handleChange('model', text)}
            style={styles.textInput}
          />
        </View>
        <View>
          <Text style={styles.textInputTitle}>OS</Text>
          <TextInput
            testID="OSInput"
            value={device.os}
            onChangeText={text => handleChange('os', text)}
            style={styles.textInput}
          />
        </View>
        <View>
          <Text style={styles.textInputTitle}>Notes</Text>
          <TextInput
            testID="NotesInput"
            value={device.notes}
            onChangeText={text => handleChange('notes', text)}
            style={styles.textInput}
          />
        </View>
      </View>
      <View>
        {selectedDevice && (
          <TouchableOpacity
            testID="DeleteButton"
            onPress={onDeletePress}
            style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>{'Delete'}</Text>
          </TouchableOpacity>
        )}
        <Pressable
          testID="ActionButton"
          disabled={!validDevice}
          onPress={onActionButtonPress}
          style={[styles.actionButton, {opacity: validDevice ? 1 : 0.5}]}>
          <Text style={styles.actionButtonText}>
            {selectedDevice ? 'Edit' : 'Add'}
          </Text>
        </Pressable>
        {!selectedDevice && (
          <Pressable
            onPress={onQRScanPress}
            style={[styles.actionButton, {marginTop: 16}]}>
            <Text style={styles.actionButtonText}>{'Scan QR'}</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
};

const style = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary,
      padding: theme.sizes.largeMargin,
      paddingBottom: theme.sizes.xxLargeMargin,
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'space-between',
    },
    textInputTitle: {
      color: theme.colors.secondary,
      marginBottom: 8,
      fontSize: 16,
    },
    textInput: {
      height: 56,
      padding: theme.sizes.margin,
      borderRadius: 8,
      backgroundColor: theme.colors.secondary,
      marginBottom: theme.sizes.largeMargin,
    },
    actionButton: {
      height: 56,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.secondary,
    },
    deleteButton: {
      height: 56,
      marginBottom: theme.sizes.margin,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'red',
    },
    actionButtonText: {
      color: theme.colors.primary,
      fontSize: 18,
      fontWeight: '700',
    },
    deleteButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: '700',
    },
    qrWrapper: {
      alignSelf: 'center',
    },
  });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addDevice,
      editDevice,
      deleteDevice,
    },
    dispatch,
  );
export default connect(null, mapDispatchToProps)(DeviceDetail);
