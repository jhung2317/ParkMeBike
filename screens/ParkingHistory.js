import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { db, collection, getDocs } from '../config/firebase';
import { getAuth } from 'firebase/auth';
import * as Location from 'expo-location';
import { ThemeContext } from '../providers/ThemeProvider';
import { orderBy } from 'firebase/firestore';

export const ParkingHistory = () => {
  const [parkingSpots, setParkingSpots] = useState([]);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const auth = getAuth();
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  useEffect(() => {
    if (!userId) {
      return;
    }

    const collectionRef = collection(db, `users/${userId}/parkingHistory`);

    getDocs(collectionRef)
      .then((querySnapshot) => {
        const spots = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        return spots;
      })
      .then(async (spots) => {
        for (let spot of spots) {
          const address = await Location.reverseGeocodeAsync({
            latitude: spot.latitude,
            longitude: spot.longitude,
          });
          spot.address = `${address[0].street}, ${address[0].city}, ${address[0].postalCode}`;
        }
        setParkingSpots(spots);
      })
      .catch((error) => {
        console.log('Error retrieving parking spots:', error);
      });
  }, [userId]);

  return (
    <View style={{ ...styles.container, backgroundColor: theme.background }}>
      {parkingSpots.map((spot) => (
        <View key={spot.id} style={styles.spotContainer}>
          <Text>{spot.address}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  spotContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});

export default ParkingHistory;
