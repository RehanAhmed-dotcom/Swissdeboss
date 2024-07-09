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
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, fonts, icons, images} from '../../constant/Index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Formik} from 'formik';
import * as yup from 'yup';
import Button from '../../components/Button';
import {useSelector} from 'react-redux';
import {PostAPiwithToken} from '../../components/Apis/Api_Screen';
import Loader from '../../components/Loader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
const Change_Password = ({navigation}) => {
  const user = useSelector(state => state?.user?.user);
  console.log('user on change password', user);

  const _validation = yup.object({
    oldpassword: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Old Password is required')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character',
      ),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('New Password is required')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character',
      ),
    repassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });
  const [IsLoading, setIsLoading] = useState(false);

  const _ChangePasswordAPI = (
    oldpassword: string,
    password: string,
    repassword: string,
  ) => {
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append('old_password', oldpassword);
    formdata.append('password', password);
    formdata.append('password_confirmation', repassword);

    PostAPiwithToken({url: 'change-password', Token: user?.api_token}, formdata)
      .then(res => {
        if (res.status == 'success') {
          setIsLoading(false);
          navigation.navigate('Bottom_Nav');
          ToastAndroid.show(
            'Password Changed successfully!',
            ToastAndroid.SHORT,
          );
          // console.log('Password Changed successfully', res);
        } else {
          setIsLoading(false);
          ToastAndroid.show(
            'Password Changed successfully!',
            ToastAndroid.SHORT,
          );
        }
        // console.log('Password Changed successfully', res);
      })
      .catch(err => {
        setIsLoading(false);

        console.log('api error', err);
      });
  };
  const Wrapper = Platform.OS == 'ios' ? KeyboardAvoidingView : View;
  const {top} = useSafeAreaInsets();
  const {t} = useTranslation();
  return (
    <Formik
      initialValues={{
        oldpassword: '',
        password: '',
        repassword: '',
      }}
      validateOnMount={true}
      onSubmit={values => {
        _ChangePasswordAPI(
          values.oldpassword,
          values.password,
          values.repassword,
        );
      }}
      validationSchema={_validation}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
      }) => (
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
              marginTop: Platform.OS == 'ios' ? top : StatusBar.currentHeight,
            }}>
            <Wrapper behavior="padding" style={{flex: 1}}>
              <ScrollView>
                <View style={styles.header}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Ionicons
                      name="chevron-back-outline"
                      color="black"
                      size={26}
                    />
                  </TouchableOpacity>

                  <Text style={styles.header_text}>{t('ChangePassword')}</Text>
                  <View></View>
                </View>
                <Image
                  source={images.change}
                  resizeMode="contain"
                  style={{
                    width: wp(60),
                    height: wp(40),
                    alignSelf: 'center',
                    marginTop: wp(10),
                    marginBottom: wp(10),
                  }}
                />
                <View style={styles.input_Box}>
                  <Image
                    source={icons.lock}
                    resizeMode="contain"
                    style={styles.profile}
                  />
                  <TextInput
                    placeholder={t('OldPassword')}
                    placeholderTextColor={Colors.verylightgray}
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={handleChange('oldpassword')}
                    onBlur={handleBlur('oldpassword')}
                    value={values.oldpassword}
                  />
                </View>
                {errors.oldpassword && touched.oldpassword && (
                  <Text style={[styles.errortxt]}>{errors.oldpassword}</Text>
                )}

                <View style={styles.input_Box}>
                  <Image
                    source={icons.lock}
                    resizeMode="contain"
                    style={styles.profile}
                  />
                  <TextInput
                    placeholder={t('NewPassword')}
                    placeholderTextColor={Colors.verylightgray}
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                </View>
                {errors.password && touched.password && (
                  <Text style={[styles.errortxt]}>{errors.password}</Text>
                )}

                <View style={styles.input_Box}>
                  <Image
                    source={icons.lock}
                    resizeMode="contain"
                    style={styles.profile}
                  />
                  <TextInput
                    placeholder={t('ConfirmPassword')}
                    placeholderTextColor={Colors.verylightgray}
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={handleChange('repassword')}
                    onBlur={handleBlur('repassword')}
                    value={values.repassword}
                  />
                </View>
                {errors.repassword && touched.repassword && (
                  <Text style={[styles.errortxt]}>{errors.repassword}</Text>
                )}
                <View style={{marginTop: wp(30), marginBottom: wp(10)}}>
                  <Button
                    title={t('Confirm')}
                    onPress={() => {
                      handleSubmit();
                    }}
                  />
                </View>
              </ScrollView>
            </Wrapper>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Change_Password;

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
    marginTop: wp(4),
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
    marginTop: wp(4),
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
});
