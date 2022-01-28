import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import useTheme from '../Theme/useTheme';
import useThemedStyles from '../Theme/useThemedStyles';
// import {ExportJsonCsv} from 'react-export-json-csv';

const Settings = () => {
  const styles = useThemedStyles(style);
  const theme = useTheme();
  const headers = [
    {
      key: 'id',
      name: 'ID',
    },
    {
      key: 'fname',
      name: 'First Name',
    },
  ];

  const data = [
    {
      id: '1',
      fname: 'John',
    },
    {
      id: '2',
      fname: 'Doe',
    },
  ];
  const toggleSwitch = () => {
    theme.toggleAuto(!theme.isAuto);
  };

  const toggleDarkTheme = () => {
    theme.toggleTheme(!theme.isDark);
  };

  return (
    <View style={styles.container}>
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
        {/* <ExportJsonCsv style={{color: 'red'}} headers={headers} items={data}>
          Exportdsfsdf
        </ExportJsonCsv> */}
      </View>
    </View>
  );
};

const style = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
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
  });
export default Settings;
