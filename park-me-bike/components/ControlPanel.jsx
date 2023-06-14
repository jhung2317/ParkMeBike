import {StyleSheet, View, Text} from 'react-native'
import Slider from '@react-native-community/slider'

const ControlPanel = ({setLocationParams, locationParams, setParkingLimit})=>{
    return (
        <>
        <View style={styles.sliderWrapper}>
        <Text>Top Slider changes the radius, the second one changes the limit</Text>
        <Slider 
        style={styles.slider} 
        value={10}
        maximumValue={100} 
        minimumValue={1}
        minimumTrackTintColor='#ffffff'
        maximumTrackTintColor='#000000'
        step={1}
        onSlidingComplete={(e)=>{
          setLocationParams({...locationParams, radius: e})
        }}
    />
      <Slider
        style={styles.slider} 
        value={1}
        maximumValue={10} 
        minimumValue={1}
        minimumTrackTintColor='#ffffff'
        maximumTrackTintColor='#000000'
        step={1}
        onSlidingComplete={(e)=>{
            console.log(e)
          setParkingLimit(e)
        }}
    />
    </View>
    </>
    )
}

const styles = StyleSheet.create({
    sliderWrapper: {
        position: 'absolute',
        // transform: [{rotate: '90deg'}],
        top: 20,
        left: 0,
        zIndex: 3,
        width: '100%',
      }
    
})

export default ControlPanel;