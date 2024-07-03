import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Select from '../screens/User_Side/Auth/Select';
import Login from '../screens/User_Side/Auth/Login';
import SignUp from '../screens/User_Side/Auth/SignUp';
import OnBoarding from '../screens/User_Side/Auth/OnBoarding';
import OnBoarding1 from '../screens/User_Side/Auth/OnBoarding1';
import Onboarding3 from '../screens/User_Side/Auth/Onboarding3';
import Home from '../screens/User_Side/BottomScreens/Home';
import Bottom_Nav from '../Bottom_Navigation/User_Side/Bottom_Nav';
import Damage from '../screens/User_Side/Damage';
import Damage_Detail from '../screens/User_Side/Damage_Detail';
import Bucket from '../screens/User_Side/Bucket';
import Packages from '../screens/User_Side/Packages';
import Appointment_Detail from '../screens/User_Side/Appointment_Detail';
import P_Login from '../screens/Partner_Side/P_Auth/P_Login';
import P_Signup from '../screens/Partner_Side/P_Auth/P_Signup';
import P_Onboarding from '../screens/Partner_Side/P_Auth/P_Onboarding';
import P_Onboarding1 from '../screens/Partner_Side/P_Auth/P_Onboarding1';
import P_Onboarding2 from '../screens/Partner_Side/P_Auth/P_Onboarding2';
import P_Bottom_Navigation from '../Bottom_Navigation/Partner_Side/P_Bottom_Navigation';
import Services_Detail from '../screens/Partner_Side/Services_Detail';
import P_Response from '../screens/Partner_Side/P_Response';
import P_Invoice from '../screens/Partner_Side/P_Invoice';
import Cancel_Appointment_Detail from '../screens/User_Side/Cancel_Appointment_Detail';
import Scanner from '../screens/User_Side/Scanner';
import Languages from '../screens/User_Side/Languages';
import {useSelector} from 'react-redux';
import Forgot from '../screens/User_Side/Auth/Forgot';
import Verify from '../screens/User_Side/Auth/Verify';
import UpdatePassword from '../screens/User_Side/Auth/UpdatePassword';
import Edit_Profile from '../screens/User_Side/Edit_Profile';
import Change_Password from '../screens/User_Side/Change_Password';
import P_Forgot from '../screens/Partner_Side/P_Auth/P_Forgot';
import P_Verify from '../screens/Partner_Side/P_Auth/P_Verify';
import P_UpdatePassword from '../screens/Partner_Side/P_Auth/P_UpdatePassword';
import P_Edit_Profile from '../screens/Partner_Side/P_Edit_Profile';
import P_Change_Password from '../screens/Partner_Side/P_Change_Password';
import Invoice from '../screens/User_Side/Invoice';
import Accepted_Detail from '../screens/Partner_Side/Accepted_Detail';
import Cancelled_Detail from '../screens/Partner_Side/Cancelled_Detail';
import Completed_Detail from '../screens/Partner_Side/Completed_Detail';
import P_Cancel_Reason from '../screens/Partner_Side/P_Cancel_Reason';
import Invoices_List from '../screens/User_Side/Invoices_List';
import Chat_Support from '../screens/Partner_Side/Chat_Support';
const Stack = createNativeStackNavigator();
const Root = () => {
  const user = useSelector(state => state?.user?.user);
  console.log('user on roooooooooot', user);
  const type = useSelector(state => state?.userType?.userType);
  console.log('type on rooot', type);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {type === '' ? (
          <>
            {/* <Stack.Screen component={Languages} name="Languages" /> */}
            <Stack.Screen component={Select} name="Select" />
          </>
        ) : (
          <>
            {type === 'user' ? (
              <>
                {user === null ? (
                  <>
                    <Stack.Screen component={Login} name="Login" />
                    <Stack.Screen component={SignUp} name="SignUp" />
                    <Stack.Screen component={OnBoarding} name="OnBoarding" />
                    <Stack.Screen component={OnBoarding1} name="OnBoarding1" />
                    <Stack.Screen component={Onboarding3} name="OnBoarding3" />
                    <Stack.Screen component={Forgot} name="Forgot" />
                    <Stack.Screen component={Verify} name="Verify" />
                    <Stack.Screen
                      component={UpdatePassword}
                      name="UpdatePassword"
                    />
                  </>
                ) : (
                  <>
                    <Stack.Screen component={Bottom_Nav} name="Bottom_Nav" />
                    <Stack.Screen component={Damage} name="Damage" />
                    <Stack.Screen
                      component={Damage_Detail}
                      name="Damage_Detail"
                    />
                    <Stack.Screen component={Bucket} name="Bucket" />
                    <Stack.Screen component={Packages} name="Packages" />
                    <Stack.Screen
                      component={Appointment_Detail}
                      name="Appointment_Detail"
                    />
                    <Stack.Screen component={Scanner} name="Scanner" />
                    <Stack.Screen
                      component={Edit_Profile}
                      name="Edit_Profile"
                    />

                    <Stack.Screen
                      component={Change_Password}
                      name="Change_Password"
                    />
                    <Stack.Screen
                      component={Cancel_Appointment_Detail}
                      name="Cancel_Appointment_Detail"
                    />
                    <Stack.Screen component={Invoice} name="Invoice" />
                    <Stack.Screen
                      component={Invoices_List}
                      name="Invoices_List"
                    />
                  </>
                )}
              </>
            ) : (
              <>
                {user === null ? (
                  <>
                    <Stack.Screen component={P_Login} name="P_Login" />
                    <Stack.Screen component={P_Signup} name="P_Signup" />
                    <Stack.Screen
                      component={P_Onboarding}
                      name="P_Onboarding"
                    />
                    <Stack.Screen
                      component={P_Onboarding1}
                      name="P_Onboarding1"
                    />
                    <Stack.Screen
                      component={P_Onboarding2}
                      name="P_Onboarding2"
                    />
                    <Stack.Screen component={P_Forgot} name="P_Forgot" />
                    <Stack.Screen component={P_Verify} name="P_Verify" />
                    <Stack.Screen
                      component={P_UpdatePassword}
                      name="P_UpdatePassword"
                    />
                  </>
                ) : (
                  <>
                    <Stack.Screen
                      component={P_Bottom_Navigation}
                      name="P_Bottom_Navigation"
                    />
                    <Stack.Screen
                      component={Services_Detail}
                      name="Services_Detail"
                    />
                    <Stack.Screen component={P_Response} name="P_Response" />
                    <Stack.Screen component={P_Invoice} name="P_Invoice" />
                    <Stack.Screen
                      component={Cancel_Appointment_Detail}
                      name="Cancel_Appointment_Detail"
                    />
                    <Stack.Screen
                      component={P_Edit_Profile}
                      name="P_Edit_Profile"
                    />
                    <Stack.Screen
                      component={P_Change_Password}
                      name="P_Change_Password"
                    />

                    <Stack.Screen
                      component={Accepted_Detail}
                      name="Accepted_Detail"
                    />

                    <Stack.Screen
                      component={Cancelled_Detail}
                      name="Cancelled_Detail"
                    />

                    <Stack.Screen
                      component={Completed_Detail}
                      name="Completed_Detail"
                    />

                    <Stack.Screen
                      component={P_Cancel_Reason}
                      name="P_Cancel_Reason"
                    />
                    <Stack.Screen
                      component={Chat_Support}
                      name="Chat_Support"
                    />
                  </>
                )}
              </>
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;

const styles = StyleSheet.create({});
