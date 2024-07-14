import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const TripPlanner = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: 'data:image/png;base64,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',
          }}
          style={styles.flag}
        />
        <Text style={styles.title}>Brazil</Text>
        <Text style={styles.subtitle}>
          4 Days in July, 4 People, General budget, Healing type
        </Text>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -23.5505,
          longitude: -46.6333,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{latitude: -23.5505, longitude: -46.6333}}
          title={'São Paulo'}
          description={'Arrival point'}
        />
      </MapView>

      <View style={styles.itinerary}>
        <Text style={styles.dayTitle}>Day 1: Arrival in Rio de Janeiro</Text>
        <Text style={styles.activity}>
          Arrival at the airport followed by hotel check-in.
        </Text>
        <Text style={styles.activity}>
          Visit Copacabana Beach and Ipanema Beach.
        </Text>
        <Text style={styles.activity}>
          Enjoy local cuisine at Leftover Restaurant.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B3B98',
    padding: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  flag: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
  },
  map: {
    height: 200,
    marginVertical: 10,
  },
  itinerary: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  activity: {
    fontSize: 16,
    marginBottom: 3,
  },
});

export default TripPlanner;
