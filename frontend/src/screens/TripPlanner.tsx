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
import Icon from '../assets/images/back-arrow-icon.png'; // Ensure this path is correct
import backGroundImage from '../assets/images/background.png';
import note from '../assets/images/note.png';

const TripPlanner = ({navigation}) => {
  // Add navigation prop if using react-navigation
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const goBack = () => {
    if (navigation) {
      navigation.goBack(); // Navigate back if navigation is available
    }
  };

  return (
    <ScrollView>
      <ImageBackground source={backGroundImage} style={styles.backgroundImage}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={goBack}>
              <Image source={Icon} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.screenTitle}>Planned</Text>
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
                <Text style={styles.title}>Brazil</Text>
                <Text style={styles.subtitle}>4 Days in July,</Text>
                <Text style={styles.subtitle}>4 People,</Text>
                <Text style={styles.subtitle}>General budget,</Text>
                <Text style={styles.subtitle}>Healing type</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.mapContainer}
            onPress={toggleFullScreen}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: -23.5505,
                longitude: -46.6333,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <Marker
                coordinate={{latitude: -23.5505, longitude: -46.6333}}
                title={'São Paulo'}
                description={'Arrival point'}
              />
            </MapView>
          </TouchableOpacity>
          <Modal visible={isFullScreen} animationType="slide">
            <View style={styles.fullScreenContainer}>
              <MapView
                style={styles.fullScreenMap}
                initialRegion={{
                  latitude: -23.5505,
                  longitude: -46.6333,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}>
                <Marker
                  coordinate={{latitude: -23.5505, longitude: -46.6333}}
                  title={'São Paulo'}
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
              {['Day 1', 'Day 2', 'Day 3', 'Day 4'].map((day, index) => (
                <TouchableOpacity
                  key={index}
                  style={index === 0 ? styles.activeDay : styles.day}>
                  <Text
                    style={index === 0 ? styles.activeDayText : styles.dayText}>
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.horizontalLine} />
            <View style={styles.itineraryDetails}>
              <Text style={styles.dayTitle}>
                Day 1: Arrival in Rio de Janeiro
              </Text>
              <View style={styles.activity}>
                <Image
                  source={require('../assets/images/morning.png')}
                  style={styles.activityIcon}
                />
                <Text style={styles.scheduleDays}>
                  Arrival at the airport followed by hotel check-in.
                </Text>
              </View>
              <View style={styles.activity}>
                <Image
                  source={require('../assets/images/afternoon.png')}
                  style={styles.activityIcon}
                />
                <Text style={styles.scheduleDays}>
                  Visit Copacabana Beach and Ipanema Beach.
                </Text>
              </View>
              <View style={styles.activity}>
                <Image
                  source={require('../assets/images/evening.png')}
                  style={styles.activityIcon}
                />
                <Text style={styles.scheduleDays}>
                  Enjoy local cuisine at Leftover Restaurant.
                </Text>
              </View>
            </View>
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
});

export default TripPlanner;
