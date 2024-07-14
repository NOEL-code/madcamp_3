import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import DropdownComponent from './components/DropdownComponent';
import ProfileImageScrollComponent from './components/ProfileImageScrollComponent';
import whenIcon from './assets/images/when.png';
import peopleIcon from './assets/images/people.png';
import durationIcon from './assets/images/duration.png';
import budgetIcon from './assets/images/budget.png';
import typeIcon from './assets/images/type.png';
import backGroundImage from './assets/images/background.png';

const App = () => {
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
            containerStyle={[styles.pickerContainerWhen, styles.shadowWhen]}
            pickerStyle={styles.pickerStyleWhen}
            imageIcon={whenIcon}
          />

          <View style={[styles.peopleContainer, styles.shadowPeople]}>
            <DropdownComponent
              label="People"
              data={people}
              value={peopleCount.toString()}
              onChange={item => {
                const newPeopleCount = parseInt(item.value);
                setPeopleCount(newPeopleCount);
              }}
              containerStyle={styles.shadowPeople}
              pickerStyle={styles.pickerStylePeople}
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
            containerStyle={[
              styles.pickerContainerDuration,
              styles.shadowDuration,
            ]}
            pickerStyle={styles.pickerStyleDuration}
            imageIcon={durationIcon}
          />

          <DropdownComponent
            label="Budget"
            data={budgets}
            value={budget}
            onChange={item => setBudget(item.value)}
            containerStyle={[styles.pickerContainerBudget, styles.shadowBudget]}
            pickerStyle={styles.pickerStyleBudget}
            imageIcon={budgetIcon}
          />

          <DropdownComponent
            label="Type"
            data={types}
            value={type}
            onChange={item => setType(item.value)}
            containerStyle={[styles.pickerContainerType, styles.shadowType]}
            pickerStyle={styles.pickerStyleType}
            imageIcon={typeIcon}
          />

          <TouchableOpacity
            style={[styles.submitButton, styles.shadowSubmit]}
            onPress={() => {
              /* Handle submit */
            }}>
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
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  peopleContainer: {
    height: 229,
    backgroundColor: 'rgba(244, 100, 23, 0.71)',
    borderRadius: 35,
  },
  pickerContainerWhen: {
    backgroundColor: 'rgba(224, 45, 48, 0.68)',
  },
  shadowWhen: {
    shadowColor: 'rgba(224, 45, 48, 0.68)',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  pickerContainerDuration: {
    backgroundColor: 'rgba(255, 197, 6, 0.69)',
  },
  shadowDuration: {
    shadowColor: 'rgba(255, 197, 6, 0.69)',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  pickerContainerBudget: {
    backgroundColor: 'rgba(16, 242, 31, 0.55)', // Custom color for Budget
  },
  shadowBudget: {
    shadowColor: 'rgba(16, 242, 31, 0.8)',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  pickerContainerType: {
    backgroundColor: 'rgba(19, 45, 241, 0.8)', // Custom color for Type
  },
  shadowType: {
    shadowColor: 'rgba(19, 45, 241, 0.8)',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  pickerStyleWhen: {
    backgroundColor: 'rgba(196, 196, 196, 0.1)', // Custom color for When
  },
  pickerStylePeople: {
    backgroundColor: 'rgba(196, 196, 196, 0.1)', // Custom color for People
  },
  pickerStyleDuration: {
    backgroundColor: 'rgba(196, 196, 196, 0.1)', // Custom color for Duration
  },
  pickerStyleBudget: {
    backgroundColor: 'rgba(196, 196, 196, 0.1)', // Custom color for Budget
  },
  pickerStyleType: {
    backgroundColor: 'rgba(196, 196, 196, 0.1)', // Custom color for Type
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
    color: '#fff',
    fontSize: 16,
  },
  shadowPeople: {
    shadowColor: 'rgba(244, 100, 23, 0.8)',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
});

export default App;
