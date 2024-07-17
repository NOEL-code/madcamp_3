import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ImageBackground,
  ScrollView,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import retry from '../assets/images/undo.png';
import backGroundImage from '../assets/images/background.png';
import note from '../assets/images/note.png';
import backIcon from '../assets/images/back-arrow-icon.png';

const countryFlags = {
  Brazil: require('../assets/images/brazil-flag.png'),
  Australia: require('../assets/images/australia-flag.png'),
  Japan: require('../assets/images/japan-flag.png'),
  France: require('../assets/images/france-flag.png'),
  Italy: require('../assets/images/italy-flag.jpg'), // jpg
  Spain: require('../assets/images/spain-flag.jpg'), // jpg
  Canada: require('../assets/images/canada-flag.png'),
  Turkey: require('../assets/images/turkey-flag.png'),
  Greece: require('../assets/images/greece-flag.png'),
  Norway: require('../assets/images/norway-flag.jpg'), // jpg
  Denmark: require('../assets/images/denmark-flag.jpg'), // jpg
  Ireland: require('../assets/images/ireland-flag.png'),
  Vietnam: require('../assets/images/vietnam-flag.jpg'), // jpg
  Malaysia: require('../assets/images/malaysia-flag.png'),
  Philippines: require('../assets/images/philippines-flag.jpg'), // jpg
  Singapore: require('../assets/images/singapore-flag.png'),
  Morocco: require('../assets/images/morocco-flag.png'),
  Kenya: require('../assets/images/kenya-flag.jpg'), // jpg
  Nigeria: require('../assets/images/nigeria-flag.png'),
  Tanzania: require('../assets/images/tanzania-flag.png'),
};

const Planned = ({route, navigation}) => {
  const data = route.params.trip;

  console.log('Data:', data);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const goBack = () => {
    if (navigation) {
      navigation.navigate('WebView'); // Navigate back if navigation is available
    }
  };

  const goCollection = () => {
    if (navigation) {
      navigation.navigate('Collection'); // Navigate back if navigation is available
    }
  };

  return (
    <ScrollView>
      <ImageBackground source={backGroundImage} style={styles.backgroundImage}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={goCollection}>
              <Image source={backIcon} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.screenTitle}>Planned</Text>
            <TouchableOpacity
              style={styles.backButton}
              onPress={goCollection}></TouchableOpacity>
          </View>
          <View style={styles.scheduleContainer}>
            <View style={styles.schedule}>
              <Image source={countryFlags[data.country]} style={styles.flag} />
              <View style={styles.scheduleText}>
                <Text style={styles.title}>{data?.country}</Text>
                <Text style={styles.subtitle}>
                  {data?.duration} Day{data?.duration > 1 ? 's' : ''} in{' '}
                  {data?.month},
                </Text>
                <Text style={styles.subtitle}>
                  {data?.totalPeople}{' '}
                  {data?.totalPeople > 1 ? 'People' : 'Person'},
                </Text>
                <Text style={styles.subtitle}>{data?.budget} budget,</Text>
                <Text style={styles.subtitle}>{data?.type} type</Text>
              </View>
            </View>
          </View>
          {data?.location && (
            <TouchableOpacity
              style={styles.mapContainer}
              onPress={toggleFullScreen}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: data.location.lat,
                  longitude: data.location.lng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}>
                <Marker
                  coordinate={{
                    latitude: data.location.lat,
                    longitude: data.location.lng,
                  }}
                  title={data.location.name}
                  description={'Arrival point'}
                />
              </MapView>
            </TouchableOpacity>
          )}
          <Modal visible={isFullScreen} animationType="slide">
            <View style={styles.fullScreenContainer}>
              <MapView
                style={styles.fullScreenMap}
                initialRegion={{
                  latitude: data?.location?.lat,
                  longitude: data?.location?.lng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}>
                {data?.location && (
                  <Marker
                    coordinate={{
                      latitude: data.location.lat,
                      longitude: data.location.lng,
                    }}
                    title={data.location.name}
                    description={'Arrival point'}
                  />
                )}
              </MapView>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={toggleFullScreen}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <View style={styles.itinerary}>
            <Image source={note} style={styles.noteImage} />
            <View style={styles.daysContainer}>
              {data?.gptResponse?.dailyPlans?.map((plan, index) => (
                <TouchableOpacity
                  key={index}
                  style={index === 0 ? styles.activeDay : styles.day}>
                  <Text
                    style={index === 0 ? styles.activeDayText : styles.dayText}>
                    Day {plan.day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.horizontalLine} />
            {data?.gptResponse?.dailyPlans?.map((plan, index) => (
              <View key={index} style={styles.itineraryDetails}>
                <Text style={styles.dayTitle}>
                  Day {plan.day}: {plan.title}
                </Text>
                <View style={styles.activity}>
                  <Image
                    source={require('../assets/images/morning.png')}
                    style={styles.activityIcon}
                  />
                  <Text style={styles.scheduleDays}>{plan.morning}</Text>
                </View>
                <View style={styles.activity}>
                  <Image
                    source={require('../assets/images/afternoon.png')}
                    style={styles.activityIcon}
                  />
                  <Text style={styles.scheduleDays}>{plan.afternoon}</Text>
                </View>
                <View style={styles.activity}>
                  <Image
                    source={require('../assets/images/evening.png')}
                    style={styles.activityIcon}
                  />
                  <Text style={styles.scheduleDays}>{plan.evening}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign: 'center',
  },
  backButton: {
    padding: 10,
  },
  icon: {
    width: 40,
    height: 30,
    tintColor: '#fff', // Optional: Change the icon color
  },
  screenTitle: {
    fontFamily: 'HS_SummerWaterLight',
    fontSize: 25,
    marginTop: 10,
    marginLeft: 65,
    marginRight: 10,
    color: '#fff',
    textAlign: 'center',
  },
  scheduleContainer: {
    position: 'relative', // Added for absolute positioning of noteImage
    borderRadius: 35,
    marginVertical: 10,
    marginBottom: -30,
    zIndex: 1,
  },
  schedule: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 35,
    padding: 20,
    alignItems: 'center',
  },
  flag: {
    width: 162,
    height: 114,
    resizeMode: 'contain',
    borderRadius: 17,
  },
  scheduleText: {
    marginLeft: 12,
  },
  title: {
    fontFamily: 'HS_SummerWaterLight',
    fontSize: 25,
    color: '#142148',
    textAlign: 'center',
    marginRight: 20,
  },
  subtitle: {
    fontFamily: 'MapoBackpacking',
    marginRight: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  noteImage: {
    position: 'absolute', // Absolute positioning
    top: -24, // Adjust according to where you want the note to overlap
    right: 27, // Adjust according to where you want the note to overlap
    width: 271,
    height: 50,
    resizeMode: 'contain',
  },
  mapContainer: {
    overflow: 'hidden',
    zIndex: 0,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  map: {
    height: 200,
  },
  itinerary: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 16,
    marginTop: 8,
    marginRight: 16,
  },
  day: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
  },
  activeDay: {
    paddingVertical: 5,
    marginTop: 5,
    paddingHorizontal: 10,
    backgroundColor: '#3B3B98',
    borderRadius: 16,
  },
  dayText: {
    fontFamily: 'MapoBackpacking',
    color: '#061549',
  },
  activeDayText: {
    fontFamily: 'MapoBackpacking',
    color: '#fff',
  },
  horizontalLine: {
    borderBottomColor: '#061549',
    borderBottomWidth: 2,
    marginTop: 10,
  },
  itineraryDetails: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 50,
  },
  dayTitle: {
    fontFamily: 'MapoBackpacking',
    fontSize: 20,
    marginBottom: 5,
    color: '#061549',
  },
  scheduleDays: {
    fontFamily: 'MapoBackpacking',
    color: '#061549',
  },
  activity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    color: '#061549',
  },
  activityIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenMap: {
    ...StyleSheet.absoluteFillObject,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontFamily: 'HS_SummerWaterLight',
    color: '#fff',
    paddingTop: 5,
    fontSize: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Planned;
