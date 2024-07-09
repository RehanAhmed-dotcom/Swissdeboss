import {Alert, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Root from './src/navigation/Root';
import {Provider} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import Store from './src/ReduxToolkit/Store/Store';
import {PersistGate} from 'reduxjs-toolkit-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
const persistor = persistStore(Store);

const App = () => {
  const getToken = async () => {
    let fcmToken = await messaging().getToken();
    // console.log('i got fcm', fcmToken);
  };
  const getNotifications = async () => {
    await messaging().onNotificationOpenedApp(remoteMessage => {
      // setBadge(0);
    });
    await messaging()
      .getInitialNotification()
      .then(remoteMessage => {});
  };
  const _createChannel = () => {
    PushNotification.createChannel({
      channelId: 'fcm_fallback_notification_channel', // (required)
      channelName: 'fcm_fallback_notification_channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    });
  };
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    } else {
      Alert.alert(
        'Push Notification Permission',
        'Push notifications are disabled.',
      );
    }
  };
  useEffect(() => {
    getToken();
    getNotifications();
    requestUserPermission();
    Platform.OS == 'android' && _createChannel();
    const unsubscribe = messaging().onMessage(remoteMessage => {
      // console.log('remoteMessage in app', remoteMessage.data.type);
      Platform.OS === 'ios' &&
        PushNotificationIOS.addNotificationRequest({
          id: new Date().toString(),
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body,
          category: 'userAction',
          userInfo: remoteMessage.data,
        });
      // Platform.OS === 'ios' &&
      //   PushNotificationIOS.setApplicationIconBadgeNumber(1);
    });
    return unsubscribe;
  }, []);

  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
