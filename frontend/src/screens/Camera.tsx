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
  // const {data} = route.params;
  // const travelId = data._id;
  const travelId = '6695f8c935f9194e98726372';

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [remainPhotoCount, setRemainPhotoCount] = useState(
    // data.remainPhotoCount,
    2,
  );

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

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const shootPhoto = async () => {
    if (remainPhotoCount > 0) {
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
            const serverResponse = await axios.post(
              'http://ec2-43-202-52-115.ap-northeast-2.compute.amazonaws.com:3000/api/photo/create',
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              },
            );
            console.log('Server response: ', serverResponse.data);
            setRemainPhotoCount(remainPhotoCount - 1);
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
        <Text style={styles.numberOfPicsLeft}>{remainPhotoCount}</Text>
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
