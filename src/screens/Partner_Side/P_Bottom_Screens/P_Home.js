import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Colors, fonts, icons, images} from '../../../constant/Index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from '../../../components/Button';
import SplashScreen from 'react-native-splash-screen';
import {useFocusEffect} from '@react-navigation/native';
import {AllGetAPI, PostAPiwithToken} from '../../../components/Apis/Api_Screen';
import {useSelector} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const P_Home = ({navigation}) => {
  const user = useSelector(state => state?.user?.user);
  console.log('user on p home.............................', user);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const [appointmentStatus, setappointmentStatus] = useState([]);
  const _FetchAppointmentsAPi = () => {
    // setIsLoading(true);
    // const formdata = new FormData();

    AllGetAPI({url: 'home', Token: user?.api_token})
      .then(res => {
        // setIsLoading(false);
        setappointmentStatus(res);
        console.log('Appointment Data=================', res);
      })
      .catch(err => {
        // setIsLoading(false);

        console.log('api error', err);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      _FetchAppointmentsAPi();
    }, []),
  );

  const _FcmTokenAPi = token => {
    // setIsLoading(true);
    const formdata = new FormData();
    formdata.append('fcm_token', token);

    PostAPiwithToken({url: 'update-fcm', Token: user?.api_token}, formdata)
      .then(res => {
        if (res.status == 'success') {
          // setIsLoading(false);
          // navigation.navigate('Bottomtab');

          // ToastAndroid.show(res.message, ToastAndroid.SHORT);
          console.log('Token Update', res);
        }
        // console.log('Token Update', res);
      })
      .catch(err => {
        // setIsLoading(false);

        console.log('api error', err);
      });
  };
  const getdevicetoken = async () => {
    let token = await messaging().getToken();
    _FcmTokenAPi(token);
    console.log(
      'Token---------------------------------------------------------',
      token,
    );
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {});
    return unsubscribe;
  }, []);

  const getNotifications = async () => {
    await messaging().onNotificationOpenedApp(remoteMessage => {
      // console.log(
      //   'Notification caused app to open from background state:',
      //   remoteMessage.notification,
      // );
    });
    await messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        // console.log('00000000000000000000000000>>>>>>>>>>>', remoteMessage);
      });
  };

  const _createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'fcm_fallback_notification_channel',
        channelName: 'fcm_fallback_notification_channel',
        channelDescription: 'A channel to categorise your notifications',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      created => console.log('created channel', created),
    );
  };

  useEffect(() => {
    getNotifications();
    _createChannel();
  }, []);
  useEffect(() => {
    getdevicetoken();
  }, []);
  const {top} = useSafeAreaInsets();
  return (
    <View style={{flex: 1, backgroundColor: Colors.bback}}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />

      <View
        style={{
          flex: 1,
          marginTop: Platform.OS == 'ios' ? top : StatusBar.currentHeight,
        }}>
        <ScrollView>
          <ImageBackground source={images.profileback} style={styles.backimage}>
            <Text style={styles.headerText}>Home</Text>
          </ImageBackground>

          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.box}
              onPress={() => {
                navigation.navigate('Services_Detail');
              }}>
              <View>
                <Text style={styles.order}>
                  {appointmentStatus.pending_appointments}
                </Text>
                <Text style={styles.condition}>New{'\n'}Appointments</Text>
              </View>
              <View style={styles.circle}>
                <Image
                  source={icons.schedule}
                  resizeMode="contain"
                  style={styles.schedule}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.box}
              onPress={() => {
                navigation.navigate('Accepted_Detail');
              }}>
              <View>
                <Text style={styles.order}>
                  {' '}
                  {appointmentStatus.active_appointments}
                </Text>
                <Text style={styles.condition}>Accepted{'\n'}Appointments</Text>
              </View>
              <View style={styles.circle}>
                <Image
                  source={icons.schedule}
                  resizeMode="contain"
                  style={styles.schedule}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.box}
              onPress={() => {
                navigation.navigate('Cancelled_Detail');
              }}>
              <View>
                <Text style={styles.order}>
                  {' '}
                  {appointmentStatus.canceled_appointments}
                </Text>
                <Text style={styles.condition}>
                  Cancelled{'\n'}Appointments
                </Text>
              </View>
              <View style={styles.circle}>
                <Image
                  source={icons.schedule}
                  resizeMode="contain"
                  style={styles.schedule}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.box}
              onPress={() => {
                navigation.navigate('Completed_Detail');
              }}>
              <View>
                <Text style={styles.order}>
                  {' '}
                  {appointmentStatus.completed_appointments}
                </Text>
                <Text style={styles.condition}>
                  Completed{'\n'}Appointments
                </Text>
              </View>
              <View style={styles.circle}>
                <Image
                  source={icons.schedule}
                  resizeMode="contain"
                  style={styles.schedule}
                />
              </View>
            </TouchableOpacity>
          </View>
          <Image
            source={images.repair}
            resizeMode="contain"
            style={styles.repair}
          />
          <View style={{marginBottom: wp(20)}}></View>
        </ScrollView>
      </View>
    </View>
  );
};

export default P_Home;

const styles = StyleSheet.create({
  headerText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: fonts.BOLD,
    textAlign: 'center',
    marginTop: wp(4),
  },
  box: {
    width: wp(42.3),
    height: wp(30),
    backgroundColor: Colors.white,

    marginVertical: wp(2.5),
    elevation: 2,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    alignItems: 'center',
    paddingVertical: wp(2),
  },
  order: {
    color: Colors.blue,
    fontSize: 16,
    fontFamily: fonts.BOLD,
  },
  condition: {
    color: '#6C757D',
    fontSize: 14,
    fontFamily: fonts.REGULAR,
    marginTop: wp(4),
  },
  circle: {
    width: wp(12),
    height: wp(12),
    backgroundColor: '#F6F7F9',
    borderRadius: 100,
    marginBottom: wp(9),
    justifyContent: 'center',
    alignItems: 'center',
  },
  schedule: {
    width: wp(7),
    height: wp(7),
  },
  repair: {
    width: wp(70),
    height: wp(60),
    alignSelf: 'center',
    marginTop: wp(10),
  },
  backimage: {
    width: wp(100),
    height: wp(40),
    // backgroundColor: 'red',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
  },
});
