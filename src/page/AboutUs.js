/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  Linking,
} from 'react-native';

const AboutUs = (navigation) => {
  const url = 'http://tnetic.com';
  return (
    <>
      <SafeAreaView style={styles.body}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={{ padding: 10 }}>
            <Text style={styles.text}>
              rf IDEAS is your go-to authority for access control, partnering
              with leading technology companies to provide authentication,
              identification and logical access control solutions for single
              sign-on, multifunction printing, manufacturing processes,
              dispensing, computer and network access, attendance tracking,
              interactive kiosks and other secure identity applications,
              Together with our partners, we support a broad range of
              enterprises, including healthcare, manufacturing, government,
              eduction and more.
            </Text>
            <Text style={styles.text}>
              This app is created and designed by our partner, TNETIC. Visit{' '}
              <Text
                style={{ color: '#0077cc' }}
                onPress={() => Linking.openURL(url)}>
                {url}
              </Text>{' '}
              for more information about their services and contact details{' '}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Image source={require('../assets/waveid/tnetic_logo.jpg')} />
            <Image
              style={styles.icon2}
              source={require('../assets/waveid/rfideas_logos.jpg')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  engine: { position: 'absolute', right: 0 },
  text: {
    fontSize: 17,
    color: '#000',
    paddingTop: 15,
    textAlign: 'justify',
    paddingBottom: 0,
  },
  body: { flex: 1, backgroundColor: '#cccccc', padding: 10 },
  icon2: { marginTop: 10 },
});

export default AboutUs;
