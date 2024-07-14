import React from 'react';
import {StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';

const WebPage = () => {
  const injectedJavaScript = `
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'viewport');
    meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no');
    document.getElementsByTagName('head')[0].appendChild(meta);
  `;

  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: 'https://htmltest1.s3.ap-northeast-2.amazonaws.com/index.html',
        }}
        style={styles.webview}
        injectedJavaScript={injectedJavaScript}
        scalesPageToFit={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // 배경 색상을 흰색으로 설정
  },
  webview: {
    flex: 1,
  },
});

export default WebPage;
