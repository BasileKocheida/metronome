import { StyleSheet, Text, View } from 'react-native';
import Range from './components/Range';
import { NativeBaseProvider, Button } from 'native-base';
import React, {useState, useRef, useEffect} from 'react';
import { Audio } from 'expo-av';

export default function App() {

  const [bpm, setBpm] = useState(70);
  // const [sound1, setSound] = useState("./assets/tink.mp3");
  // const sound = useRef(new Audio.Sound());

  // useEffect(() => {
  //   return () => sound.current.unloadAsync();
  // }, []);
  const [sound, setSound] = React.useState();
  const [playing, setPlaying] = React.useState(false);
  const [timer, setTimer] = React.useState(null);
  
  
  async function play() {
    
    if (playing) {
      clearInterval(timer)
    }
    setPlaying(true)
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
        require('./assets/tink.mp3'),
        {shouldPlay: true, volume:1, isLooping: false }
    );
    setSound(sound);

    console.log('Playing Sound');
    const status = await sound.getStatusAsync()
    console.log(status);
    let interval = setInterval(async() => {
      await sound.stopAsync(); 
      await sound.playAsync(); 
      console.log('boom');
    }, (60 / bpm) * 1000);
    setTimer(interval)

    // await sound.loadAsync(require('./assets/tink.mp3'));
  }

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text style= {{fontSize:50}}>{bpm}BPM</Text>
        <Range bpm={bpm} setBpm={setBpm}/>
        <Button onPress={() => play()}>Start</Button>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
