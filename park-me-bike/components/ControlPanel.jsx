import {StyleSheet, View, Text} from 'react-native'
// import Slider from '@react-native-community/slider'
import { Slider } from '@rneui/themed';



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
        orientation='vertical'
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
        // orientation='vertical'
        step={1}
        onSlidingComplete={(e)=>{
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
        top: 20,
        left: 50,
        zIndex: 3,
        width: '100%',
      }
    
})

export default ControlPanel;