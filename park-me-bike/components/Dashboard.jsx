import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';// Import Map and Marker
import Mapframe from './Mapframe';
import * as Location from 'expo-location';
import Slider from '@react-native-community/slider'




export default function Dashboard() {
  const [locationParams, setLocationParams] = useState({
    currLocation: {},
    radius: 30,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

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
          setIsLoading(false)
        }
      })
      })
  }, []);

  if(isLoading){
    return(
      <Text>Loading</Text>
    )
  }

  if (locationParams.currLocation) {
    return (
      <>
      <View style={styles.parentContainer}>
      <Slider 
          style={styles.slider} 
          maximumValue={10} 
          minimumValue={1}
          minimumTrackTintColor='#ffffff'
          maximumTrackTintColor='#000000'
          step={1}
          // vertical={true} investigate
          onValueChange={(e)=>{
            setLocationParams({...locationParams, radius: e})
          }}
      />
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
  slider: {
    position: 'absolute',
    // transform: [{rotate: '90deg'}],
    top: 20,
    left: 0,
    zIndex: 3,
    width: '100%',
  }
});