import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {Colors, fonts, icons, images} from '../../../constant/Index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useFocusEffect} from '@react-navigation/native';
import {AllGetAPI} from '../../../components/Apis/Api_Screen';
import {useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Appointment = ({navigation}) => {
  const user = useSelector(state => state?.user?.user);

  const conditions = ['All', 'Pending', 'Active', 'Cancelled', 'Completed'];
  const [activeCondition, setActiveCondition] = useState('All');
  const [appointmentsData, setAppointmentsData] = useState({
    active_appointments: [],
    appointments: [],
    cancelled_appointments: [],
    completed_appointments: [],
    pending_appointments: [],
  });

  const handleConditionPress = condition => {
    setActiveCondition(condition);
  };

  const getConditionColor = condition => {
    switch (condition) {
      case 'pending':
        return Colors.gray; // or your desired color for pending
      case 'active':
        return Colors.blue;
      case 'completed':
        return Colors.gray;
      case 'cancelled':
        return Colors.red;
      default:
        return Colors.black; // or any default color you prefer
    }
  };
  const fetchRentalData = () => {
    AllGetAPI({url: 'getallappointments', Token: user?.api_token})
      .then(res => {
        setAppointmentsData(res);
        // console.log('rental all added appointment data', res);
      })
      .catch(err => {
        console.log('api error', err);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchRentalData();
    }, []),
  );

  const filteredData =
    activeCondition === 'All'
      ? [].concat(
          ...appointmentsData.active_appointments,
          ...appointmentsData.pending_appointments,
          ...appointmentsData.cancelled_appointments,
          ...appointmentsData.completed_appointments,
        )
      : appointmentsData[`${activeCondition.toLowerCase()}_appointments`];
  const {top} = useSafeAreaInsets();
  // console.log('filteredData0000000000000-----------------------', filteredData);
  return (
    <View style={{flex: 1, backgroundColor: Colors.bback}}>
      <StatusBar translucent={true} />
      <View
        style={{
          flex: 1,
          marginTop: Platform.OS == 'ios' ? top : StatusBar.currentHeight,
        }}>
        <Text style={styles.headerText}>Appointments</Text>
        <View style={{marginLeft: wp(3), marginVertical: wp(4)}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {conditions.map((item, index) => (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => handleConditionPress(item)}
                  style={[
                    styles.conditions_container,
                    activeCondition === item && styles.activeCondition,
                  ]}>
                  <Text
                    style={
                      activeCondition === item
                        ? styles.conditions_text
                        : styles.conditions_inactext
                    }>
                    {item}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
        <ScrollView>
          <View>
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <View key={index} style={styles.data_box}>
                  <View style={styles.row}>
                    <View
                      style={{
                        // backgroundColor: 'red',
                        width: wp(64),
                      }}>
                      <Text style={styles.type}>{item.package.name}</Text>
                      <Text numberOfLines={3} style={styles.des}>
                        {item.description}
                      </Text>
                    </View>

                    <View style={styles.row2}>
                      <View style={styles.line}></View>
                      <View style={{alignItems: 'center'}}>
                        <Text style={styles.currency}>CHF</Text>
                        <Text style={styles.price}>{item.package.price}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.line2}></View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      // backgroundColor: 'red',
                      marginHorizontal: wp(5),
                    }}>
                    <View></View>
                    <TouchableOpacity
                      style={{alignSelf: 'center'}}
                      onPress={() => {
                        navigation.navigate('Appointment_Detail', {item});
                      }}>
                      <Text
                        style={[
                          styles.condition,
                          {color: getConditionColor(item.status)},
                        ]}>
                        {item.status}
                      </Text>
                    </TouchableOpacity>
                    {item.status === 'active' || item.status === 'completed' ? (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('Invoices_List');
                        }}>
                        <Text
                          style={{
                            fontFamily: fonts.BOLD,
                            color: Colors.green,
                            fontSize: 14,
                          }}>
                          Invoice
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <View></View>
                    )}
                  </View>
                </View>
              ))
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={images.noproperty}
                  resizeMode="contain"
                  style={styles.nodata}
                />
              </View>
            )}
          </View>
          <View style={{marginBottom: wp(18)}}></View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  headerText: {
    color: Colors.wild,
    fontSize: 18,
    fontFamily: fonts.BOLD,
    textAlign: 'center',
    marginTop: wp(4),
  },
  conditions_container: {
    paddingHorizontal: wp(3),
    paddingVertical: wp(1),
    marginHorizontal: wp(2),
    borderRadius: 5,
    // backgroundColor: 'red',
  },
  conditions_text: {
    color: Colors.blue,
    fontFamily: fonts.BOLD,
    fontSize: 14,
  },
  activeCondition: {
    borderBottomWidth: 2,
    borderBottomColor: '#7140A1',
  },
  conditions_inactext: {
    color: '#776E96',
    fontFamily: fonts.REGULAR,
    fontSize: 14,
  },
  data_box: {
    width: wp(90),
    paddingVertical: wp(4),
    backgroundColor: Colors.white,
    elevation: 2,
    marginVertical: wp(2),
    alignSelf: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.green,
    paddingHorizontal: wp(3),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  type: {
    color: '#424242',
    fontSize: 14,
    fontFamily: fonts.BOLD,
  },
  des: {
    color: '#7F7F7F',
    fontSize: 12,
    fontFamily: fonts.REGULAR,
    marginTop: wp(2),
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'pink',
    width: wp(15),
  },
  line: {
    width: wp(0.3),
    height: wp(20),
    backgroundColor: Colors.verylightgray,
  },
  currency: {
    color: Colors.blue,
    fontSize: 12,
    fontFamily: fonts.BOLD,
  },
  price: {
    color: Colors.blue,
    fontSize: 18,
    fontFamily: fonts.BOLD,
  },
  line2: {
    width: wp(80),
    height: wp(0.3),
    backgroundColor: Colors.verylightgray,
    alignSelf: 'center',
    marginVertical: wp(6),
  },
  condition: {
    color: Colors.blue,
    fontSize: 14,
    fontFamily: fonts.BOLD,
    // backgroundColor: 'pink',
  },
  nodata: {
    width: wp(80),
    height: wp(80),
    // alignSelf: 'center',
    marginTop: wp(20),
  },
});
