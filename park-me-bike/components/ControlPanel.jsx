import {StyleSheet} from 'react-native'
import Slider from '@react-native-community/slider'

const ControlPanel = ({setLocationParams, locationParams})=>{
    return (
        <>
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
    </>
    )
}

const styles = StyleSheet.create({
    slider: {
        position: 'absolute',
        // transform: [{rotate: '90deg'}],
        top: 20,
        left: 0,
        zIndex: 3,
        width: '100%',
      }
})

export default ControlPanel;