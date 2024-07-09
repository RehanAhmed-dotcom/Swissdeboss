/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotificationsConfigs from './src/Config/PushNotificationsConfigs';
import PushNotification from 'react-native-push-notification';
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background! inside index', remoteMessage);
  PushNotification.localNotification(remoteMessage);
});
PushNotificationsConfigs.congigurations();

AppRegistry.registerComponent(appName, () => App);
