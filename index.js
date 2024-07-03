/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  //   console.log('inbackground', remoteMessage);
});
messaging().getInitialNotification(async remoteMessage => {
  console.log('kill', remoteMessage);
});

messaging().onMessage(async remoteMessage => {
  console.log('Foreground Notification Received:', remoteMessage);
  // Handle the notification data here
});

AppRegistry.registerComponent(appName, () => App);
