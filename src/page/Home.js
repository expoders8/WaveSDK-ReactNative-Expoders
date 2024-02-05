import React, { useState, useEffect, createRef } from 'react';
import {
  SafeAreaView,
  View,
  Modal,
  Text,
  ToastAndroid,
  StatusBar,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  TextInput,
  Image,
  Alert,
  Platform,
} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SnackBar from 'react-native-snackbar-component';
import { ConstantVal } from '../utils/constant';
import styles from '../utils/style';
import { WaveIdManager } from 'react-native-wavesdk';

const actionSheetRef = createRef();

/**
 * constant value is passed to `WaveIdManager` sdk
 */
var ble = new WaveIdManager(
  ConstantVal.DEVICE_NAME,
  ConstantVal.UUID_RF_IDEAS_SERVICE_ID,
  ConstantVal.WRITE_CHARACTERISTIC_UUID,
  ConstantVal.MANUFACTURER_DATA,
  ConstantVal.READ_CHARACTERISTIC_UUID
);

const HomeScreen = ({ navigation }) => {
  var [isScan, setIsScan] = useState('');
  var peripherals = new Map();
  var [listData, setListData] = useState([]);
  var [cardId, setCardId] = useState(ConstantVal.DEFAULT_CARD_ID);
  const [modalRssi, setModalRssi] = useState(false);
  var [rssi, setRssi] = useState(ConstantVal.DEFAULT_RSSI_LEVEL);
  var [authData, setAuthData] = useState({});
  var [snackBarV, setSnackBarV] = useState(false);

  /**
   *use for `bluetooth` component initialization
   */
  useEffect(() => {
    init();
    return () => {
      ble.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   *use for `bluetooth` component initialization
   */
  const init = async () => {
    try {
      await getRssiData();
      // await ble.checkPermission();
      await ble.init();
    } catch (e) {
      Alert.alert(e);
    }
  };

  /**
   * change cardId value and save in the `cardId` state
   * @param {*} e
   */
  const cardIdChange = (e) => {
    let temp = e.replace(/[^0-9a-zA-Z]/g, '');
    setCardId(temp);
  };

  /**
   *change the rssi value and save in the `rssi` state , rssi value only accept numaric value.
   * @param {*} v
   */
  const rssiChange = (v) => {
    v = v.replace(/,/g, '');
    v = v.replace(/ /g, '');
    v = v.replace(/\./g, '');
    setRssi(v);
  };

  /**
   * check local store rssi value if local store value is null then set constant rssi value other wise local store value.
   */
  const getRssiData = async () => {
    try {
      const value = await AsyncStorage.getItem('RSSI_VALUE');
      if (value !== null) {
        setRssi(value);
      } else {
        saveRssi(ConstantVal.DEFAULT_RSSI_LEVEL);
      }
    } catch (e) {
      // error reading value
    }
  };

  /**
   * save the `rssi` value
   * @param {*} rssi
   */
  const saveRssi = async (rssi) => {
    try {
      if (rssi === '') {
        rssi = await AsyncStorage.getItem('RSSI_VALUE');
      }
      await AsyncStorage.setItem('RSSI_VALUE', rssi);
      setRssi(rssi);
    } catch (e) {
      // saving error
    }
  };

  /**
   * calling `saveRssi` and save the rssi value
   */
  const onSaveRssiHandler = () => {
    setModalRssi(!modalRssi);
    saveRssi(rssi);
  };

  /**
   * popup cancle for rssi handle
   */
  const onCancelRssiHandler = () => {
    setModalRssi(!modalRssi);
    getRssiData();
  };

  /**
   * navigate about us page
   */
  const onAboutPress = () => {
    actionSheetRef.current?.setModalVisible(false);
    navigation.navigate('AboutUs');
  };
  /**
   * open rssi model
   */
  const onRssiClick = () => {
    actionSheetRef.current?.setModalVisible(false);
    setTimeout(() => setModalRssi(true), Platform.OS === 'ios' ? 200 : 0);
  };

  /**
   *initiate the bluetooth periperal scan device and connection is made to the match device
   * @param {*} rssi pass rssi value
   */
  const startScanNew = async (rssi) => {
    try {
      await ble.checkPermission();
      await ble.enableBluetooth();
      await ble.enableLocation();
      if (cardId !== '') {
        setIsScan('Scanning');
        setSnackBarV(true);
        var data = await ble.startScan(10, rssi);
        if (data?.flag) {
          await authDevice(data.peripheral);
        } else {
          setIsScan('Device not found.');
          await new Promise((resolve1) => setTimeout(resolve1, 1000));
          setSnackBarV(false);
        }
      } else {
        ToastAndroid.show(
          'Please enter a Card ID to proceed.',
          ToastAndroid.LONG
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  /**
   *its authenticates the device
   * @param {*} peripheral
   */
  const authDevice = async (peripheral) => {
    try {
      setIsScan('Device found');
      setSnackBarV(true);

      var auth = await ble.authPeripheral(peripheral, cardId);

      peripherals.clear();
      peripherals.set(peripheral.id, peripheral);
      setListData(Array.from(peripherals.values()));

      setAuthData(auth || {});

      setIsScan(auth?.success ? 'Authenticated.' : 'Authentication Failed.');
      await new Promise((resolve1) => setTimeout(resolve1, 1000));
    } catch (e) {
      setIsScan(e || 'Something went wrong. Please try again.');
      await new Promise((resolve1) => setTimeout(resolve1, 1000));
    } finally {
      setSnackBarV(false);
    }
  };

  const renderItem = (item) => {
    return (
      <TouchableHighlight>
        <View style={styles.debugBg}>
          <Text style={styles.itemName}>Device Connected</Text>
          <Text style={styles.itemName}>Device Name: {item.name}</Text>
          <Text style={styles.itemRssi}>RSSI: {item.rssi}</Text>
          <Text style={styles.itemRssi}>Id: {item.id}</Text>
          <Text style={styles.itemRssi}>
            EncodeByte: {authData.encodedData}
          </Text>
          <Text style={styles.itemRssi}>Read: {authData.readValue}</Text>
          <Text style={styles.itemRssi}>Validcodes: {authData.validcodes}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.body}>
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <Image
              style={styles.headerLeft}
              source={require('../assets/waveid/rfideas_logo.png')}
            />
            <TouchableOpacity
              onPress={() => {
                actionSheetRef.current?.setModalVisible();
              }}>
              <Image
                style={styles.headerRight}
                source={require('../assets/setting.jpg')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.contentarea}>
            <Image
              style={styles.icon}
              source={require('../assets/waveid/waveid_logo.png')}
            />
            <Text style={styles.text}>
              Enter a Card ID on the textbox (or accept the default), and tap
              the Scan and Connect button below.
            </Text>
            <TouchableOpacity style={styles.BLEButton}>
              <TextInput
                style={styles.input}
                placeholder="Enter Card ID"
                value={cardId}
                onChangeText={cardIdChange}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <FlatList
            data={listData}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={{ justifyContent: 'flex-end' }}>
          <SnackBar visible={snackBarV} textMessage={isScan} actionText="" />
          <ActionSheet ref={actionSheetRef}>
            <View style={styles.settingbody}>
              <Text style={styles.settinghead}>Settings</Text>
              <TouchableOpacity
                style={styles.SettingRSSI}
                onPress={() => onRssiClick()}>
                <Text>RSSI Threshold</Text>
                <Text>{rssi} dbi</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.settingAbout}
                onPress={() => onAboutPress()}>
                <Text>About Us </Text>
                <Image
                  style={styles.settingAboutIcon}
                  source={require('../assets/angle-right.png')}
                />
              </TouchableOpacity>
            </View>
          </ActionSheet>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalRssi}
            onRequestClose={() => {
              setModalRssi(!modalRssi);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalhead}>RSSI Threshhold</Text>
                <TouchableOpacity style={styles.RssiInputBtn}>
                  <TextInput
                    style={styles.Rssiinput}
                    placeholder="Enter RSSI Threshhold"
                    keyboardType="numeric"
                    onChangeText={rssiChange}
                    defaultValue={rssi}
                  />
                </TouchableOpacity>
                <View style={styles.RSSIBtn}>
                  <TouchableOpacity
                    style={styles.RSSIBtnBg}
                    onPress={() => onSaveRssiHandler()}>
                    <Text style={styles.textStyle1}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.RSSIBtnBg}
                    onPress={() => onCancelRssiHandler()}>
                    <Text style={styles.textStyle2}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <TouchableOpacity
            style={styles.BLEButtonSend}
            onPress={() => startScanNew(rssi)}>
            <Text style={styles.blebtnText}> SCAN &amp; CONNECT </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
