import { StyleSheet, View, Text, Pressable, Button } from 'react-native';
import { Slider, Icon, CheckBox } from '@rneui/themed';
import { color } from 'react-native-reanimated';
import {Audio} from 'expo-av'
import {useState, useEffect} from 'react'

const ControlPanel = ({
  setLocationParams,
  locationParams,
  parkingLimit,
  setParkingLimit,
  setModalVisible,
  showTraffic,
  setShowTraffic,
  showRoute,
  setShowRoute,
  ratchetBellSound
}) => {
  const [pingBellSound, setPingBellSound] = useState();

  async function playPingBell(){
    console.log('Loading sound');
    const {pingBellSound} = await Audio.Sound.createAsync(require('../assets/bellping.mp3'), 
    {shouldPlay: true}
    );
    setPingBellSound(pingBellSound);
  }

  useEffect(()=>{
    return ratchetBellSound
    ? () => {
      console.log('unloading sound')
      sound.unloadAsync()
    }
    : undefined;
  }, [pingBellSound])
  return (
    <>
      <View style={styles.sliderWrapper}>
        <Text style={styles.heading}>Radius</Text>
        <Slider
          style={styles.radiusSlider}
          value={locationParams.radius}
          maximumValue={100}
          minimumValue={1}
          minimumTrackTintColor="#ffffff"
          maximumTrackTintColor="#000000"
          step={1}
          // allowTouchTrack
          trackStyle={{ height: 5, backgroundColor: 'transparent' }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
          thumbProps={{
            children: (
              <Icon
                name="bicycle"
                type="font-awesome"
                size={20}
                reverse
                containerStyle={{ bottom: 20, right: 20 }}
              />
            ),
          }}
          onSlidingComplete={(e) => {
            setLocationParams({ ...locationParams, radius: e });
          }}
        />
        <Text style={styles.label}>{locationParams.radius} km</Text>
        <Text style={styles.heading}>Bike Parks</Text>
        <Slider
          style={styles.limitSlider}
          value={parkingLimit}
          maximumValue={10}
          minimumValue={1}
          minimumTrackTintColor="#ffffff"
          maximumTrackTintColor="#000000"
          step={1}
          allowTouchTrack
          trackStyle={{ height: 5, backgroundColor: 'transparent' }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
          thumbProps={{
            children: (
              <Icon
                name="bicycle"
                type="font-awesome"
                size={20}
                reverse
                containerStyle={{ bottom: 20, right: 20 }}
              />
            ),
          }}
          onSlidingComplete={(e) => {
            setParkingLimit(e);
          }}
        />
        <Text style={styles.label}>{parkingLimit} bike parks</Text>
        <View style={styles.checkBoxStyle}>
        <CheckBox
          title="show route"
          checked={showRoute}
          onPress={() => setShowRoute(!showRoute)}
        />
        <CheckBox
          title="show traffic"
          checked={showTraffic}
          onPress={() => setShowTraffic(!showTraffic)}
        />
        </View>
        <Button
          title="close"
          onPress={() => {
            setModalVisible(false);
            playPingBell()
          }}
        >
          Close
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sliderWrapper: {
    position: 'absolute',
    paddingHorizontal: 20,
    bottom: 50,
    zIndex: 3,
    width: '100%',
    height: 380,
    backgroundColor: '#000000c0',
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
  },
  radiusSlider: {
    // position: 'relative',
    // top: 20,
    zIndex: 3,
    width: '100%',
  },
  limitSlider: {
    // position: 'relative',
    // top: 70,
    zIndex: 3,
    width: '100%',
  },
  label: {
    color: 'white',
    top: 5,
    bottom: 10
  },
  heading: {
    padding: 10,
    color: 'white',
    fontSize: 20,
  },
  checkBoxStyle: {
    top: 10,
    bottom: 10,
  }
});

export default ControlPanel;
