import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  TextInput,
  ToastAndroid,
  Platform,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Colors, fonts, icons, images} from '../../constant/Index';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Back from 'react-native-vector-icons/Ionicons';
import Cross from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import Button from '../../components/Button';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {PostAPiwithToken} from '../../components/Apis/Api_Screen';
import {useSelector} from 'react-redux';
import Loader from '../../components/Loader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';

const Packages = ({navigation, route}) => {
  const {t} = useTranslation();
  const {item} = route.params;
  console.log('item on packages', item.packages);
  const user = useSelector(state => state?.user?.user);
  const refRBSheet = useRef();
  const thankyouSheet = useRef();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [SelectedDate, setSelectedDate] = useState('');
  const [SelectedTime, setSelectedTime] = useState('');
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [address, setaddress] = useState('');
  const [note, setnote] = useState('');

  const [SelectedPackage, setSelectedPackage] = useState('');
  console.log('the selected package', SelectedPackage);

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
    setSelectedTime(moment(date).format('HH:mm')); // Correct format
    hideTimePicker();
  };

  const _Validate = () => {
    if (!SelectedDate || !SelectedTime || !note || !address) {
      return false;
    }
    return true;
  };

  const [IsLoading, setIsLoading] = useState(false);

  const _AddNewAppointmentAPi = () => {
    setIsLoading(true);

    const formdata = new FormData();

    formdata.append('package_id', SelectedPackage.id);
    formdata.append('time', SelectedTime);
    formdata.append('date', SelectedDate);
    formdata.append('address', address);
    formdata.append('description', note);

    PostAPiwithToken({url: 'addappointment', Token: user.api_token}, formdata)
      .then(res => {
        if (res.status == 'success') {
          setIsLoading(false);

          thankyouSheet.current.open();
          refRBSheet.current.close();

          ToastAndroid.show('Data Updated Successfully!', ToastAndroid.SHORT);

          console.log('res of editprofile ', res);
        } else {
          setIsLoading(false);
          ToastAndroid.show('Errorr in Data Updating!', ToastAndroid.SHORT);
        }
        console.log('res of editprofile ', res);
      })
      .catch(err => {
        setIsLoading(false);

        console.log('api error', err);
      });
  };
  const {top} = useSafeAreaInsets();

  // Calculate the minimum selectable date
  const minimumSelectableDate = moment().add(4, 'days').toDate();

  return (
    <View style={{flex: 1, backgroundColor: Colors.bback}}>
      {IsLoading && <Loader />}
      <StatusBar translucent={true} />
      <View
        style={{
          flex: 1,
          marginTop: Platform.OS == 'ios' ? top : StatusBar.currentHeight,
        }}>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Back name="chevron-back-outline" color="#003C3C" size={22} />
            </TouchableOpacity>
            <Text style={styles.headerText}>{item.name}</Text>
            <View></View>
          </View>

          <SwiperFlatList
            // autoplay
            // autoplayDelay={2}
            // autoplayLoop
            index={2}
            showPagination
            paginationStyleItemActive={{
              width: wp(6),
              height: wp(2),
              backgroundColor: Colors.blue,
            }}
            paginationStyleItemInactive={{
              width: wp(3),
              height: wp(2),
              backgroundColor: Colors.lightgray,
            }}
            data={item.packages}
            renderItem={({item}) => (
              <View style={styles.box}>
                <View style={styles.box1}>
                  <View style={styles.pack_header}>
                    <Text style={styles.type}>{item.name}</Text>
                  </View>
                  <Text style={styles.price}>{item.price} CHF</Text>
                  <View style={styles.line}></View>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      flex: 1,
                      paddingVertical: wp(4),
                    }}>
                    <View style={{}}>
                      <Text style={styles.time}>Time: {item.time}</Text>
                      <Text style={styles.work}>{item.description}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedPackage(item);
                        refRBSheet.current.open();
                      }}
                      style={styles.Button}
                      activeOpacity={0.7}>
                      <Text style={styles.butonText}>{t('SelectPackage')}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </ScrollView>
      </View>
      <RBSheet
        draggable={true}
        dragOnContent
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
                : 'Select Date'}
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
            {/* <Text style={styles.select}>Select Address</Text> */}
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

          <View activeOpacity={0.9} style={styles.sheet_inputbox}>
            <Image
              resizeMode="contain"
              source={icons.email}
              style={styles.icons}
            />
            {/* <Text style={styles.select}>Select Address</Text> */}
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

          <View style={{marginTop: wp(10)}}>
            <Button
              title={t('Next')}
              onPress={() => {
                // thankyouSheet.current.open();
                // refRBSheet.current.close();
                if (_Validate()) {
                  // _AddNewAppointmentAPi();
                  refRBSheet.current.close();
                  navigation.navigate('Scanner', {
                    id: SelectedPackage.id,
                    SelectedDate,
                    SelectedTime,
                    note,
                    address,
                  });
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

export default Packages;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    alignItems: 'center',
    marginTop: wp(6),
  },
  headerText: {
    color: Colors.wild,
    fontSize: 18,
    fontFamily: fonts.BOLD,
  },
  box: {
    width: wp(100),
    height: wp(165),
    alignSelf: 'center',
    // backgroundColor: 'red',
    marginTop: wp(10),
  },
  box1: {
    width: wp(90),
    height: wp(155),
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 2,
  },
  pack_header: {
    width: wp(90),
    height: wp(20),
    backgroundColor: Colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  type: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: fonts.BOLD,
  },
  price: {
    color: Colors.blue,
    fontSize: 18,
    fontFamily: fonts.BOLD,
    alignSelf: 'center',
    marginTop: wp(4),
  },
  line: {
    width: wp(70),
    height: wp(0.3),
    backgroundColor: Colors.verylightgray,
    alignSelf: 'center',
    marginTop: wp(4),
  },
  work: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: fonts.REGULAR,
    textAlign: 'center',
    marginTop: wp(2),
    lineHeight: 24,
  },
  time: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: fonts.BOLD,
    textAlign: 'center',
    marginTop: wp(2),
    lineHeight: 24,
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
});
