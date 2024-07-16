import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigationTypes';
import brazil from '../assets/images/brazil-flag.png';

const {width, height} = Dimensions.get('window');

type WebViewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'WebView'
>;

const WebViewScreen = () => {
  const navigation = useNavigation<WebViewScreenNavigationProp>();
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const dartX = useRef(new Animated.Value(0)).current;
  const dartY = useRef(new Animated.Value(0)).current;
  const flagScale = useRef(new Animated.Value(0)).current;
  const flagOpacity = useRef(new Animated.Value(0)).current;

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
          toValue: 130,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(dartY, {
          toValue: -200,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(flagScale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(flagOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setTimeout(() => {
        navigation.navigate('Survey', {
          country: 'Brazil',
          location: {
            label: 'R',
            name: 'Rio de Janeiro',
            lat: -22.9068,
            lng: -43.1729,
          },
        });
      }, 1000);
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      // Reset animation states when the screen gains focus
      shakeAnim.setValue(0);
      dartX.setValue(0);
      dartY.setValue(0);
      flagScale.setValue(0);
      flagOpacity.setValue(0);
    }, [shakeAnim, dartX, dartY, flagScale, flagOpacity]),
  );

  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: 'https://htmltest1.s3.ap-northeast-2.amazonaws.com/index.html',
        }}
        style={styles.webview}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Collection')}
        style={styles.astronautContainer}>
        <Image
          source={require('../assets/images/astronant.png')}
          style={styles.astronaut}
        />
      </TouchableOpacity>

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
      <Animated.Image
        source={brazil}
        style={[
          styles.image,
          styles.flag,
          {
            opacity: flagOpacity,
            transform: [{scale: flagScale}],
          },
        ]}
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
  astronautContainer: {
    position: 'absolute',
    top: '71%',
    left: '65%',
    width: 107,
    height: 170,
  },
  astronaut: {
    width: '100%',
    height: '100%',
  },
  dart: {
    width: 60,
    height: 125,
    top: '61%',
    left: '9.7%',
  },
  flag: {
    width: 250,
    height: 150,
    left: width / 2 - 125, // 중앙에 위치
    top: height / 2 - 75, // 중앙에 위치
  },
});

export default WebViewScreen;
