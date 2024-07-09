import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const PushNotificationsConfigs = {
  congigurations: () => {
    PushNotification.configure({
      onNotification: notification => {
        console.log('notification recivede', notification);
        const clicked = notification.userInteraction;
        if (clicked) {
          console.log('clicked');
          // RootNavigation.navigate('Notifications');
          // console.log('new on notification log', notification.data.type);
          // if (notification.data.type === 'apply_job') {
          //   const data = JSON.parse(notification.data.job_data);
          //   console.log('data', data.image);
          //   console.log('heretetetetetetert');
          //   RootNavigation.navigate('JobDetails', {
          //     img: data.image,
          //     name: data.title,
          //     date: moment(Date.now()).format('YYYY-MM-DD'),
          //     address: data.address,
          //     id: data.id,
          //     desc: data.description,
          //     status: 1,
          //   });
          //   //   RootNavigation.navigate('sendmessagechat', {
          //   //     userData: JSON.parse(notification.data.userData),
          // }
          // // } else if (notification.data.type === 'meeting') {
          // //   RootNavigation.navigate('Meetings', {tab: 0});
          // else {
          //   RootNavigation.navigate('TabNavigator', {tab: 1});
          //   //   RootNavigation.navigate('Meetings', {tab: 1});
          // }
        }
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      onAction: notification => {
        console.log('NOTIFICATION:', notification);
      },
      onRegistrationError: err => {},
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: false,
    });
  },
};
export default PushNotificationsConfigs;
