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
import calendar from '../assets/images/calendar_check.png';
import backGroundImage from '../assets/images/background.png';
import note from '../assets/images/note.png';

const RecommendationScreen = ({route, navigation}) => {
  const {data} = route.params;

  console.log(data.gptResponse.dailyPlans);
  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No data available</Text>
      </View>
    );
  }

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
            <TouchableOpacity style={styles.backButton} onPress={goBack}>
              <Image source={retry} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.screenTitle}>Recommendation</Text>
            <TouchableOpacity style={styles.backButton} onPress={goCollection}>
              <Image source={calendar} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.scheduleContainer}>
            <View style={styles.schedule}>
              <Image
                source={{
                  uri: 'https://htmltest1.s3.ap-northeast-2.amazonaws.com/download.png',
                }}
                style={styles.flag}
              />
              <View style={styles.scheduleText}>
                <Text style={styles.title}>{data.country}</Text>
                <Text style={styles.subtitle}>
                  {data.duration} Day{data.duration > 1 ? 's' : ''} in{' '}
                  {data.month},
                </Text>
                <Text style={styles.subtitle}>
                  {data.totalPeople}{' '}
                  {data.totalPeople > 1 ? 'People' : 'Person'},
                </Text>
                <Text style={styles.subtitle}>{data.budget} budget,</Text>
                <Text style={styles.subtitle}>{data.type} type</Text>
              </View>
            </View>
          </View>
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
          <Modal visible={isFullScreen} animationType="slide">
            <View style={styles.fullScreenContainer}>
              <MapView
                style={styles.fullScreenMap}
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
              {data.gptResponse.dailyPlans.map((plan, index) => (
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
            {data.gptResponse.dailyPlans.map((plan, index) => (
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
  },
  backButton: {
    padding: 10,
    marginRight: 20,
  },
  icon: {
    width: 40,
    height: 30,
    tintColor: '#fff', // Optional: Change the icon color
  },
  screenTitle: {
    fontSize: 30,
    marginLeft: 40,
    marginRight: 55,
    fontWeight: 'bold',
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
    marginLeft: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#142148',
    textAlign: 'center',
  },
  subtitle: {
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
    color: '#061549',
  },
  activeDayText: {
    color: '#fff',
  },
  horizontalLine: {
    borderBottomColor: '#061549',
    borderBottomWidth: 2,
    marginTop: 15,
  },
  itineraryDetails: {
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 50,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#061549',
  },
  concept: {
    fontStyle: 'italic',
    color: '#061549',
    marginBottom: 10,
  },
  scheduleDays: {
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
    color: '#fff',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default RecommendationScreen;
