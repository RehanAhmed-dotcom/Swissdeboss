import {StyleSheet, Text, View, Image, Platform} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/User_Side/BottomScreens/Home';
import Appointment from '../../screens/User_Side/BottomScreens/Appointment';
import Notification from '../../screens/User_Side/BottomScreens/Notification';
import Profile from '../../screens/User_Side/BottomScreens/Profile';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, fonts, icons} from '../../constant/Index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const Tab = createBottomTabNavigator();

const Bottom_Nav = () => {
  const {bottom} = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarLabel: '',
        tabBarStyle: {
          height: wp(18),
          width: wp(100),
          bottom: Platform.OS == 'ios' ? bottom : 0,
          backgroundColor: Colors.white,
          position: 'absolute',
        },
        tabBarIcon: ({focused}) => {
          if (route.name === 'Home') {
            return (
              <View style={{marginTop: wp(Platform.OS == 'ios' ? 6 : 2.5)}}>
                <View>
                  {focused ? (
                    <View style={{alignItems: 'center'}}>
                      <Image
                        source={icons.homeactive}
                        resizeMode="contain"
                        style={styles.icon}
                      />
                      <Text style={styles.focusedText}>Home</Text>
                    </View>
                  ) : (
                    <View style={{alignItems: 'center'}}>
                      <Image
                        source={icons.home}
                        resizeMode="contain"
                        style={styles.icon}
                      />
                      <Text style={styles.unfocusedText}>Home</Text>
                    </View>
                  )}
                </View>
              </View>
            );
          }

          if (route.name === 'Appointment') {
            return (
              <View style={{marginTop: wp(Platform.OS == 'ios' ? 6 : 2.5)}}>
                <View>
                  {focused ? (
                    <View style={{alignItems: 'center'}}>
                      <Image
                        source={icons.appointmentactive}
                        resizeMode="contain"
                        style={styles.icon}
                      />
                      <Text style={styles.focusedText}>Appointment</Text>
                    </View>
                  ) : (
                    <View style={{alignItems: 'center'}}>
                      <Image
                        source={icons.appointment}
                        resizeMode="contain"
                        style={styles.icon}
                      />
                      <Text style={styles.unfocusedText}>Appointment</Text>
                    </View>
                  )}
                </View>
              </View>
            );
          }

          if (route.name === 'Notification') {
            return (
              <View style={{marginTop: wp(Platform.OS == 'ios' ? 6 : 2.5)}}>
                <View>
                  {focused ? (
                    <View style={{alignItems: 'center'}}>
                      <Image
                        source={icons.notificationactive}
                        resizeMode="contain"
                        style={styles.icon}
                      />
                      <Text style={styles.focusedText}>Notification</Text>
                    </View>
                  ) : (
                    <View style={{alignItems: 'center'}}>
                      <Image
                        source={icons.notification}
                        resizeMode="contain"
                        style={styles.icon}
                      />
                      <Text style={styles.unfocusedText}>Notification</Text>
                    </View>
                  )}
                </View>
              </View>
            );
          }

          if (route.name === 'Profile') {
            return (
              <View style={{marginTop: wp(Platform.OS == 'ios' ? 3.5 : 1)}}>
                <View>
                  {focused ? (
                    <View style={{alignItems: 'center'}}>
                      <Ionicons
                        name="person-circle"
                        color={Colors.green}
                        size={28}
                      />
                      <Text style={[styles.focusedText, {marginTop: wp(1)}]}>
                        Profile
                      </Text>
                    </View>
                  ) : (
                    <View style={{alignItems: 'center'}}>
                      <Ionicons
                        name="person-circle"
                        color={Colors.inactive}
                        size={28}
                      />
                      <Text style={[styles.unfocusedText, {marginTop: wp(1)}]}>
                        Profile
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            );
          }
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Appointment" component={Appointment} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Bottom_Nav;

const styles = StyleSheet.create({
  icon: {
    width: wp(6),
    height: wp(6),
  },
  focusedText: {
    fontSize: 10,
    color: Colors.green,
    fontFamily: fonts.BOLD,
    marginTop: wp(1.5),
  },
  unfocusedText: {
    fontSize: 10,
    color: Colors.inactive,
    fontFamily: fonts.REGULAR,
    marginTop: wp(1.5),
  },
  aicon: {
    width: wp(6),
    height: wp(6),
    borderWidth: 1,
    borderColor: Colors.green,
    borderRadius: 100,
  },
});
