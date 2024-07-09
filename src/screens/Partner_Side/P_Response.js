import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ScrollView,
  Image,
  ToastAndroid,
  Platform,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, fonts, icons, images} from '../../constant/Index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Back from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PostAPiwithToken} from '../../components/Apis/Api_Screen';
import {useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Clipboard from '@react-native-clipboard/clipboard';
import {useTranslation} from 'react-i18next';
const P_Response = ({navigation, route}) => {
  const {item} = route.params;
  const {t} = useTranslation();
  console.log('item on response screeeeeeeeeeeeeeeeen', item);
  const user = useSelector(state => state?.user?.user);
  const [requestModal, setrequestModal] = useState(false);
  const imagedata = item.images;
  const close = () => {
    setrequestModal(false);
  };
  const _CompleteOrderApi = () => {
    // setIsLoading(true);
    const formdata = new FormData();
    formdata.append('status', 'Completed');
    // formdata.append('user_id', item.user_id);
    // formdata.append('appointment_id', item.id);
    // formdata.append('package_id', item.package_id);
    // formdata.append('cat_id', item.package.category_id);
    // formdata.append('address', address);

    PostAPiwithToken(
      {url: `statusupdate/${item.id}`, Token: user?.api_token},
      formdata,
    )
      .then(res => {
        if (res.status == 'success') {
          // setIsLoading(false);

          ToastAndroid.show('Order Accepted Sucessfully!', ToastAndroid.SHORT);
          navigation.navigate('P_Bottom_Navigation', {screen: 'P_Home'});

          // console.log('Acepteddd==================', res);
        }
        // console.log('order Changed successfully', res);
      })
      .catch(err => {
        // setIsLoading(false);

        console.log('api error', err);
      });
  };

  const _RequestAPi = () => {
    // setIsLoading(true);
    const formdata = new FormData();
    formdata.append('status', 'Request');

    PostAPiwithToken(
      {url: `statusupdate/${item.id}`, Token: user?.api_token},
      formdata,
    )
      .then(res => {
        if (res.status == 'success') {
          // setIsLoading(false);

          ToastAndroid.show('Order Accepted Sucessfully!', ToastAndroid.SHORT);
          navigation.navigate('P_Bottom_Navigation', {screen: 'P_Home'});

          console.log('Request Responseeeeeeeeeeeeee', res);
        }
        // console.log('order Changed successfully', res);
      })
      .catch(err => {
        // setIsLoading(false);

        console.log('api error', err);
      });
  };
  const {top} = useSafeAreaInsets();

  const copyToClipboard = text => {
    Clipboard.setString(text);
    ToastAndroid.show('Address copied to clipboard!', ToastAndroid.SHORT);
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.bback}}>
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
            <Text style={styles.headerText}>{item.category.name}</Text>
            <View></View>
          </View>
          <View style={{marginTop: wp(10)}}>
            <FlatList
              data={imagedata}
              horizontal
              renderItem={({item, index}) => {
                // console.log('item,.,.,.,.', item.image);
                const isLastItem = index === imagedata.length - 1;
                return (
                  <View>
                    <Image
                      source={{uri: item.image}}
                      style={{
                        width: wp(40),
                        height: wp(40),
                        borderRadius: 8,
                        marginLeft: index === 0 ? wp(5) : wp(2),
                        marginRight: isLastItem ? wp(5) : 0,
                        // backgroundColor: 'red',
                      }}
                      resizeMode="cover"
                    />
                  </View>
                );
              }}
            />
          </View>
          <View style={styles.box}>
            <View style={styles.row}>
              <Text style={styles.heading}>{item.category.name}</Text>
              <Text style={styles.price}>
                {t('cars')}: {item.no_of_cars}
              </Text>
            </View>

            <View style={styles.row2}>
              <Ionicons
                name="location-outline"
                size={22}
                color={Colors.black}
              />
              <Text style={styles.text}>{item.address}</Text>
            </View>

            <View style={styles.row2}>
              <Ionicons
                name="calendar-outline"
                size={22}
                color={Colors.black}
              />
              <Text style={styles.text}>
                {item.date} at {item.time}
              </Text>
            </View>

            <View style={styles.row2}>
              <Ionicons name="person-outline" size={22} color={Colors.black} />
              <Text style={styles.text}>{item.user.username}</Text>
            </View>

            <View style={[styles.row2, {alignItems: 'flex-start'}]}>
              <Ionicons
                name="document-text-outline"
                size={22}
                color={Colors.black}
              />
              <Text style={styles.text}>{item.description}</Text>
            </View>

            <Text style={styles.heading1}>{item.category.description}</Text>
          </View>
          {(item.status === 'pending' || item.status === 'request') && (
            <View>
              {item.status === 'request' ? (
                <>
                  {item.technion_address === null ? (
                    <Text style={styles.requestSentText}>{t('Already')}</Text>
                  ) : (
                    <View>
                      <Text
                        style={[
                          styles.requestSentText,
                          {fontFamily: fonts.BOLD, paddingVertical: 0},
                        ]}>
                        {t('techadd')}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderWidth: 1,
                          width: wp(90),
                          paddingVertical: wp(2),
                          alignSelf: 'center',
                          borderRadius: 10,
                          paddingHorizontal: wp(5),
                        }}>
                        <Text style={styles.addressreciewed}>
                          {item.technion_address}
                        </Text>
                        <TouchableOpacity
                          style={styles.copybox}
                          onPress={() =>
                            copyToClipboard(item.technion_address)
                          }>
                          <Ionicons
                            name="copy-outline"
                            size={22}
                            color="black"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </>
              ) : (
                <View style={{marginTop: wp(16)}}>
                  <Button
                    title={t('request')}
                    onPress={() => {
                      setrequestModal(!requestModal);
                    }}
                  />
                </View>
              )}
              <View style={styles.Button_row}>
                <TouchableOpacity
                  style={styles.cancel_Button}
                  onPress={() => {
                    // _CancelApi();
                    navigation.navigate('P_Cancel_Reason', {item});
                  }}>
                  <Text style={styles.cancel_text}>{t('cancel')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.accept_Button}
                  onPress={() => {
                    navigation.navigate('P_Invoice', {item});
                  }}>
                  <Text style={styles.accept_text}>{t('Accept')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {item.status === 'active' && (
            <View style={{marginTop: wp(18), marginBottom: wp(7)}}>
              <Button
                title="Complete Order"
                onPress={() => {
                  _CompleteOrderApi();
                }}
              />
            </View>
          )}
        </ScrollView>
      </View>
      <Modal
        visible={requestModal}
        transparent={true}
        animationType="slide"
        onRequestClose={close}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,.7)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.modalView}>
            <Text style={styles.heading}>Images</Text>
            <View style={{marginTop: wp(4)}}>
              <FlatList
                data={imagedata}
                horizontal
                renderItem={({item, index}) => {
                  // console.log('item,.,.,.,.', item.image);
                  const isLastItem = index === imagedata.length - 1;
                  return (
                    <View>
                      <Image
                        source={{uri: item.image}}
                        style={{
                          width: wp(20),
                          height: wp(20),
                          borderRadius: 8,
                          marginLeft: index === 0 ? wp(5) : wp(2),
                          marginRight: isLastItem ? wp(5) : 0,
                          // backgroundColor: 'red',
                        }}
                        resizeMode="cover"
                      />
                    </View>
                  );
                }}
              />
            </View>
            <Text style={[styles.heading, {marginTop: wp(10)}]}>address</Text>
            <Text style={[styles.address]}>{item.address}</Text>
            <View style={{marginTop: wp(14)}}>
              <Button
                title={t('sendrequest')}
                onPress={() => {
                  _RequestAPi();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default P_Response;

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
  upcoming: {
    width: wp(50),
    height: wp(50),
    alignSelf: 'center',
    marginTop: wp(6),
  },
  box: {
    width: wp(90),
    paddingVertical: wp(2),
    backgroundColor: Colors.white,
    alignSelf: 'center',
    borderRadius: 12,
    marginTop: wp(6),
    borderWidth: 1,
    borderColor: Colors.verylightgray,
    paddingHorizontal: wp(5),
    paddingBottom: wp(6),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: wp(5),
    marginTop: wp(4),
  },
  heading: {
    color: '#1C1F34',
    fontSize: 14,
    fontFamily: fonts.BOLD,
  },
  price: {
    color: Colors.blue,
    fontSize: 14,
    fontFamily: fonts.BOLD,
  },
  row2: {
    flexDirection: 'row',
    marginTop: wp(2),
    alignItems: 'center',
  },
  text: {
    color: '#6C757D',
    fontSize: 12,
    fontFamily: fonts.REGULAR,
    maxWidth: wp(75),
    // backgroundColor: 'red',
    marginLeft: wp(2),
  },
  acc: {
    width: wp(6),
    height: wp(6),
    marginRight: wp(2),
  },
  heading1: {
    color: '#6C757D',
    fontSize: 14,
    fontFamily: fonts.REGULAR,
    textAlign: 'center',
    marginTop: wp(8),
  },
  Button_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    marginVertical: wp(4),
  },
  cancel_Button: {
    width: wp(43),
    height: wp(14),
    borderWidth: 1,
    borderColor: Colors.green,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancel_text: {
    color: Colors.green,
    fontSize: 16,
    fontFamily: fonts.BOLD,
  },

  accept_Button: {
    width: wp(43),
    height: wp(14),
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.green,
  },
  accept_text: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: fonts.BOLD,
  },
  modalView: {
    width: wp(90),
    paddingVertical: wp(10),
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 12,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: wp(5),
  },
  address: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: fonts.REGULAR,
  },
  requestSentText: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: fonts.REGULAR,
    paddingHorizontal: wp(5),
    marginVertical: wp(6),
  },
  addressreciewed: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: fonts.REGULAR,
    // backgroundColor: 'red',
    width: wp(65),
  },
  copybox: {
    paddingHorizontal: wp(2),
    paddingVertical: wp(2),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.green,
  },
});
