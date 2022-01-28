import React, {useCallback, useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
  Modal,
} from 'react-native';
import {connect} from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import useThemedStyles from '../Theme/useThemedStyles';
import {settingsIcon} from '../Constants/Images';

const DeviceList = ({navigation, devices}) => {
  const styles = useThemedStyles(style);
  const [selectedQR, setSelectedQR] = useState(null);

  const onSettingsPress = () => {
    navigation.push('Settings');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onSettingsPress}>
          <Image style={styles.settingsIcon} source={settingsIcon} />
        </TouchableOpacity>
      ),
    });
  });

  const onFabPress = useCallback(() => {
    navigation.navigate('DeviceDetail');
  }, []);

  const onModalContainerPress = () => {
    setSelectedQR(null);
  };

  const renderItem = useCallback(
    ({item}) => {
      const onCardPress = () => {
        navigation.navigate('DeviceDetail', {device: item});
      };

      const onQRPress = () => {
        setSelectedQR(item);
      };

      return (
        <TouchableOpacity onPress={onCardPress} style={styles.itemContainer}>
          <View style={styles.itemSubContainer}>
            <View>
              <Text>
                Model: <Text style={styles.value}>{item.model}</Text>
              </Text>
              <Text>
                OS: <Text style={styles.value}>{item.os}</Text>
              </Text>
            </View>
            <Pressable onPress={onQRPress}>
              <QRCode
                size={60}
                value={JSON.stringify(item)}
                logo={{
                  uri: 'https://media-exp1.licdn.com/dms/image/C4E0BAQF-6dnx36w7ng/company-logo_200_200/0/1519874416684?e=2159024400&v=beta&t=lAWw60ccpZRMju0sZ3_FLCq3xCfdltMRD6K9iS_kJXw',
                }}
                logoSize={16}
                logoBackgroundColor="transparent"
              />
            </Pressable>
            <Text>
              {'Owner: '}
              <Text style={styles.value}>{item.owner}</Text>
            </Text>
          </View>
          <View style={styles.line} />
        </TouchableOpacity>
      );
    },
    [styles],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={devices}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyMessage}>No devices</Text>
          </View>
        }
      />
      <Modal
        visible={selectedQR !== null}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setSelectedQR(false);
        }}
        transparent={true}>
        <TouchableOpacity
          onPress={onModalContainerPress}
          style={styles.modalContainer}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <QRCode
                size={200}
                value={JSON.stringify(selectedQR)}
                logo={{
                  uri: 'https://media-exp1.licdn.com/dms/image/C4E0BAQF-6dnx36w7ng/company-logo_200_200/0/1519874416684?e=2159024400&v=beta&t=lAWw60ccpZRMju0sZ3_FLCq3xCfdltMRD6K9iS_kJXw',
                }}
                logoSize={16}
                logoBackgroundColor="transparent"
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <TouchableOpacity onPress={onFabPress} style={styles.fab}>
        <Image
          style={styles.fabIcon}
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPa5ldL9PLxqVqbPzS-ZrOYYdDzMSsRuoMJg&usqp=CAU',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const style = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.primary,
    },
    itemContainer: {
      flex: 1,
      backgroundColor: theme.colors.secondary,
    },
    itemSubContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: theme.sizes.margin,
      alignItems: 'center',
    },
    value: {
      color: theme.colors.primary,
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: 'grey',
      opacity: 0.25,
    },
    fab: {
      height: 70,
      width: 70,
      position: 'absolute',
      bottom: theme.sizes.largeMargin,
      right: theme.sizes.margin,
      borderRadius: 35,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.secondary,
    },
    fabIcon: {
      height: 24,
      width: 24,
    },
    emptyContainer: {
      alignSelf: 'center',
      marginTop: theme.sizes.xxLargeMargin,
    },
    emptyMessage: {
      color: theme.colors.secondary,
      fontSize: 16,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.25)',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    settingsIcon: {
      height: 24,
      width: 24,
      marginRight: theme.sizes.margin,
    },
  });

const mapStateToProps = state => {
  return {
    devices: state.devices,
  };
};

export default connect(mapStateToProps, null)(DeviceList);
