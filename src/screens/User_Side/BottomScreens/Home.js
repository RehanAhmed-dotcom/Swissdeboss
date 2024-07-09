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
import {useDispatch, useSelector} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {useFocusEffect} from '@react-navigation/native';
import {AllGetAPI, PostAPiwithToken} from '../../../components/Apis/Api_Screen';
import Loader from '../../../components/Loader';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {useTranslation} from 'react-i18next';
import {add_language} from '../../../ReduxToolkit/LanguagesSlice';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';

const Home = ({navigation}) => {
  const refRBSheet = useRef();
  const thankyouSheet = useRef();
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [SelectedDate, setSelectedDate] = useState('');
  const [SelectedTime, setSelectedTime] = useState('');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [address, setaddress] = useState('');
  const [note, setnote] = useState('');
  const [CarsNo, setCarsNo] = useState('');

  const [Images, setImages] = useState([]);

  const selectMultipleImages = async () => {
    try {
      const results = await ImagePicker.openPicker({
        multiple: true,
        mediaType: 'photo',
      });

      if (results.length > 0) {
        setImages(results.map(image => ({uri: image.path})));
      }
    } catch (error) {
      console.log('Error selecting images:', error);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setSelectedDate(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = date => {
    setSelectedTime(moment(date).format('HH:mm'));
    hideTimePicker();
  };

  const _Validate = () => {
    if (
      !SelectedDate ||
      !SelectedTime ||
      !note ||
      !address ||
      !CarsNo ||
      Images.length === 0
    ) {
      return false;
    }
    return true;
  };

  const language = useSelector(state => state.language.value);
  console.log('language------', language);
  const dispatch = useDispatch();
  useEffect(() => {
    if (language === 'fr') {
      dispatch(add_language(language));
    } else if (language === 'en') {
      dispatch(add_language(language));
    } else if (language === 'it') {
      dispatch(add_language(language));
    } else if (language === 'de') {
      dispatch(add_language(language));
    }
  }, [language, dispatch]);
  const {t} = useTranslation();
  const user = useSelector(state => state?.user?.user);
  // console.log('user on home', user);

  const [IsLoading, setIsLoading] = useState(false);
  const [Categories, setCategories] = useState([]);
  // console.log('Categories', Categories[0].id);
  const fetchCategoriesData = () => {
    setIsLoading(true);
    // const formdata = new FormData();

    PostAPiwithToken({url: 'packagecategory', Token: user?.api_token})
      .then(res => {
        setIsLoading(false);
        setCategories(res.categoryes);
        console.log('Categories Data=================', res.categoryes);
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
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Platform.OS === 'ios' &&
        PushNotificationIOS.addNotificationRequest({
          id: new Date().toString(),
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body,
          category: 'userAction',
          userInfo: remoteMessage.data,
        });
    });
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
  const minimumSelectableDate = moment().add(4, 'days').toDate();

  const _AddNewAppointmentAPi = () => {
    setIsLoading(true);

    const formdata = new FormData();

    formdata.append('cat_id', Categories[0].id);
    formdata.append('time', SelectedTime);
    formdata.append('date', SelectedDate);
    formdata.append('address', address);
    formdata.append('description', note);
    formdata.append('no_of_cars', CarsNo);

    Images.forEach((image, index) => {
      formdata.append('images[]', {
        uri: image.uri,
        type: 'image/jpeg',
        name: `image${index}.jpg`,
      });
    });

    PostAPiwithToken({url: 'addappointment', Token: user.api_token}, formdata)
      .then(res => {
        // console.log('res', res);
        if (res.status == 'success') {
          setIsLoading(false);

          // thankyouSheet.current.open();
          // refRBSheet.current.close();
          refRBSheet.current.close();

          ToastAndroid.show('Data Updated Successfully!', ToastAndroid.SHORT);
          // navigation.navigate('Bottom_Nav');
          console.log('res of editprofile ', res);
        } else {
          setIsLoading(false);
          ToastAndroid.show('Errorr in Data Updating!', ToastAndroid.SHORT);
        }
        console.log('res of addappointment ', res);
      })
      .catch(err => {
        setIsLoading(false);

        console.log('api error', err);
      });
  };

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
              <Text style={styles.headerText}>{t('Home')}</Text>

              <View style={styles.row}>
                <View style={styles.searchContainer}>
                  <EvilIcons name="search" color={Colors.lightgray} size={22} />
                  <TextInput
                    placeholder={t('Search')}
                    placeholderTextColor={Colors.lightgray}
                    style={styles.search}
                  />
                </View>
              </View>
            </ImageBackground>

            <Text style={styles.welcometext}>
              {t('WelcomeBack')}, {user.username}!
            </Text>
            <Text style={styles.heading}>{t('main')}</Text>

            <FlatList
              data={Categories}
              keyExtractor={item => item.key}
              renderItem={({item, index}) => (
                <View style={{alignItems: 'center', marginVertical: wp(2)}}>
                  <TouchableOpacity
                    style={styles.box}
                    onPress={() => {
                      // navigation.navigate('Packages', {item});
                      refRBSheet.current.open();
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
              // contentContainerStyle={styles.recent_row}
            />

            <View style={{marginBottom: wp(22)}}></View>
          </ScrollView>
        </Wrapper>
      </View>
      <RBSheet
        draggable={true}
        // dragOnContent
        ref={refRBSheet}
        height={wp(175)}
        openDuration={250}
        customStyles={{
          container: {
            backgroundColor: '#F7F4F2',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
        }}>
        <ScrollView>
          <Text style={styles.schedule}>{t('Scheduling')}</Text>
          <Image source={images.watch} style={styles.watch} />
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.sheet_box}
            onPress={() => {
              showDatePicker();
            }}>
            <Image
              resizeMode="contain"
              source={icons.calender}
              style={styles.icons}
            />
            <Text style={styles.select}>
              {SelectedDate
                ? moment(SelectedDate).format('YYYY-MM-DD')
                : t('selectdate')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.sheet_box}
            onPress={() => {
              showTimePicker();
            }}>
            <Image
              resizeMode="contain"
              source={icons.clock}
              style={styles.icons}
            />
            <Text style={styles.select}>
              {SelectedTime
                ? moment(SelectedTime, 'HH:mm').format('HH:mm')
                : t('SelectTime')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9} style={styles.sheet_box}>
            <Image
              resizeMode="contain"
              source={icons.add}
              style={styles.icons}
            />
            <TextInput
              placeholder={t('AddAddress')}
              placeholderTextColor="#9A9A9A"
              style={styles.addaddressinput}
              value={address}
              onChangeText={text => {
                setaddress(text);
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9} style={styles.sheet_box}>
            <Image
              resizeMode="contain"
              source={icons.carsno}
              style={[styles.icons, {tintColor: Colors.gray}]}
            />
            <TextInput
              placeholder={t('noofcars')}
              placeholderTextColor="#9A9A9A"
              style={styles.addaddressinput}
              value={CarsNo}
              onChangeText={text => {
                setCarsNo(text);
              }}
            />
          </TouchableOpacity>

          <View activeOpacity={0.9} style={styles.sheet_inputbox}>
            <Image
              resizeMode="contain"
              source={icons.email}
              style={styles.icons}
            />
            <TextInput
              placeholder={t('WriteNote')}
              placeholderTextColor="#9A9A9A"
              style={styles.inputtext}
              multiline
              value={note}
              onChangeText={text => {
                setnote(text);
              }}
            />
          </View>

          <View
            style={{
              width: wp(90),
              paddingVertical: wp(5),
              borderWidth: 1,
              borderColor: Colors.gray,
              alignSelf: 'center',
              marginTop: wp(4),
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <ScrollView contentContainerStyle={styles.imageGrid}>
                {Images.map((image, index) => (
                  <Image
                    key={index}
                    source={image}
                    style={{
                      width: wp(30),
                      height: wp(30),
                      margin: wp(1),
                      borderRadius: 8,
                    }}
                  />
                ))}
              </ScrollView>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    selectMultipleImages();
                  }}
                  style={{}}>
                  <Image
                    source={images.upload}
                    resizeMode="contain"
                    style={{
                      width: wp(20),
                      height: wp(20),
                      tintColor: Colors.green,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{marginTop: wp(10)}}>
            <Button
              title="Add Appointment"
              onPress={() => {
                // thankyouSheet.current.open();
                // refRBSheet.current.close();
                if (_Validate()) {
                  // _AddNewAppointmentAPi();
                  _AddNewAppointmentAPi();
                } else {
                  ToastAndroid.show(
                    'Select at Lesat one image and fill all other inputs',
                    ToastAndroid.SHORT,
                  );
                }
              }}
            />
          </View>

          <DateTimePicker
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            minimumDate={minimumSelectableDate}
          />

          <DateTimePicker
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={hideTimePicker}
          />
          <View style={{marginBottom: wp(10)}}></View>
        </ScrollView>
      </RBSheet>
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
    width: wp(90),
    height: wp(60),
    backgroundColor: Colors.white,
    elevation: 2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  services: {
    width: wp(80),
    height: wp(60),
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

  Button: {
    width: wp(80),
    height: wp(14),
    backgroundColor: Colors.green,
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  butonText: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: fonts.BOLD,
  },
  sheet_box: {
    width: wp(90),
    height: wp(14),
    backgroundColor: '#F7F4F2',
    borderWidth: 1,
    borderColor: '#C9C9C9',
    alignSelf: 'center',
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: wp(4),
    elevation: 2,
    paddingHorizontal: wp(5),
  },
  icons: {
    width: wp(5),
    height: wp(5),
  },
  select: {
    fontSize: 14,
    color: '#9A9A9A',
    fontFamily: fonts.REGULAR,
    marginLeft: wp(2),
  },
  sheet_inputbox: {
    width: wp(90),
    height: wp(40),
    backgroundColor: '#F7F4F2',
    borderWidth: 1,
    borderColor: '#C9C9C9',
    alignSelf: 'center',
    borderRadius: 25,
    flexDirection: 'row',
    // alignItems: 'center',
    marginTop: wp(4),
    elevation: 2,
    paddingHorizontal: wp(5),
    paddingTop: wp(2),
    marginBottom: wp(1),
  },
  inputtext: {
    color: Colors.black,
    fontFamily: fonts.REGULAR,
    marginLeft: wp(2),
    textAlignVertical: 'top',
    flex: 1,
    marginTop: wp(-2),
  },

  watch: {
    width: wp(30),
    height: wp(30),
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: wp(8),
  },
  addaddressinput: {
    color: Colors.black,
    fontFamily: fonts.REGULAR,
    flex: 1,
    paddingLeft: wp(2),
  },
  thanku: {
    width: wp(40),
    height: wp(40),
    alignSelf: 'center',
    // backgroundColor: 'red',
    marginTop: wp(18),
  },
  thanku_text: {
    color: Colors.brownpod,
    textAlign: 'center',
    fontFamily: fonts.BOLD,
    marginTop: wp(10),
    lineHeight: 22,
  },
  Thanku_des: {
    color: '#979797',
    textAlign: 'center',
    fontFamily: fonts.REGULAR,
    marginTop: wp(10),
    lineHeight: 22,
    paddingHorizontal: wp(15),
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: wp(2), // Optional: Adjust padding if needed
  },
});
