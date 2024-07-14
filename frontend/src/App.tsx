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
import backGroundImage from './assets/images/background.png';
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
                  <TouchableOpacity style={styles.iconButton}>
                    <Image source={cameraIcon} style={styles.actionIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton}>
                    <Image source={penIcon} style={styles.actionIcon} />
                  </TouchableOpacity>
                </View>
                <Image source={brazilFlag} style={styles.flag} />
              </View>
            </View>
            <View style={styles.tripBox}>
              <View style={styles.tripInfo}>
                <View style={styles.tripActions}>
                  <Text style={styles.tripTitle}>Australia</Text>
                  <TouchableOpacity style={styles.iconButton}>
                    <Image source={cameraIcon} style={styles.actionIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton}>
                    <Image source={penIcon} style={styles.actionIcon} />
                  </TouchableOpacity>
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
              </View>
              <Image source={singaporeFlag} style={styles.flag} />
              <TouchableOpacity style={styles.memoryButton}>
                <Text style={styles.memoryText}>Memory</Text>
              </TouchableOpacity>
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
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  tripBox: {
    backgroundColor: '#344675',
    borderRadius: 15,
    marginVertical: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tripInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tripTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  flag: {
    width: 131,
    height: 92,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  tripActions: {
    flexDirection: 'row',
  },
  iconButton: {
    marginHorizontal: 5,
  },
  actionIcon: {
    width: 30,
    height: 30,
  },
  historyBox: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#344675',
  },
  historyDate: {
    fontSize: 14,
    color: '#344675',
  },
  memoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6347',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  memoryText: {
    color: '#fff',
    marginRight: 5,
  },
  heartIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
});

export default Collection;
