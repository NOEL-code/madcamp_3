import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import DropdownComponent from '../components/DropdownComponent';
import ProfileImageScrollComponent from '../components/ProfileImageScrollComponent';
import whenIcon from '../assets/images/when.png';
import peopleIcon from '../assets/images/people.png';
import durationIcon from '../assets/images/duration.png';
import budgetIcon from '../assets/images/budget.png';
import typeIcon from '../assets/images/type.png';
import backGroundImage from '../assets/images/background.png';
import axios from 'axios';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigationTypes';

type SurveyScreenRouteProp = RouteProp<RootStackParamList, 'Survey'>;

type SurveyScreenProps = {
  route: SurveyScreenRouteProp;
  navigation: any;
};

const SurveyScreen = ({route, navigation}: SurveyScreenProps) => {
  const {country, location} = route.params;

  const [month, setMonth] = useState<string>('January');
  const [peopleCount, setPeopleCount] = useState<number>(4);
  const [duration, setDuration] = useState<string>('1 Day');
  const [budget, setBudget] = useState<string>('General');
  const [type, setType] = useState<string>('Healing');
  const [profiles, setProfiles] = useState<{name: string; imageUri: string}[]>(
    Array.from({length: peopleCount}, () => ({name: '', imageUri: ''})),
  );

  useEffect(() => {
    setProfiles(
      Array.from({length: peopleCount}, () => ({name: '', imageUri: ''})),
    );
  }, [peopleCount]);

  const handleUpdateProfile = (
    index: number,
    newProfile: {name: string; imageUri: string},
  ) => {
    const updatedProfiles = [...profiles];
    updatedProfiles[index] = newProfile;
    setProfiles(updatedProfiles);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('month', month);
    formData.append('totalPeople', peopleCount.toString());
    formData.append(
      'duration',
      parseInt(duration.split(' ')[0], 10).toString(),
    );
    formData.append('budget', budget);
    formData.append('type', type);
    formData.append('country', country);
    formData.append('location', JSON.stringify(location));

    profiles.forEach((profile, index) => {
      formData.append(`people[${index}][name]`, profile.name);
      formData.append(`images`, {
        uri: profile.imageUri,
        type: 'image/jpeg',
        name: `profile-${index}.jpg`,
      });
    });

    console.log('post 시작');
    try {
      const response = await axios.post(
        'http://ec2-43-202-52-115.ap-northeast-2.compute.amazonaws.com:3000/api/travel/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('Travel created successfully:', response.data);
      // Navigate to RecommendationScreen and pass response data
      navigation.navigate('Recommendation', {data: response.data});
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
    }
  };

  const months = [
    {label: 'January', value: 'January'},
    {label: 'February', value: 'February'},
    {label: 'March', value: 'March'},
    {label: 'April', value: 'April'},
    {label: 'May', value: 'May'},
    {label: 'June', value: 'June'},
    {label: 'July', value: 'July'},
    {label: 'August', value: 'August'},
    {label: 'September', value: 'September'},
    {label: 'October', value: 'October'},
    {label: 'November', value: 'November'},
    {label: 'December', value: 'December'},
  ];

  const durations = Array.from({length: 10}, (_, i) => ({
    label: `${i + 1} Day${i + 1 > 1 ? 's' : ''}`,
    value: `${i + 1} Day${i + 1 > 1 ? 's' : ''}`,
  }));

  const budgets = [
    {label: 'Poor', value: 'Poor'},
    {label: 'General', value: 'General'},
    {label: 'Rich', value: 'Rich'},
  ];

  const types = [
    {label: 'Healing', value: 'Healing'},
    {label: 'Tight', value: 'Tight'},
    {label: 'Loose', value: 'Loose'},
  ];

  const people = Array.from({length: 10}, (_, i) => ({
    label: (i + 1).toString(),
    value: (i + 1).toString(),
  }));

  return (
    <ImageBackground source={backGroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>At least, I want ...</Text>

          <DropdownComponent
            label="When"
            data={months}
            value={month}
            onChange={item => setMonth(item.value)}
            containerStyle={[styles.pickerContainerWhen, styles.shadow]}
            pickerStyle={styles.pickerStyle}
            imageIcon={whenIcon}
          />

          <View style={[styles.peopleContainer]}>
            <DropdownComponent
              label="People"
              data={people}
              value={peopleCount.toString()}
              onChange={item => {
                const newPeopleCount = parseInt(item.value);
                setPeopleCount(newPeopleCount);
              }}
              pickerStyle={styles.pickerStyle}
              imageIcon={peopleIcon}
            />

            <ProfileImageScrollComponent
              peopleArray={profiles}
              onUpdateProfile={handleUpdateProfile}
            />
          </View>

          <DropdownComponent
            label="Duration"
            data={durations}
            value={duration}
            onChange={item => setDuration(item.value)}
            containerStyle={[styles.pickerContainerDuration, styles.shadow]}
            pickerStyle={styles.pickerStyle}
            imageIcon={durationIcon}
          />

          <DropdownComponent
            label="Budget"
            data={budgets}
            value={budget}
            onChange={item => setBudget(item.value)}
            containerStyle={[styles.pickerContainerBudget, styles.shadow]}
            pickerStyle={styles.pickerStyle}
            imageIcon={budgetIcon}
          />

          <DropdownComponent
            label="Type"
            data={types}
            value={type}
            onChange={item => setType(item.value)}
            containerStyle={[styles.pickerContainerType, styles.shadow]}
            pickerStyle={styles.pickerStyleType}
            imageIcon={typeIcon}
          />

          <TouchableOpacity
            style={[styles.submitButton, styles.shadowSubmit]}
            onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontFamily: 'HS_SummerWaterLight',
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
  },
  peopleContainer: {
    height: 200,
    backgroundColor: 'rgba(244, 100, 23, 0.71)',
    borderRadius: 35,
    marginTop: 8,
    marginBottom: 8,
  },

  shadow: {
    //shadowColor: 'rgba(224, 45, 48, 0.68)',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  pickerContainerWhen: {
    backgroundColor: 'rgba(224, 45, 48, 0.68)',
  },
  pickerContainerDuration: {
    backgroundColor: 'rgba(255, 197, 6, 0.69)',
  },
  pickerContainerBudget: {
    backgroundColor: 'rgba(16, 242, 31, 0.55)', // Custom color for Budget
  },
  pickerContainerType: {
    backgroundColor: 'rgba(19, 45, 241, 0.8)', // Custom color for Type
  },
  pickerStyle: {
    backgroundColor: 'rgba(200,200,200, 0.2)',
  },
  submitButton: {
    alignSelf: 'center',
    backgroundColor: 'rgba(112, 32, 196, 0.8)', // Custom color for Submit button
    borderRadius: 35,
    paddingVertical: 12,
    alignItems: 'center',
    marginVertical: 16,
    padding: 12,
    width: 142,
    height: 46,
  },
  shadowSubmit: {
    shadowColor: 'rgba(112, 32, 196, 0.8)',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  submitButtonText: {
    fontFamily: 'HS_SummerWaterLight',
    color: '#fff',
    fontSize: 18,
  },
});

export default SurveyScreen;
