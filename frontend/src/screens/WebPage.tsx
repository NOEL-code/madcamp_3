import React from 'react';
import {StyleSheet, View, Button} from 'react-native';
import WebView from 'react-native-webview';

const WebPage = () => {
  const onMessage = event => {
    if (event.nativeEvent.data === 'fastRotate') {
      this.webview.injectJavaScript('window.fastRotate()');
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={ref => (this.webview = ref)}
        source={{
          uri: 'https://htmltest1.s3.ap-northeast-2.amazonaws.com/index.html',
        }}
        style={styles.webview}
        onMessage={onMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default WebPage;
