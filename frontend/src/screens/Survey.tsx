import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const App = () => {
  const [month, setMonth] = useState<string>('July');
  const [peopleCount, setPeopleCount] = useState<number>(1);
  const [duration, setDuration] = useState<string>('4 Days');
  const [budget, setBudget] = useState<string>('General');
  const [type, setType] = useState<string>('Healing');

  const peopleArray = Array.from({length: peopleCount}, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>At least, I want ...</Text>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>When</Text>
        <Picker
          selectedValue={month}
          style={styles.picker}
          onValueChange={itemValue => setMonth(itemValue)}>
          <Picker.Item label="July" value="July" />
          <Picker.Item label="August" value="August" />
          {/* Add more months as needed */}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>People</Text>
        <Picker
          selectedValue={peopleCount.toString()}
          style={styles.picker}
          onValueChange={itemValue => setPeopleCount(parseInt(itemValue))}>
          {[1, 2, 3, 4, 5, 6].map(num => (
            <Picker.Item
              key={num}
              label={num.toString()}
              value={num.toString()}
            />
          ))}
        </Picker>
        <ScrollView horizontal>
          {peopleArray.map((_, index) => (
            <Image
              key={index}
              style={styles.profileImage}
              source={{uri: 'https://via.placeholder.com/50'}} // Replace with actual profile images
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Duration</Text>
        <Picker
          selectedValue={duration}
          style={styles.picker}
          onValueChange={itemValue => setDuration(itemValue)}>
          <Picker.Item label="4 Days" value="4 Days" />
          <Picker.Item label="7 Days" value="7 Days" />
          {/* Add more durations as needed */}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Budget</Text>
        <Picker
          selectedValue={budget}
          style={styles.picker}
          onValueChange={itemValue => setBudget(itemValue)}>
          <Picker.Item label="General" value="General" />
          <Picker.Item label="Premium" value="Premium" />
          {/* Add more budgets as needed */}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Type</Text>
        <Picker
          selectedValue={type}
          style={styles.picker}
          onValueChange={itemValue => setType(itemValue)}>
          <Picker.Item label="Healing" value="Healing" />
          <Picker.Item label="Adventure" value="Adventure" />
          {/* Add more types as needed */}
        </Picker>
      </View>

      <Button
        title="Submit"
        onPress={() => {
          /* Handle submit */
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#282c34',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 16,
  },
  pickerContainer: {
    backgroundColor: '#444',
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
  },
  label: {
    color: '#fff',
    marginBottom: 8,
  },
  picker: {
    color: '#fff',
    backgroundColor: '#666',
    borderRadius: 8,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 4,
  },
});

export default App;
