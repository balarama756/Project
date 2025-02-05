/**
 * @format
 */

import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';

// Configure Reanimated Logger
configureReanimatedLogger({
  level: ReanimatedLogLevel.error, // Only log errors
  strict: false, // Disable strict mode
});

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
