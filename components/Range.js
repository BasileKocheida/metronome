import { StyleSheet, Text, View } from 'react-native';
import { Slider, Box } from 'native-base';

const Range = (props) => {
  return <Box alignItems="center" w="100%">
      <Slider 
        w="3/4"
        maxW="300"
        defaultValue={props.bpm}
        minValue={40}
        maxValue={200}
        accessibilityLabel="hello world"
        step={5}
        onChange={(value) => {props.setBpm(value)}}
      >
        <Slider.Track>
          <Slider.FilledTrack />
        </Slider.Track>
        <Slider.Thumb />
      </Slider>
    </Box>;
};

export default Range;