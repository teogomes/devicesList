import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DeviceList from '../Screens/DeviceList';
import DeviceDetail from '../Screens/DeviceDetail';
import QRScanner from '../Screens/QRScanner';
import Settings from '../Screens/Settings';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: 'modal',
      }}>
      <Stack.Screen name="DeviceList" component={DeviceList} />
      <Stack.Screen name="DeviceDetail" component={DeviceDetail} />
      <Stack.Screen name="QRScanner" component={QRScanner} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
