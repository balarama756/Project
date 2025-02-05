import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import Navigation from '@navigation/Navigation';
import { StyleSheet, StatusBar } from 'react-native';
import { Colors } from '@utils/Constants';
import { firebase } from './src/config/firebase';

const App = () => {
  console.log('App rendering - Start');
  console.log('Firebase apps:', firebase.apps.length);

  return (
    <NavigationContainer>
      <PaperProvider>
        <View style={styles.root}>
          <StatusBar 
            barStyle="dark-content" 
            backgroundColor={Colors.white}
          />
          <Navigation />
        </View>
      </PaperProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  }
});

export default App;