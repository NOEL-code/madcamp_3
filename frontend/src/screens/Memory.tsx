import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Modal,
} from 'react-native';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import Icon from '../assets/images/back-arrow-icon.png';
import profileIcon from '../assets/images/profile-icon.png';
import backGroundImage from '../assets/images/background.png';

const Memory = ({route, navigation}) => {
  const {trip} = route.params;
  const {_id, country} = trip;
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uncategorizedPhotos, setUncategorizedPhotos] = useState([]);
  const [categorizedPhotos, setCategorizedPhotos] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    fetchNoMatchPhotos();
    fetchTravelPhotos();
  }, []);

  const fetchNoMatchPhotos = async () => {
    try {
      const response = await axios.get(
        `http://192.249.29.3:3000/api/photo/nomatch/${_id}`,
      );
      setUncategorizedPhotos(response.data);
      console.log('Uncategorized Photos:', response.data);
    } catch (error) {
      console.error('Error fetching no match photos: ', error);
    }
  };

  const fetchTravelPhotos = async () => {
    try {
      const response = await axios.get(
        `http://192.249.29.3:3000/api/person/images/${_id}`,
      );
      console.log('Travel Photos:', response.data);
      setCategorizedPhotos(response.data);
    } catch (error) {
      console.error('Error fetching travel photos: ', error);
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const goBack = () => {
    if (navigation) {
      navigation.navigate('Collection');
    }
  };

  const openImage = image => {
    setSelectedImage(image);
    setIsFullScreen(true);
  };

  const closeImage = () => {
    setSelectedImage(null);
    setIsFullScreen(false);
  };

  const handleProfileClick = person => {
    if (selectedPerson && selectedPerson._id === person._id) {
      setSelectedPerson(null); // Deselect if the same person is clicked again
    } else {
      setSelectedPerson(person);
    }
  };

  const renderPhotos = photos => {
    if (photos.length === 0) {
      return <Text style={styles.noImageText}>No Image</Text>;
    }

    return photos.map((photo, index) => (
      <TouchableOpacity key={index} onPress={() => openImage({uri: photo.url})}>
        <FastImage
          source={{uri: photo.url}}
          style={styles.pic}
          onError={error =>
            console.error('Image load error:', error.nativeEvent.error)
          }
        />
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground source={backGroundImage} style={styles.backgroundImage}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <FastImage source={Icon} style={styles.icon} />
          </TouchableOpacity>
          <View style={styles.introduction}>
            <Text style={styles.screenTitle}>{country}</Text>
            {/* <Text style={styles.dateTitle}>24.01.10~24.01.13</Text> */}
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.sidebar}>
            {categorizedPhotos.map(person => (
              <TouchableOpacity
                key={person._id}
                onPress={() => handleProfileClick(person)}
                style={[
                  styles.profile,
                  selectedPerson &&
                    selectedPerson._id === person._id &&
                    styles.selectedProfile,
                ]}>
                <FastImage
                  source={{uri: person.profileImage}}
                  style={styles.profileIcon}
                  onError={error =>
                    console.error(
                      'Profile Image load error:',
                      error.nativeEvent.error,
                    )
                  }
                />
                <Text style={styles.name}>{person.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setSelectedPerson(null)}
              style={[
                styles.profile,
                selectedPerson === null && styles.selectedProfile,
              ]}>
              <FastImage source={profileIcon} style={styles.profileIcon} />
              <Text style={styles.name}>미분류</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.photosContainer}>
            {selectedPerson ? (
              <View style={styles.photosSection}>
                {renderPhotos(selectedPerson.travelImage)}
              </View>
            ) : (
              <View style={styles.photosSection}>
                {renderPhotos(uncategorizedPhotos)}
              </View>
            )}
          </ScrollView>
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
            <FastImage source={selectedImage} style={styles.fullScreenImage} />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  backButton: {
    padding: 10,
    marginRight: 20,
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: '#fff',
  },
  screenTitle: {
    fontFamily: 'HS_SummerWaterLight',
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
  },
  dateTitle: {
    fontFamily: 'HS_SummerWaterLight',
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
  },
  introduction: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  body: {
    flexDirection: 'row',
    flex: 1,
  },
  sidebar: {
    width: 80,
    height: 540,
    backgroundColor: 'rgba(196,196,196,0.3)',
    alignItems: 'center',
    paddingVertical: 10,
    marginLeft: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  profile: {
    alignItems: 'center',
    marginBottom: 15,
  },
  selectedProfile: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 15,
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  name: {
    fontFamily: 'HS_SummerWaterLight',
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
  },
  photosContainer: {
    width: 240,
    height: 540,
    backgroundColor: 'rgba(196,196,196,0.3)',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginLeft: 10,
    borderRadius: 15,
    marginBottom: 15,
  },
  photosSection: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  pic: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 5,
    resizeMode: 'cover',
  },
  noImageText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
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
