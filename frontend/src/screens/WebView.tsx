import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {WebView} from 'react-native-webview';

const {width, height} = Dimensions.get('window');

const WebViewScreen = () => {
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const dartX = useRef(new Animated.Value(0)).current;
  const dartY = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(dartX, {
          toValue: 130, // Center of the screen horizontally
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(dartY, {
          toValue: -200, // Center of the screen vertically
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

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
      <TouchableWithoutFeedback onPress={startAnimation}>
        <Animated.View
          style={[
            styles.image,
            styles.dart,
            {
              transform: [
                {translateX: shakeAnim},
                {translateX: dartX},
                {translateY: dartY},
              ],
            },
          ]}>
          <Image
            source={require('../assets/images/dart.png')}
            style={styles.dart}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
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
    top: '71%',
    left: '65%',
  },
  dart: {
    width: 60,
    height: 125,
    top: '61%',
    left: '9.7%',
  },
});

export default WebViewScreen;
