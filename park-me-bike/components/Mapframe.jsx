import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';// Import Map and Marker
import MapView, { Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { fetchParking } from '../utils/api';
import ParkingLots from './ParkingLots';

export default function Mapframe({locationParams, setLocationParams, currLocation}) {
    const [pointsOfInterest, setPointsOfInterest] = useState([])

  
    useEffect(() => {
      fetchParking(locationParams)
      .then(({features}) => {
            setPointsOfInterest([...features])
            console.log(locationParams, "locationParams")
        })
      .catch(err => console.log(err))

    }, [locationParams])

    // console.log(locationParams)

    if (locationParams.location != null) {
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.container}>
                    <MapView provider={PROVIDER_GOOGLE}
                        style={styles.mapStyle}
                        onRegionChangeComplete={(e)=>{
                            // console.log(e, "onregionchange")

                            setLocationParams({...locationParams, location: {latitude: e.latitude, longitude: e.longitude}})
                        }}
                        initialRegion={{
                            latitude: locationParams.location.latitude,
                            longitude: locationParams.location.longitude,
                            // latitudeDelta: 0.0922,
                            // longitudeDelta: 0.0421,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1

                        }}
                    >
                        <Marker
                            coordinate={{
                            latitude: currLocation.latitude,
                            longitude: currLocation.longitude,
                            }}
                            title={'Current Location'}
                            description={'Where you are at the moment.'}
                            pinColor='#000000'
                        />
                    {
                        pointsOfInterest.map(({properties, geometry}) => {
                             return <ParkingLots properties={properties} geometry={geometry} key={properties.id} />
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
