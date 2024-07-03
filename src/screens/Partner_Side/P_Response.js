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
const P_Response = ({navigation, route}) => {
  const {item} = route.params;
  console.log('item on response screeeeeeeeeeeeeeeeen', item);
  const user = useSelector(state => state?.user?.user);

  const _CancelApi = () => {
    // setIsLoading(true);
    const formdata = new FormData();
    formdata.append('status', 'Cancelled');
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
          navigation.navigate('Cancelled_Detail');
          console.log('Acepteddd==================', res);
        }
        // console.log('order Changed successfully', res);
      })
      .catch(err => {
        // setIsLoading(false);

        console.log('api error', err);
      });
  };
  const imagedata = item.images;

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
          navigation.navigate('Completed_Detail');
          console.log('Acepteddd==================', res);
        }
        // console.log('order Changed successfully', res);
      })
      .catch(err => {
        // setIsLoading(false);

        console.log('api error', err);
      });
  };
  const {top} = useSafeAreaInsets();
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
            <Text style={styles.headerText}>{item.package.category.name}</Text>
            <View></View>
          </View>
          <View style={{marginTop: wp(10)}}>
            <FlatList
              data={imagedata}
              horizontal
              renderItem={({item, index}) => {
                console.log('item,.,.,.,.', item.image);
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
              <Text style={styles.heading}>{item.package.name}</Text>
              <Text style={styles.price}>${item.package.price}</Text>
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

            <Text style={styles.heading1}>{item.package.description}</Text>
          </View>
          {item.status === 'pending' && (
            <View style={styles.Button_row}>
              <TouchableOpacity
                style={styles.cancel_Button}
                onPress={() => {
                  // _CancelApi();
                  navigation.navigate('P_Cancel_Reason', {item});
                }}>
                <Text style={styles.cancel_text}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.accept_Button}
                onPress={() => {
                  navigation.navigate('P_Invoice', {item});
                }}>
                <Text style={styles.accept_text}>Accept</Text>
              </TouchableOpacity>
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
    marginVertical: wp(10),
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
});
