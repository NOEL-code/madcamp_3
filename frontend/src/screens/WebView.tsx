import React, {useRef, useEffect, useState} from 'react';
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

const {width, height} = Dimensions.get('window');

type WebViewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'WebView'
>;

const countries = [
  //20개
  {
    country: 'Brazil',
    location: {name: 'Brasilia', lat: -15.8267, lng: -47.9218},
    image: require('../assets/images/brazil-flag.png'),
  },
  {
    country: 'Australia',
    location: {name: 'Canberra', lat: -35.2809, lng: 149.13},
    image: require('../assets/images/australia-flag.jpg'),
  }, //jpg
  {
    country: 'Japan',
    location: {name: 'Tokyo', lat: 35.6762, lng: 139.6503},
    image: require('../assets/images/japan-flag.png'),
  },
  {
    country: 'France',
    location: {name: 'Paris', lat: 48.8566, lng: 2.3522},
    image: require('../assets/images/france-flag.png'),
  },
  {
    country: 'Italy',
    location: {name: 'Rome', lat: 41.9028, lng: 12.4964},
    image: require('../assets/images/italy-flag.jpg'),
  }, //jpg
  {
    country: 'Spain',
    location: {name: 'Madrid', lat: 40.4168, lng: -3.7038},
    image: require('../assets/images/spain-flag.jpg'),
  }, //jpg
  {
    country: 'Canada',
    location: {name: 'Ottawa', lat: 45.4215, lng: -75.6972},
    image: require('../assets/images/canada-flag.png'),
  },
  {
    country: 'Turkey',
    location: {name: 'Ankara', lat: 39.9334, lng: 32.8597},
    image: require('../assets/images/turkey-flag.png'),
  },
  {
    country: 'Greece',
    location: {name: 'Athens', lat: 37.9838, lng: 23.7275},
    image: require('../assets/images/greece-flag.png'),
  },
  {
    country: 'Norway',
    location: {name: 'Oslo', lat: 59.9139, lng: 10.7522},
    image: require('../assets/images/norway-flag.jpg'),
  }, //jpg
  {
    country: 'Denmark',
    location: {name: 'Copenhagen', lat: 55.6761, lng: 12.5683},
    image: require('../assets/images/denmark-flag.jpg'),
  }, //jpg
  {
    country: 'Ireland',
    location: {name: 'Dublin', lat: 53.3498, lng: -6.2603},
    image: require('../assets/images/ireland-flag.png'),
  },
  {
    country: 'Vietnam',
    location: {name: 'Hanoi', lat: 21.0285, lng: 105.8542},
    image: require('../assets/images/vietnam-flag.jpg'),
  }, //jpg
  {
    country: 'Malaysia',
    location: {name: 'Kuala Lumpur', lat: 3.139, lng: 101.6869},
    image: require('../assets/images/malaysia-flag.png'),
  },
  {
    country: 'Philippines',
    location: {name: 'Manila', lat: 14.5995, lng: 120.9842},
    image: require('../assets/images/philippines-flag.jpg'),
  }, //jpg
  {
    country: 'Singapore',
    location: {name: 'Singapore', lat: 1.3521, lng: 103.8198},
    image: require('../assets/images/singapore-flag.png'),
  },
  {
    country: 'Morocco',
    location: {name: 'Rabat', lat: 34.0209, lng: -6.8417},
    image: require('../assets/images/morocco-flag.png'),
  },
  {
    country: 'Kenya',
    location: {name: 'Nairobi', lat: -1.2921, lng: 36.8219},
    image: require('../assets/images/kenya-flag.jpg'),
  }, //jpg
  {
    country: 'Nigeria',
    location: {name: 'Abuja', lat: 9.0765, lng: 7.3986},
    image: require('../assets/images/nigeria-flag.png'),
  },
  {
    country: 'Tanzania',
    location: {name: 'Dodoma', lat: -6.163, lng: 35.7516},
    image: require('../assets/images/tanzania-flag.png'),
  },
];

const getRandomCountry = () => {
  const randomIndex = Math.floor(Math.random() * countries.length);
  return countries[randomIndex];
};

const WebViewScreen = () => {
  const navigation = useNavigation<WebViewScreenNavigationProp>();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const dartX = useRef(new Animated.Value(0)).current;
  const dartY = useRef(new Animated.Value(0)).current;
  const flagScale = useRef(new Animated.Value(0)).current;
  const flagOpacity = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    const randomCountry = getRandomCountry();
    setSelectedCountry(randomCountry);

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
        navigation.navigate('Survey', randomCountry);
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

      {selectedCountry && (
        <Animated.Image
          source={selectedCountry.image}
          style={[
            styles.image,
            styles.flag,
            {
              opacity: flagOpacity,
              transform: [{scale: flagScale}],
            },
          ]}
        />
      )}
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
    resizeMode: 'contain',
    left: width / 2 - 125, // 중앙에 위치
    top: height / 2 - 75, // 중앙에 위치
  },
});

export default WebViewScreen;
