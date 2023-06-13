import { Marker } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';// Import Map and Marker

export default function ParkingLots({properties, geometry}) {
    return (
        <>
            <Marker
                coordinate={{
                    latitude: geometry.coordinates[1],
                    longitude: geometry.coordinates[0]
                }}
                title={properties.name}
                description={properties.name}
            />
        </>
    )
}