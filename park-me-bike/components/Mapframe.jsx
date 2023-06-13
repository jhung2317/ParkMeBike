import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';// Import Map and Marker
import MapView, { Marker } from 'react-native-maps';
// import { getExampleDataFromCS } from '../utils/fetchData'
// import ParkingLots from './ParkingLots';

export default function MapFrame({locationParams}) {
    const [pointsOfInterest, setPointsOfInterest] = useState([])
    const combinedDependency = [locationParams.currLocation || locationParams.radius]
  
    // useEffect(() => {
    //   getExampleDataFromCS(locationParams)
    //   .then(({features}) => {
    //         setPointsOfInterest([...features])
    //     })
    //   .catch(err => console.log(err))
    // }, combinedDependency)

    if (locationParams.currLocation != null) {
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                    <MapView
                        style={styles.mapStyle}
                        initialRegion={{
                            latitude: locationParams.currLocation.latitude,
                            longitude: locationParams.currLocation.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={{
                            latitude: locationParams.currLocation.latitude,
                            longitude: locationParams.currLocation.longitude,
                            }}
                            title={'Current Location'}
                            description={'Where you are at the moment.'}
                        />
                    {
                        pointsOfInterest.map(({properties, geometry}) => {
                            console.log(geometry)
                            // return <ParkingLots properties={properties} geometry={geometry} key={properties.id} />
                        })
                    }
                    </MapView>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        justifyContent: 'flex-end',
      },
    mapStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1
    }
})
