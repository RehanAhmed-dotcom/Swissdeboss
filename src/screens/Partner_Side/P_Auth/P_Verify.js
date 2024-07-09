import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, fonts, icons} from '../../../constant/Index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../../components/Button';
import {Formik} from 'formik';
import * as yup from 'yup';
import {PostAPiwithFrom} from '../../../components/Apis/Api_Screen';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Loader from '../../../components/Loader';
import {useTranslation} from 'react-i18next';

const CELL_COUNT = 4;
const P_Verify = ({navigation, route}) => {
  const {t} = useTranslation();

  const {email} = route.params;
  console.log('email---------------', email);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [IsLoading, setIsLoading] = useState(false);

  const verifyApi = async () => {
    setIsLoading(true);
    const response = await fetch(
      'https://intechsol-developer.co/swissdeboss/api/confirm-code',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pin: value,
          email,
        }),
      },
    )
      .then(response => response.json())
      .then(response => {
        console.log('response', response);
        if (response.status == 'success') {
          navigation.navigate('P_UpdatePassword', {value, email});
          console.log(response);
          setIsLoading(false);
        } else if (value === '') {
          ToastAndroid.show('Enter Values', ToastAndroid.SHORT);
          setIsLoading(false);
        } else {
          ToastAndroid.show(
            'This password reset token is invalid',
            ToastAndroid.SHORT,
          );
          setIsLoading(false);
        }
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      {IsLoading && <Loader />}
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
              <Ionicons name="chevron-back-outline" color="black" size={26} />
            </TouchableOpacity>

            <Text style={styles.header_text}>{t('Verification')}</Text>
            <View></View>
          </View>
          <Text style={styles.text}>{t('Entersecuritycode')}</Text>
          <View style={{marginTop: wp(16), paddingHorizontal: wp(10)}}>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <View
                  style={{
                    width: wp(14),
                    height: wp(14),
                    backgroundColor: 'white',
                    shadowOffset: {height: 2, width: 2},
                    elevation: 2,
                    shadowColor: 'black',
                    shadowOpacity: 0.2,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
          </View>

          <View style={{marginTop: wp(30), marginBottom: wp(10)}}>
            <Button
              title={t('Verify')}
              onPress={() => {
                verifyApi();
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default P_Verify;

const styles = StyleSheet.create({
  header: {
    height: wp(20),
    paddingHorizontal: wp(5),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  header_text: {
    fontSize: 18,
    fontFamily: fonts.BOLD,
    color: 'black',
  },
  text: {
    fontSize: 14,
    color: Colors.gray,
    fontFamily: fonts.REGULAR,
    textAlign: 'center',
    paddingHorizontal: wp(12),
    lineHeight: 24,
    marginTop: wp(20),
  },
  input_field: {
    width: wp(90),
    height: wp(12),
    backgroundColor: 'white',
    elevation: 2,
    alignSelf: 'center',
    marginTop: wp(10),
    marginBottom: wp(2),
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input_Box: {
    width: wp(90),
    height: wp(14),
    backgroundColor: Colors.white,
    elevation: 2,
    alignSelf: 'center',
    marginTop: wp(8),
    marginBottom: wp(1),
    borderRadius: 100,
    shadowColor: Colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    borderWidth: 0.5,
    borderColor: Colors.verylightgray,
    marginTop: wp(20),
  },
  profile: {
    width: wp(5),
    height: wp(5),
  },
  input: {
    fontFamily: fonts.REGULAR,
    flex: 1,
    paddingLeft: wp(2),
    color: Colors.black,
  },
  errortxt: {
    fontSize: 10,
    fontFamily: fonts.REGULAR,
    color: 'red',
    marginLeft: wp(10),
  },

  cell: {
    fontFamily: fonts.REGULAR,
    textAlignVertical: 'center',
    color: Colors.black,
  },
  focusCell: {
    // fontSize:29
  },
});
