import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {WebView} from 'react-native-webview';

const WebViewScreen = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: 'https://htmltest1.s3.ap-northeast-2.amazonaws.com/index.html',
        }}
        style={styles.webview}
      />
      <Image
        source={require('../assets/images/astronant.png')}
        style={[styles.image, styles.astronaut]}
      />
      <Image
        source={require('../assets/images/dart.png')}
        style={[styles.image, styles.dart]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    position: 'absolute',
  },
  astronaut: {
    width: 107,
    height: 170,
    top: '71%', // Adjust as needed
    left: '65%', // Adjust as needed
  },
  dart: {
    width: 60,
    height: 125,
    top: '71.7%', // Adjust as needed
    left: '10.5%', // Adjust as needed
  },
});

export default WebViewScreen;
