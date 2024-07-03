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
  Dimensions,
  ActivityIndicator,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, fonts, icons, images} from '../../constant/Index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Back from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Button from '../../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Pdf from 'react-native-pdf';

import {useSelector} from 'react-redux';
const Invoice = ({navigation, route}) => {
  const user = useSelector(state => state?.user?.user);
  console.log('useruseruseruser', user);
  const {item} = route.params;
  // console.log('dkjaljldjadjlajldjaljdald', item.document);
  console.log('noti item on invoice', item);
  const [show, setshow] = useState(false);
  const close = () => {
    setshow(false);
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.bback}}>
      <StatusBar translucent={true} />
      <Modal
        transparent={true}
        animationType="fade"
        visible={show}
        onRequestClose={close}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <TouchableOpacity
            onPress={() => {
              close();
            }}
            style={{
              position: 'absolute',
              right: wp(5),
              top: wp(5),
              zIndex: 1000,
            }}>
            <AntDesign size={28} color={Colors.blue} name="closecircle" />
          </TouchableOpacity>
          <Pdf
            trustAllCerts={false}
            source={{uri: item.document}}
            scale={1.0}
            minScale={0.5}
            maxScale={3.0}
            renderActivityIndicator={() => (
              <ActivityIndicator colo="#D92835" size="large" />
            )}
            spacing={2}
            enablePaging={true}
            onLoadProgress={percentage => console.log(`Loading :${percentage}`)}
            style={{
              width: wp(100),
              flex: 1,
              // backgroundColor: 'red',
              alignSelf: 'center',
            }}
            onError={error => {
              console.log(error);
            }}
          />
        </View>
      </Modal>
      <View
        style={{
          flex: 1,
          marginTop: StatusBar.currentHeight,
        }}>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Back name="chevron-back-outline" color="#003C3C" size={22} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Invoice</Text>
            <View></View>
          </View>

          <View style={styles.box}>
            <View style={styles.upper_box}>
              <Text style={styles.header1}> {item.package.name}</Text>
              <Image
                source={icons.acc}
                resizeMode="contain"
                style={styles.acc}
              />
            </View>

            <View style={{marginTop: wp(4)}}>
              <View style={styles.row}>
                <Text style={styles.info}>Username</Text>
                <Text style={styles.detail}>{user.username}</Text>
              </View>
              <View style={styles.line}></View>

              <View style={styles.row}>
                <Text style={styles.info}>Phone Number</Text>
                <Text style={styles.detail}>{user.phone_number}</Text>
              </View>
              <View style={styles.line}></View>

              <View style={styles.row}>
                <Text style={styles.info}>Date</Text>
                <Text style={styles.detail}>{item.appointment.time}</Text>
              </View>
              <View style={styles.line}></View>

              <View style={styles.row}>
                <Text style={styles.info}>Time</Text>
                <Text style={styles.detail}>{item.appointment.date}</Text>
              </View>
              <View style={styles.line}></View>
            </View>

            <View style={{marginTop: wp(4)}}>
              <View style={styles.row}>
                <Text style={styles.category}>Damaged Category</Text>
                <Text style={styles.damage}>{item.category.name}</Text>
              </View>
            </View>

            <View style={{marginTop: wp(4)}}>
              {/* <View style={styles.row}> */}
              <Text style={[styles.Price, {textAlign: 'center'}]}>
                {item.package.description}
              </Text>
              {/* </View> */}
            </View>

            <View style={{marginTop: wp(2), marginBottom: wp(4)}}>
              <View style={styles.row}>
                <Text style={styles.category}>Service Fee</Text>
                <Text style={styles.damage}>${item.package.price}</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                setshow(!show);
              }}>
              <Pdf
                trustAllCerts={false}
                source={{uri: item.document}}
                scale={1.0}
                minScale={0.5}
                maxScale={3.0}
                renderActivityIndicator={() => (
                  <ActivityIndicator colo="#D92835" size="large" />
                )}
                spacing={2}
                enablePaging={true}
                onLoadProgress={percentage =>
                  console.log(`Loading :${percentage}`)
                }
                style={{
                  width: wp(50),
                  height: wp(70),
                  // backgroundColor: 'red',
                  alignSelf: 'center',
                }}
                onError={error => {
                  console.log(error);
                }}
              />
            </TouchableOpacity>
            <View style={styles.line}></View>

            <View style={{marginTop: wp(2), marginBottom: wp(4)}}>
              <View style={styles.row}>
                <Text style={styles.category}>Technician Address</Text>
              </View>
              <Text style={styles.tectadd}>{item.address}</Text>
            </View>
            <View style={styles.line}></View>

            <View style={styles.bottom_View}>
              <Text style={styles.header1}>Sub Total</Text>
              <Text style={styles.total}>${item.package.price}</Text>
            </View>
          </View>

          <View style={{marginBottom: 30}}></View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Invoice;

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
    width: wp(90),
    // paddingVertical: wp(4),
    backgroundColor: Colors.white,
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: wp(10),
    elevation: 5,
    shadowColor: Colors.gray,
  },
  upper_box: {
    width: wp(90),
    height: wp(20),
    backgroundColor: Colors.blue,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
  },
  header1: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: fonts.BOLD,
  },
  acc: {
    width: wp(12),
    height: wp(12),
    tintColor: Colors.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    marginTop: wp(4),
  },
  info: {
    color: '#202244',
    fontSize: 14,
    fontFamily: fonts.BOLD,
  },
  detail: {
    color: Colors.blue,
    fontSize: 14,
    fontFamily: fonts.REGULAR,
  },
  line: {
    width: wp(80),
    height: wp(0.3),
    backgroundColor: Colors.verylightgray,
    alignSelf: 'center',
    marginTop: wp(1),
  },
  category: {
    color: '#202244',
    fontSize: 14,
    fontFamily: fonts.BOLD,
  },
  damage: {
    color: Colors.blue,
    fontSize: 12,
    fontFamily: fonts.BOLD,
  },
  tectadd: {
    color: Colors.blue,
    fontSize: 12,
    fontFamily: fonts.BOLD,
    paddingHorizontal: wp(5),
    marginTop: wp(2),
  },

  part: {
    color: '#424242',
    fontSize: 12,
    fontFamily: fonts.BOLD,
  },
  Price: {
    color: Colors.blue,
    fontSize: 12,
    fontFamily: fonts.BOLD,
  },
  bottom_View: {
    width: wp(90),
    height: wp(20),
    backgroundColor: Colors.blue,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    marginTop: wp(10),
  },
  total: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: fonts.BOLD,
  },
});
