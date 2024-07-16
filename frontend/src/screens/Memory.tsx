import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from '../assets/images/back-arrow-icon.png'; // Ensure this path is correct
import profileIcon from '../assets/images/profile-icon.png';
import backGroundImage from '../assets/images/background.png';
import me0 from '../assets/images/me0.jpg';
import me1 from '../assets/images/me1.jpg';
import me2 from '../assets/images/me2.jpg';
import me3 from '../assets/images/me3.jpg';

const Memory = ({navigation}) => {
  // Add navigation prop if using react-navigation
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const goBack = () => {
    if (navigation) {
      navigation.navigate('Collection'); // Navigate back if navigation is available
    }
  };

  const showPics = {
    //사람을 클릭하면 그 사람과 관련된 사진을 보여주는 함수.
  };

  const openImage = image => {
    setSelectedImage(image);
    setIsFullScreen(true);
  };

  const closeImage = () => {
    setSelectedImage(null);
    setIsFullScreen(false);
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <ImageBackground source={backGroundImage} style={styles.backgroundImage}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={goBack}>
              <Image source={Icon} style={styles.icon} />
            </TouchableOpacity>
            <View style={styles.introduction}>
              <Text style={styles.screenTitle}>Singapore</Text>
              <Text style={styles.dateTitle}>24.01.10~24.01.13</Text>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.profiles}>
              <View style={styles.profile}>
                <TouchableOpacity style={styles.backButton} onPress={showPics}>
                  <Image source={profileIcon} style={styles.actionIcon} />
                  <Text style={styles.name}>싱송</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.profile}>
                <TouchableOpacity style={styles.backButton} onPress={showPics}>
                  <Image source={profileIcon} style={styles.actionIcon} />
                  <Text style={styles.name}>슝슝</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.profile}>
                <TouchableOpacity style={styles.backButton} onPress={showPics}>
                  <Image source={profileIcon} style={styles.actionIcon} />
                  <Text style={styles.name}>솬솬</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.profile}>
                <TouchableOpacity style={styles.backButton} onPress={showPics}>
                  <Image source={profileIcon} style={styles.actionIcon} />
                  <Text style={styles.name}>졍졍</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.profile}>
                <TouchableOpacity style={styles.backButton} onPress={showPics}>
                  <Image source={profileIcon} style={styles.actionIcon} />
                  <Text style={styles.name}>미분류</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.pictures}>
              <View style={styles.pictureRow}>
                <TouchableOpacity onPress={() => openImage(me0)}>
                  <Image source={me0} style={styles.pic} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openImage(me1)}>
                  <Image source={me1} style={styles.pic} />
                </TouchableOpacity>
              </View>
              <View style={styles.pictureRow}>
                <TouchableOpacity onPress={() => openImage(me2)}>
                  <Image source={me2} style={styles.pic} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openImage(me3)}>
                  <Image source={me3} style={styles.pic} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>

      <Modal visible={isFullScreen} transparent={true}>
        <View style={styles.modalBackground}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={closeImage}>
            <Text style={styles.modalCloseText}>X</Text>
          </TouchableOpacity>
          {selectedImage && (
            <Image source={selectedImage} style={styles.fullScreenImage} />
          )}
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 40,
    padding: 20,
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
  dateTitle: {
    fontSize: 15,
    marginLeft: 40,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  introduction: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profiles: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
  profile: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  name: {
    fontSize: 15,
    marginTop: 5,
    color: '#fff',
    textAlign: 'center',
  },
  actionIcon: {
    width: 50,
    height: 50,
  },
  body: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'stretch',
  },
  pictures: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(196,196,196,0.3)',
    borderRadius: 35,
    marginVertical: 30,
    padding: 20,
  },
  pictureRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 5,
  },
  pic: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginHorizontal: 10,
    resizeMode: 'cover',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  modalCloseText: {
    fontSize: 30,
    color: 'white',
  },
  fullScreenImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
  },
});

export default Memory;
