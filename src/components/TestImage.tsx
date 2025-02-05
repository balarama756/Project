import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const TestImage = () => {
  return (
    <View style={styles.container}>
      <Text>Testing Image:</Text>
      <Image
        source={require('../assets/images/splash_logo1.jpeg')}
        style={styles.image}
        resizeMode="contain"
        onError={(e) => console.log('Test Image Error:', e.nativeEvent.error)}
        onLoad={() => console.log('Test Image Loaded')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default TestImage; 