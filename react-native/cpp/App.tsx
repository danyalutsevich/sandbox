import React from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import SampleTurboModule from './specs/NativeSampleModule';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [value, setValue] = React.useState('');
  const [reversedValue, setReversedValue] = React.useState('');

  const onPress = () => {
    const reversed = SampleTurboModule.reverseString(value);
    setReversedValue(reversed);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <TextInput onChangeText={setValue} style={{ backgroundColor: '#f00' }} />

      <Text>{value}</Text>
      <TouchableOpacity
        onPress={onPress}
        style={{ margin: 16, padding: 16, backgroundColor: 'lightblue' }}
      >
        <Text>Reverse</Text>
      </TouchableOpacity>
      <Text>{reversedValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    flexDirection: 'column',
  },
});

export default App;
