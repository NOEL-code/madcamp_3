import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Icon from '../assets/images/back-arrow-icon.png'; // Ensure this path is correct
import backGroundImage from '../assets/images/background-collection.png';
import brazilFlag from '../assets/images/brazil-flag.png'; // Ensure this path is correct
import australiaFlag from '../assets/images/australia-flag.png'; // Ensure this path is correct
import singaporeFlag from '../assets/images/singapore-flag.png'; // Ensure this path is correct
import cameraIcon from '../assets/images/camera-icon.png'; // Ensure this path is correct
import penIcon from '../assets/images/pen-icon.png'; // Ensure this path is correct
import heartIcon from '../assets/images/heart-icon.png'; // Ensure this path is correct
import axios from 'axios';

const Collection = ({navigation}) => {
  const [travelData, setTravelData] = useState([]);

  const goBack = () => {
    if (navigation) {
      navigation.goBack(); // Navigate back if navigation is available
    }
  };

  const goCamera = (_id, remainPhotoCount) => {
    if (navigation) {
      console.log('촬영하러 고고');
      navigation.navigate('Camera', {travelId: _id, remainPhotoCount});
    }
  };

  const goPlanned = trip => {
    if (navigation) {
      console.log('계획 보러 고고');
      navigation.navigate('Planned', {trip});
    }
  };

  const goMemory = _id => {
    if (navigation) {
      console.log('갤러리 보러 고고');
      navigation.navigate('Memory', {travelId: _id});
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://ec2-43-202-52-115.ap-northeast-2.compute.amazonaws.com:3000/api/travel',
        );
        console.log(response.data);
        setTravelData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const renderPlannedTrips = () => {
    return travelData.map((trip, index) => (
      <View key={index} style={styles.tripBox}>
        <View style={styles.tripInfo}>
          <View style={styles.tripActions}>
            <Text style={styles.tripTitle}>{trip.country}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => goCamera(trip._id, trip.remainPhotoCount)}>
                <Image source={cameraIcon} style={styles.actionIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => goPlanned(trip)}>
                <Image source={penIcon} style={styles.actionIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <Image source={brazilFlag} style={styles.flag} />
        </View>
      </View>
    ));
  };

  const renderHistoryTrips = () => {
    return travelData.map((trip, index) => (
      <View key={index} style={styles.historyBox}>
        <View style={styles.historyInfo}>
          <Text style={styles.historyTitle}>{trip.country}</Text>
          <Text style={styles.historyDate}>24.01.10 - 24.01.13</Text>
          <TouchableOpacity
            style={styles.memoryButton}
            onPress={() => goMemory(trip._id)}>
            <Text style={styles.memoryText}>Memory</Text>
            <Image source={heartIcon} style={styles.heartIcon} />
          </TouchableOpacity>
        </View>
        <Image source={brazilFlag} style={styles.flag} />
      </View>
    ));
  };

  return (
    <ImageBackground source={backGroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Image source={Icon} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Collection</Text>
        </View>
        <Text style={styles.plannedsecTitle}>Planned</Text>
        <View style={styles.plansection}>
          <ScrollView>
            {renderPlannedTrips()}
          </ScrollView>
        </View>
        <Text style={styles.historysecTitle}>History</Text>
        <View style={styles.historysection}>
          <ScrollView horizontal pagingEnabled>
            {renderHistoryTrips()}
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
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
    height: 40,
    tintColor: '#fff', // Optional: Change the icon color
  },
  screenTitle: {
    fontFamily: 'HS_SummerWaterLight',
    fontSize: 30,
    marginTop: 15,
    marginLeft: 35,
    color: '#fff',
    textAlign: 'center',
  },
  plansection: {
    height: 320,
    marginTop: 0,
    elevation: 10,
    shadowOpacity: 10,
    shadowColor: 'rgba(196,196,196,0.3)',
    shadowRadius: 10,
  },
  historysection: {
    height: 170,
    elevation: 10,
    shadowOpacity: 10,
    shadowColor: 'rgba(196,196,196,0.3)',
    shadowRadius: 10,
  },
  plannedsecTitle: {
    fontFamily: 'HS_SummerWaterLight',
    fontSize: 20,
    color: '#fff',
    marginTop:5,
    marginLeft: 13,
  },
  historysecTitle: {
    fontFamily: 'HS_SummerWaterLight',
    fontSize: 20,
    color: '#fff',
    marginTop: 10,
    marginLeft: 13,
  },
  tripBox: {
    backgroundColor: 'rgba(196,196,196,0.3)',
    borderRadius: 35,
    marginVertical: 8,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  tripInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripTitle: {
    fontFamily: 'MapoBackpacking',
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
    marginLeft: 10,
  },
  flag: {
    width: 131,
    height: 100,
    resizeMode: 'contain',
    marginLeft: 20,
    elevation: 10,
  },
  tripActions: {
    marginLeft: 10,
  },
  iconButton: {
    marginHorizontal: 5,
  },
  actionIcon: {
    width: 50,
    height: 50,
  },
  historyBox: {
    width: 325,
    backgroundColor: 'rgba(255, 255, 255, 0.87)',
    borderRadius: 35,
    marginVertical: 10,
    marginHorizontal:2,
    padding: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 24,
    fontFamily: 'MapoBackpacking',
    color: '#344675',
    marginLeft:5,
  },
  historyDate: {
    fontFamily: 'MapoBackpacking',
    marginTop: 2,
    marginBottom: 1,
    fontSize: 12,
    color: '#344675',
    marginLeft: 6,
  },
  memoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(233,32,32,0.75)',
    borderRadius: 12,
    padding: 7,
    width: 116,
    height: 40,
    marginTop: 5,
    marginLeft:2,
  },
  memoryText: {
    color: '#fff',
    marginLeft: 10,
  },
  heartIcon: {
    width: 25, // Adjusted width
    height: 20, // Adjusted height
    marginLeft: 6, // Adjusted margin
  },
});

export default Collection;
