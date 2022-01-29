import React from 'react';
import {
  View,
  Text,
  Share,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {DocumentDirectoryPath, readFile, writeFile} from 'react-native-fs';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addMultipleDevices} from '../Actions/devicesActions';
import useTheme from '../Theme/useTheme';
import useThemedStyles from '../Theme/useThemedStyles';

// Actions

const Settings = ({addMultipleDevices, devices}) => {
  const styles = useThemedStyles(style);
  const theme = useTheme();
  const toggleSwitch = () => {
    theme.toggleAuto(!theme.isAuto);
  };

  const toggleDarkTheme = () => {
    theme.toggleTheme(!theme.isDark);
  };

  const exportFile = () => {
    var path = DocumentDirectoryPath + '/deviceList.json';
    writeFile(path, JSON.stringify({devices}), 'utf8')
      .then(() => {
        Share.share({
          title: 'Devices',
          url: path,
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const importFile = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'pageSheet',
        copyTo: 'cachesDirectory',
      });

      // const customData = require(pickerResult.uri);
      readFile(pickerResult.uri).then(file => {
        try {
          const json = JSON.parse(file);
          addMultipleDevices(json.devices);
        } catch {
          Alert.alert('Could not parse file');
        }
      });
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.optionContainer}>
          <Text style={styles.switchText}>Auto Color</Text>
          <Switch
            trackColor={{
              false: theme.colors.secondary,
              true: theme.colors.primary,
            }}
            thumbColor={
              theme.isAuto ? theme.colors.secondary : theme.colors.primary
            }
            onValueChange={toggleSwitch}
            value={theme.isAuto}
          />
        </View>
        <View style={styles.optionContainer}>
          <Text style={styles.switchText}>Dark Theme</Text>
          <Switch
            disabled={theme.isAuto}
            trackColor={{
              false: theme.colors.secondary,
              true: theme.colors.primary,
            }}
            thumbColor={
              theme.isDark ? theme.colors.secondary : theme.colors.primary
            }
            onValueChange={toggleDarkTheme}
            value={theme.isDark}
          />
        </View>
      </View>
      <View>
        <TouchableOpacity
          testID="ImportButton"
          onPress={importFile}
          style={[
            styles.exportButton,
            {marginBottom: 16, backgroundColor: 'blue'},
          ]}>
          <Text style={styles.exportButtonText}>{'Import Devices'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="ExportButton"
          onPress={exportFile}
          style={styles.exportButton}>
          <Text style={styles.exportButtonText}>{'Export Devices'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      paddingBottom: theme.sizes.xxLargeMargin,
    },
    optionContainer: {
      height: 56,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#D3D3D3',
    },
    switchText: {
      color: theme.colors.secondary,
    },
    exportButton: {
      height: 56,
      marginHorizontal: theme.sizes.margin,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primary,
    },
    exportButtonText: {
      color: theme.colors.secondary,
      fontSize: 18,
      fontWeight: '700',
    },
  });

const mapStateToProps = state => {
  return {
    devices: state.devices,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addMultipleDevices,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
