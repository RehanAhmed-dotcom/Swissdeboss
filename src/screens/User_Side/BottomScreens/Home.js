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
  ToastAndroid,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Colors, fonts, icons, images} from '../../../constant/Index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Button from '../../../components/Button';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {useFocusEffect} from '@react-navigation/native';
import {AllGetAPI, PostAPiwithToken} from '../../../components/Apis/Api_Screen';
import Loader from '../../../components/Loader';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const Home = ({navigation}) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const user = useSelector(state => state?.user?.user);
  // console.log('user on home', user);

  const data = [
    {
      key: '1',
      type: 'Paintless dent removal',
      des: 'On sait depuis longtemps que travailler avec du texte lisible et contenant du sens',
      image: images.clean1,
    },
    {
      key: '2',
      type: 'Windshield replacement',
      des: 'On sait depuis longtemps que travailler avec du texte lisible et contenant du sens',
      image: images.clean2,
    },
    {
      key: '3',
      type: 'Hail scanner',
      des: 'On sait depuis longtemps que travailler avec du texte lisible et contenant du sens',
      image: images.clean3,
    },
    {
      key: '4',
      type: 'Car cleaning',
      des: 'On sait depuis longtemps que travailler avec du texte lisible et contenant du sens',
      image: images.clean4,
    },
  ];
  const [IsLoading, setIsLoading] = useState(false);
  const [Categories, setCategories] = useState([]);
  // console.log('Categories', Categories);
  const fetchCategoriesData = () => {
    setIsLoading(true);
    // const formdata = new FormData();

    PostAPiwithToken({url: 'packagecategory', Token: user?.api_token})
      .then(res => {
        setIsLoading(false);
        setCategories(res.categoryes);
        // console.log('Categories Data=================', res.categoryes);
      })
      .catch(err => {
        setIsLoading(false);

        console.log('api error', err);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchCategoriesData();
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
        } else {
          // setIsLoading(false);
          ToastAndroid.show(res.message, ToastAndroid.SHORT);
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
  const Wrapper = Platform.OS == 'ios' ? KeyboardAvoidingView : View;
  return (
    <View style={{flex: 1, backgroundColor: Colors.bback}}>
      <StatusBar translucent={true} />
      {IsLoading && <Loader />}
      <View
        style={{
          flex: 1,
          marginTop: Platform.OS == 'ios' ? top : StatusBar.currentHeight,
        }}>
        <Wrapper behavior="padding">
          <ScrollView>
            <ImageBackground
              source={images.profileback}
              style={styles.backimage}>
              <Text style={styles.headerText}>Home</Text>

              <View style={styles.row}>
                <View style={styles.searchContainer}>
                  <EvilIcons name="search" color={Colors.lightgray} size={22} />
                  <TextInput
                    placeholder="Search"
                    placeholderTextColor={Colors.lightgray}
                    style={styles.search}
                  />
                </View>
              </View>
            </ImageBackground>

            <Text style={styles.welcometext}>
              Welcome back, {user.username}!
            </Text>
            <Text style={styles.heading}>Categories</Text>

            {/* <View style={styles.recent_row}> */}
            <FlatList
              data={Categories}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.key}
              renderItem={({item, index}) => (
                <View
                  style={{
                    alignItems: 'center',
                    marginLeft: index === 0 ? wp(5) : wp(3),
                    marginRight: wp(2),
                  }}>
                  <TouchableOpacity
                    style={styles.box}
                    onPress={() => {
                      navigation.navigate('Packages', {item});
                    }}>
                    <Image
                      resizeMode="contain"
                      source={{uri: item.image}}
                      style={styles.services}
                    />
                  </TouchableOpacity>
                  <Text style={styles.serviceText}>{item.name}</Text>
                </View>
              )}
              contentContainerStyle={styles.recent_row}
            />
            {/* </View> */}

            <View style={styles.main_row}>
              <Text style={[styles.heading, {marginLeft: 0, marginTop: 0}]}>
                Main Services
              </Text>
              <TouchableOpacity>
                <Text style={styles.see}>See all</Text>
              </TouchableOpacity>
            </View>

            <View style={{paddingLeft: wp(2.5)}}>
              <FlatList
                data={data}
                showsHorizontalScrollIndicator={false}
                numColumns={2}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity activeOpacity={0.9}>
                      <ImageBackground
                        source={item.image}
                        borderRadius={12}
                        // resizeMode="contain"
                        style={styles.main_flat}>
                        <View style={styles.flat_view}>
                          <Text numberOfLines={1} style={styles.type}>
                            {item.type}
                          </Text>
                          <Text style={styles.des} numberOfLines={2}>
                            {item.des}
                          </Text>
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            <View style={{marginBottom: wp(22)}}></View>
          </ScrollView>
        </Wrapper>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: fonts.BOLD,
    textAlign: 'center',
    marginTop: wp(4),
  },
  row: {
    width: wp(90),
    alignSelf: 'center',
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: wp(6),
  },
  search: {
    fontFamily: fonts.REGULAR,
    color: Colors.black,
    flex: 1,
  },
  bucket: {
    width: wp(10),
    height: wp(10),
    resizeMode: 'contain',
  },
  searchContainer: {
    width: wp(90),
    height: wp(10),
    borderWidth: 0.5,
    borderRadius: 100,
    paddingHorizontal: wp(2),
    borderColor: '#F2F2F2',
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcometext: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: fonts.BOLD,
    marginLeft: wp(5),
    marginTop: wp(0),
  },
  heading: {
    color: Colors.wild,
    fontSize: 16,
    fontFamily: fonts.BOLD,
    marginLeft: wp(5),
    marginTop: wp(6),
  },
  recent_row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: wp(4),
  },
  box: {
    width: wp(27),
    height: wp(27),
    backgroundColor: Colors.white,
    elevation: 2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  services: {
    width: wp(20),
    height: wp(20),
    resizeMode: 'contain',
  },
  serviceText: {
    color: Colors.wild,
    fontSize: 14,
    fontFamily: fonts.REGULAR,
    marginTop: wp(2),
  },
  main_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    marginTop: wp(8),
  },
  see: {
    color: Colors.wild,
    fontSize: 12,
    fontFamily: fonts.REGULAR,
  },
  main_flat: {
    width: wp(43.3),
    height: wp(43),
    marginHorizontal: wp(2.5),
    // resizeMode: 'contain',
    justifyContent: 'flex-end',
    marginTop: wp(4),
    marginBottom: wp(1),
  },
  flat_view: {
    width: wp(43.3),
    height: wp(15),
    backgroundColor: '#fff',
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
    paddingHorizontal: wp(3),
    paddingVertical: wp(1),
    elevation: 2,
  },
  type: {
    fontSize: 12,
    color: Colors.black,
    fontFamily: fonts.BOLD,
  },
  des: {
    fontSize: 10,
    color: Colors.black,
    fontFamily: fonts.REGULAR,
    marginTop: wp(1.5),
  },
  bestservice_box: {
    width: wp(90),
    height: wp(25),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(2),

    backgroundColor: Colors.white,
    elevation: 2,
    marginHorizontal: wp(2.5),
    marginBottom: wp(2),
    borderRadius: 12,
  },
  best_image: {
    width: wp(21),
    height: wp(21),
    borderRadius: 10,
    borderWidth: 0.7,
    borderColor: Colors.purple,
  },
  best_row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(50),
  },
  bestsellername: {
    fontSize: 14,
    color: '#424242',
    fontFamily: fonts.BOLD,
  },
  bestsellerdes: {
    fontSize: 10,
    color: Colors.gray,
    fontFamily: fonts.REGULAR,
    marginTop: wp(2),
  },
  price_text: {
    fontSize: 12,
    color: Colors.purple,
    fontFamily: fonts.BOLD,
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    color: Colors.purple,
    fontFamily: fonts.EXTRABOLD,
    textAlign: 'center',
    marginTop: wp(2),
  },
  appoinmet_SHeet: {
    flex: 1,
  },
  schedule: {
    color: Colors.header,
    fontSize: 18,
    fontFamily: fonts.BOLD,
    textAlign: 'center',
    marginTop: wp(6),
  },
  watch: {
    width: wp(30),
    height: wp(30),
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: wp(8),
  },

  backimage: {
    width: wp(100),
    height: wp(50),
    // backgroundColor: 'red',
  },
});
