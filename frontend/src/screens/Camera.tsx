import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';

import backGroundImage from './assets/images/b_camera.png';
import cameraImg from './assets/images/cameraImg.png';

const Camera = ({navigation}) => {
    // Add navigation prop if using react-navigation - 일단 몰라서 따라 쓰기
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    const shootPhoto = () => {
        //클릭했을 때 실행될 함수. 사진이 찍히되, 갤러리에 저장이 되지는 않고, 내부 DB에 대조를 하여 저장하도록 하는 코드.
        //개수도 줄어야 한다. 24개에서 23개 되는거 먼말알?
    };

    return (
        <ScrollView contentContainerStyle={{flexGrow:1}}>
            <ImageBackground source={backGroundImage} style={styles.backgroundImage}>
              <Text style={styles.numberOfPicsLeft}>24</Text>
                <TouchableOpacity onPress={shootPhoto} style={styles.cameraButton}>
                  <Image source={cameraImg} style={styles.cameraImg} />
                </TouchableOpacity>
            </ImageBackground>
        </ScrollView>
    );
};4

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    cameraButton: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{ translateX: -50 }, { translateY: -50 }],
    },
    cameraImg: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
    },
    numberOfPicsLeft : {
      fontSize:35,
      marginTop: 8,
      marginLeft: 30,
      color: '#fff',
      textAlign: 'center',
    },
});

export default Camera;