import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';// Import Map and Marker
import Mapframe from './Mapframe';
import * as Location from 'expo-location';


export default function Dashboard() {
  const [locationParams, setLocationParams] = useState({
    currLocation: {},
    radius: 30,
  });
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
      Location.requestForegroundPermissionsAsync()
      .then(({status}) => {
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
      })
      .then(() => {
        (Location.getCurrentPositionAsync({}))
      .then((location) => {
        if(location == null) {
          fusedLocationProviderClient.requestLocationUpdates(locationRequest, locationCallback, Looper.getMainLooper())
        } else {
          setLocationParams({   
            ...locationParams, 
            currLocation: {latitude: location.coords.latitude, longitude: location.coords.longitude}, 
          });
        }
      })
      })
  }, []);

  if (locationParams.currLocation) {
    return (
      <>
      <View style={styles.parentContainer}>
        <Mapframe locationParams={locationParams} />
      </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  parentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});