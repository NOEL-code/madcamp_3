import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Icon from './assets/images/back-arrow-icon.png'; // Ensure this path is correct
import backGroundImage from './assets/images/background-collection.png';
import brazilFlag from './assets/images/brazil-flag.png'; // Ensure this path is correct
import australiaFlag from './assets/images/australia-flag.png'; // Ensure this path is correct
import singaporeFlag from './assets/images/singapore-flag.png'; // Ensure this path is correct
import cameraIcon from './assets/images/camera-icon.png'; // Ensure this path is correct
import penIcon from './assets/images/pen-icon.png'; // Ensure this path is correct
import heartIcon from './assets/images/heart-icon.png'; // Ensure this path is correct

const Collection = ({navigation}) => {
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
            <Text style={styles.screenTitle}>Collection</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Planned</Text>
            <View style={styles.tripBox}>
              <View style={styles.tripInfo}>
                <View style={styles.tripActions}>
                  <Text style={styles.tripTitle}>Brazil</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.iconButton}>
                      <Image source={cameraIcon} style={styles.actionIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                      <Image source={penIcon} style={styles.actionIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
                <Image source={brazilFlag} style={styles.flag} />
              </View>
            </View>
            <View style={styles.tripBox}>
              <View style={styles.tripInfo}>
                <View style={styles.tripActions}>
                  <Text style={styles.tripTitle}>Australia</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.iconButton}>
                      <Image source={cameraIcon} style={styles.actionIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                      <Image source={penIcon} style={styles.actionIcon} />
                    </TouchableOpacity>
                  </View>
                </View>
                <Image source={australiaFlag} style={styles.flag} />
              </View>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>History</Text>
            <View style={styles.historyBox}>
              <View style={styles.historyInfo}>
                <Text style={styles.historyTitle}>Singapore</Text>
                <Text style={styles.historyDate}>2024.01.10-2024.01.13</Text>
                <TouchableOpacity style={styles.memoryButton}>
                  <Text style={styles.memoryText}>Memory</Text>
                  <Image source={heartIcon} style={styles.heartIcon} />
                </TouchableOpacity>
              </View>

              <Image source={singaporeFlag} style={styles.flag} />
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
    marginLeft: 35,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  section: {
    marginTop: 10,
    elevation: 10,
    shadowOpacity: 10,
    shadowColor: 'rgba(196,196,196,0.3)',
    shadowRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 13,
  },
  tripBox: {
    backgroundColor: 'rgba(196,196,196,0.3)',
    borderRadius: 35,
    marginVertical: 10,
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
    fontSize: 24,
    fontWeight: 'bold',
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
    backgroundColor: 'rgba(255, 255, 255, 0.87)',
    borderRadius: 35,
    marginVertical: 10,
    padding: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#344675',
  },
  historyDate: {
    marginTop: 4,
    fontSize: 12,
    color: '#344675',
  },
  memoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(233,32,32,0.75)',
    borderRadius: 16,
    padding: 7,
    paddingTop: 10,
    width: 110,
    height: 40,
    marginTop: 7,
  },
  memoryText: {
    color: '#fff',
    marginLeft: 10,
  },
  heartIcon: {
    width: 20, // Adjusted width
    height: 20, // Adjusted height
    marginLeft: 5, // Adjusted margin
  },
});

export default Collection;
