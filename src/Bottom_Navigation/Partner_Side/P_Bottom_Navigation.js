import {StyleSheet, Text, View, Image, Platform} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, fonts, icons} from '../../constant/Index';
import P_Home from '../../screens/Partner_Side/P_Bottom_Screens/P_Home';
import P_Notification from '../../screens/Partner_Side/P_Bottom_Screens/P_Notification';
import Ionicons from 'react-native-vector-icons/Ionicons';
import P_Profile from '../../screens/Partner_Side/P_Bottom_Screens/P_Profile';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const Tab = createBottomTabNavigator();
const P_Bottom_Navigation = () => {
  const {bottom} = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarLabel: '',
        tabBarStyle: {
          height: wp(18),
          bottom: Platform.OS == 'ios' ? bottom : 0,
          width: wp(100),
          backgroundColor: Colors.white,
          position: 'absolute',
        },
        tabBarIcon: ({focused}) => {
          if (route.name === 'P_Home') {
            return (
              <View
                style={{
                  marginTop: wp(Platform.OS == 'ios' ? 6 : 2.5),
                  // backgroundColor: 'red',
                  // height: wp(18),
                }}>
                <View style={{justifyContent: 'center'}}>
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

          if (route.name === 'P_Notification') {
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

          if (route.name === 'P_Profile') {
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
      <Tab.Screen name="P_Home" component={P_Home} />
      <Tab.Screen name="P_Notification" component={P_Notification} />
      <Tab.Screen name="P_Profile" component={P_Profile} />
    </Tab.Navigator>
  );
};

export default P_Bottom_Navigation;

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
