import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  ToastAndroid,
} from 'react-native';
import {Colors, fonts, icons, images} from '../../../constant/Index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {AllGetAPI, PostAPiwithToken} from '../../../components/Apis/Api_Screen';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../../components/Loader';
const P_Notification = () => {
  const Notification = [
    {
      key: '1',
      Text: 'Appointment Invoice',
      icon: icons.tick,
      des: 'Qrygg elomin kashyyyk skirata. Oswaft mirta omwati kohl shmi.',
    },
    {
      key: '2',
      Text: 'Well done Anakin!',
      icon: icons.tick,
      des: 'Qrygg elomin kashyyyk skirata. Oswaft mirta omwati kohl shmi.',
    },
    {
      key: '3',
      Text: 'You were the chosen one!',
      icon: icons.Alert,
      des: 'Qrygg elomin kashyyyk skirata. Oswaft mirta omwati kohl shmi.',
    },
  ];

  const user = useSelector(state => state?.user?.user);
  const [RecivedNoti, setRecivedNoti] = useState([]);
  const _NotificationApi = () => {
    setIsLoading(true);

    AllGetAPI({url: 'viewAllNotification', Token: user?.api_token})
      .then(res => {
        setRecivedNoti(res.data);
        console.log('notification response', res);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        console.log('api error', err);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      _NotificationApi();
    }, []),
  );

  const [IsLoading, setIsLoading] = useState(false);

  const _DeleteNotification = id => {
    setIsLoading(true);

    const formdata = new FormData();

    formdata.append('id', id);

    PostAPiwithToken(
      {url: 'deleteNotification', Token: user.api_token},
      formdata,
    )
      .then(res => {
        console.log('res', res);
        if (res.status == 'success') {
          setIsLoading(false);

          // thankyouSheet.current.open();
          // refRBSheet.current.close();

          ToastAndroid.show('Data Updated Successfully!', ToastAndroid.SHORT);
          _NotificationApi();
          console.log('res of deleteapi ', res);
        }
        console.log('res of deleteapi ', res);
      })
      .catch(err => {
        setIsLoading(false);

        console.log('api error', err);
      });
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.bback}}>
      <StatusBar translucent={true} />
      {IsLoading && <Loader />}
      <View style={{flex: 1, marginTop: StatusBar.currentHeight}}>
        <Text style={styles.headerText}>Notification</Text>
        <ScrollView>
          {RecivedNoti.length === 0 ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={images.nonoti}
                style={{width: wp(90), height: wp(100), marginTop: wp(20)}}
                resizeMode="contain"
              />
            </View>
          ) : (
            <View style={{marginTop: wp(4)}}>
              <FlatList
                data={RecivedNoti}
                renderItem={({item}) => {
                  return (
                    <View style={styles.box}>
                      <View style={styles.row}>
                        <Image
                          source={
                            item.type === 'cancel_appointment'
                              ? icons.Alert
                              : icons.new
                          }
                          style={styles.icon}
                          resizeMode="contain"
                        />
                        <Text
                          style={[
                            styles.text,
                            {
                              color:
                                item.type === 'cancel_appointment'
                                  ? 'red'
                                  : Colors.blue,
                            },
                          ]}>
                          {item.title}
                        </Text>
                      </View>
                      <Text numberOfLines={3} style={styles.des}>
                        {item.message}
                      </Text>
                      <TouchableOpacity
                        style={styles.close}
                        onPress={() => {
                          _DeleteNotification(item.id);
                        }}>
                        <Ionicons
                          name="close-outline"
                          size={22}
                          color="#666666"
                        />
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          )}

          <View style={{marginBottom: wp(20)}}></View>
        </ScrollView>
      </View>
    </View>
  );
};

export default P_Notification;

const styles = StyleSheet.create({
  headerText: {
    color: Colors.wild,
    fontSize: 18,
    fontFamily: fonts.BOLD,
    textAlign: 'center',
    marginTop: wp(4),
  },
  box: {
    width: wp(90),
    paddingVertical: wp(4),
    backgroundColor: Colors.white,
    elevation: 2,
    alignSelf: 'center',
    marginVertical: wp(2),
    borderRadius: 12,
    paddingHorizontal: wp(3),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  icon: {
    width: wp(6),
    height: wp(6),
  },
  text: {
    color: Colors.blue,
    fontFamily: fonts.BOLD,
    fontSize: 14,
    marginLeft: wp(2),
  },
  des: {
    color: Colors.gray,
    fontFamily: fonts.REGULAR,
    fontSize: 12,
    marginTop: wp(2),
    // backgroundColor: 'red',
    lineHeight: 22,
    maxWidth: wp(70),
  },
  close: {
    position: 'absolute',
    right: wp(2),
    top: wp(2),
  },
});
