import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  PermissionsAndroid,
  Alert,
  Platform,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import backGroundImage from '../assets/images/b_camera.png';
import cameraImg from '../assets/images/cameraImg.png';
import axios from 'axios';

const Camera = ({route, navigation}) => {
  const {travelId, remainPhotoCount} = route.params;
  const [currentPhotoCount, setCurrentPhotoCount] = useState(remainPhotoCount);

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestCameraPermission();
    }
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'We need access to your camera to take photos',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Camera Permission Denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const shootPhoto = async () => {
    if (currentPhotoCount > 0) {
      const options = {
        mediaType: 'photo',
        saveToPhotos: false,
      };

      launchCamera(options, async response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorCode);
        } else if (response.assets && response.assets.length > 0) {
          const photo = response.assets[0];
          const formData = new FormData();
          formData.append('image', {
            uri: photo.uri,
            type: photo.type,
            name: photo.fileName,
          });
          formData.append('travelId', travelId);

          try {
            setCurrentPhotoCount(currentPhotoCount - 1);

            const serverResponse = await axios.post(
              'http://192.249.29.3:3000/api/photo/create',
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              },
            );
            console.log('Server response: ', serverResponse.data);
          } catch (error) {
            console.error('Error uploading photo: ', error);
          }
        }
      });
    } else {
      Alert.alert('No more photos can be taken.');
    }
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <ImageBackground source={backGroundImage} style={styles.backgroundImage}>
        <Text style={styles.numberOfPicsLeft}>{currentPhotoCount}</Text>
        <TouchableOpacity onPress={shootPhoto} style={styles.cameraButton}>
          <Image source={cameraImg} style={styles.cameraImg} />
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  cameraButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -50}, {translateY: -50}],
  },
  cameraImg: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  numberOfPicsLeft: {
    fontSize: 35,
    marginTop: 8,
    marginLeft: 30,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Camera;
