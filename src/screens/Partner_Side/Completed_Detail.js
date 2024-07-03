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
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, fonts, images} from '../../constant/Index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Back from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/Button';
import {useFocusEffect} from '@react-navigation/native';
import {AllGetAPI} from '../../components/Apis/Api_Screen';
import {useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Completed_Detail = ({navigation}) => {
  const user = useSelector(state => state?.user?.user);

  console.log('user on p home.............................', user);
  const [PendingData, setPendingData] = useState([]);
  const _FetchAppointmentsAPiPending = () => {
    // setIsLoading(true);
    // const formdata = new FormData();

    AllGetAPI({url: 'complete_app', Token: user?.api_token})
      .then(res => {
        // setIsLoading(false);
        setPendingData(res.completed_appointments);
        console.log('Appointment Data _Fetch   complete_app./././././.', res);
      })
      .catch(err => {
        // setIsLoading(false);

        console.log('api error', err);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      _FetchAppointmentsAPiPending();
    }, []),
  );
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
            <Text style={styles.headerText}>Completed Appointments</Text>
            <View></View>
          </View>

          <View style={{marginTop: wp(10)}}>
            <FlatList
              data={PendingData}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('P_Response', {item});
                    }}
                    activeOpacity={0.8}
                    style={styles.box}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      {/* <Image
                              source={images.main}
                              resizeMode="contain"
                              style={styles.image}
                            /> */}
                      <View
                        style={{
                          // backgroundColor: 'red',
                          width: wp(65),
                          marginLeft: wp(2),
                        }}>
                        <Text numberOfLines={1} style={styles.type}>
                          {item.package.category.name}
                        </Text>

                        <Text numberOfLines={3} style={styles.des}>
                          {item.description}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        alignItems: 'center',
                        // backgroundColor: 'yellow',
                      }}>
                      <Text style={styles.date}>{item.date}</Text>
                      <Text style={styles.time}>{item.time}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Completed_Detail;

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
    paddingVertical: wp(4),
    backgroundColor: Colors.white,
    alignSelf: 'center',
    marginVertical: wp(2),
    elevation: 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.green,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(2),
  },
  image: {
    width: wp(20),
    height: wp(20),
    borderRadius: 8,
  },
  type: {
    color: Colors.header,
    fontSize: 14,
    fontFamily: fonts.BOLD,
  },
  des: {
    color: Colors.gray,
    fontSize: 12,
    fontFamily: fonts.REGULAR,
    marginTop: wp(2),
  },
  date: {
    color: Colors.blue,
    fontSize: 10,
    fontFamily: fonts.BOLD,
    textAlign: 'center',
  },
  time: {
    color: Colors.blue,
    fontSize: 10,
    fontFamily: fonts.BOLD,
    textAlign: 'center',
    marginTop: wp(3),
  },
});
