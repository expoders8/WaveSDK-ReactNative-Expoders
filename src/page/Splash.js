/* eslint-disable prettier/prettier */
import React,{useEffect} from 'react';
import { StyleSheet, View, Image, ActivityIndicator,Platform } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    if (Platform.OS === 'android') {
     setTimeout(() => {
       navigation.replace('Home');
     }, 3000);
    }
    else {
     navigation.replace('Home');
    }
 });

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/waveid/rfideas_logo.png')}
      />
      <Image
        style={styles.logo2}
        source={require('../assets/waveid/waveid_logo.png')}
      />
      <ActivityIndicator size="large" color="#2295ee" />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 100,
    height: 40,
    marginBottom: 10,
  },
  logo2: {
    width: 200,
    height: 40,
    marginBottom: 20,
  },
});
