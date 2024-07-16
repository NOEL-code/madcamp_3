import React from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

interface ProfileImageScrollComponentProps {
  peopleArray: {name: string; imageUri: string}[];
  onUpdateProfile: (
    index: number,
    newProfile: {name: string; imageUri: string},
  ) => void;
}

const ProfileImageScrollComponent: React.FC<
  ProfileImageScrollComponentProps
> = ({peopleArray, onUpdateProfile}) => {
  const selectImage = (index: number) => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newImageUri = response.assets[0].uri;
        const updatedProfile = {...peopleArray[index], imageUri: newImageUri};
        onUpdateProfile(index, updatedProfile);
      }
    });
  };

  return (
    <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.profileContainer}>
        {peopleArray.map((person, index) => (
          <View key={index} style={styles.profileItem}>
            <TouchableOpacity onPress={() => selectImage(index)}>
              <Image
                style={styles.profileImage}
                source={person.imageUri ? { uri: person.imageUri } : require('../assets/images/add.png')} // Replace with actual profile images
              />
            </TouchableOpacity>
            <TextInput
              style={styles.profileName}
              value={person.name}
              onChangeText={text => {
                const updatedProfile = {...person, name: text};
                onUpdateProfile(index, updatedProfile);
              }}
              placeholder="Enter name"
              placeholderTextColor="#ccc"
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  profileName: {
    fontFamily: 'MapoBackpacking',
    color: '#fff',
    textAlign: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default ProfileImageScrollComponent;
