import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, fonts, icons, images} from '../../../constant/Index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from '../../../components/Button';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {PostAPiwithFrom} from '../../../components/Apis/Api_Screen';
import SplashScreen from 'react-native-splash-screen';
import {setUser} from '../../../ReduxToolkit/Auth';
import Loader from '../../../components/Loader';
import {useTranslation} from 'react-i18next';
import {add_language} from '../../../ReduxToolkit/LanguagesSlice';
const Login = ({navigation, route}) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const language = useSelector(state => state.language.value);
  console.log('language------', language);

  const dispatch = useDispatch();

  useEffect(() => {
    if (language === 'fr') {
      dispatch(add_language(language));
    } else if (language === 'en') {
      dispatch(add_language(language));
    } else if (language === 'it') {
      dispatch(add_language(language));
    } else if (language === 'de') {
      dispatch(add_language(language));
    }
  }, [language, dispatch]);
  const {t} = useTranslation();

  const userType = useSelector(state => state.userType.userType);
  console.log('type on on Login', userType);
  // const {type} = route.params;
  // console.log('type', type);
  const _validation = yup.object({
    email: yup
      .string()
      .email(`well that's not an email`)
      .required('please! enter your email')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character',
      ),
  });
  const [IsLoading, setIsLoading] = useState(false);
  const _LoginAPI = (email: string, password: string) => {
    setIsLoading(true);

    const formdata = new FormData();
    formdata.append('email', email);
    formdata.append('password', password);
    formdata.append('type', userType);

    PostAPiwithFrom({url: 'login'}, formdata)
      .then(res => {
        if (res.status == 'success') {
          setIsLoading(false);
          dispatch(setUser(res.userdata));
          ToastAndroid.show('User Loged In successfully!', ToastAndroid.SHORT);

          console.log('res of Login ', res);
        } else {
          setIsLoading(false);
          ToastAndroid.show(
            'Error logging In user account!',
            ToastAndroid.SHORT,
          );
        }
        console.log('res of Login ', res);
      })
      .catch(err => {
        setIsLoading(false);

        console.log('api error', err);
      });
  };
  const Wrapper = Platform.OS == 'ios' ? KeyboardAvoidingView : View;
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        userType,
      }}
      validateOnMount={true}
      onSubmit={values => {
        // console.log('values', values);
        _LoginAPI(values.email, values.password, userType);
        // navigation.navigate('Bottom_Nav');
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
              marginTop: StatusBar.currentHeight,
            }}>
            <Wrapper behavior="padding" style={{flex: 1}}>
              <ScrollView>
                <Text style={styles.header_text}>{t('logintocontinue')}</Text>
                <Image
                  source={icons.logo}
                  style={styles.logo}
                  resizeMode="contain"
                />

                <View style={{marginTop: wp(8)}}>
                  <View style={styles.input_Box}>
                    <Image
                      source={icons.email}
                      resizeMode="contain"
                      style={styles.profile}
                    />
                    <TextInput
                      placeholder={t('email')}
                      placeholderTextColor={Colors.verylightgray}
                      style={styles.input}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />
                  </View>
                  {errors.email && touched.email && (
                    <Text style={[styles.errortxt]}>{errors.email}</Text>
                  )}

                  <View style={styles.input_Box}>
                    <Image
                      source={icons.lock}
                      resizeMode="contain"
                      style={styles.profile}
                    />
                    <TextInput
                      placeholder={t('password')}
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
                </View>

                <TouchableOpacity
                  style={styles.fpass}
                  onPress={() => navigation.navigate('Forgot')}>
                  <Text style={styles.forget}>{t('forgotpassword')}?</Text>
                </TouchableOpacity>

                <View style={{marginTop: wp(22)}}>
                  <Button
                    title={t('login')}
                    onPress={() => {
                      handleSubmit();
                    }}
                  />
                </View>

                <TouchableOpacity
                  style={styles.acc_status}
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.navigate('SignUp', {});
                  }}>
                  <Text style={styles.text}>
                    {t('Donthaveanaccount')}{' '}
                    <Text style={styles.create}>{t('Create')}</Text>
                  </Text>
                </TouchableOpacity>
                <View style={{marginBottom: wp(6)}}></View>
              </ScrollView>
            </Wrapper>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Login;

const styles = StyleSheet.create({
  header_text: {
    textAlign: 'center',
    color: Colors.black,
    fontFamily: fonts.REGULAR,
    fontSize: 18,
    marginTop: wp(20),
  },
  logo: {
    width: wp(25),
    height: wp(25),
    // resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: wp(10),
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
  forget: {
    fontSize: 14,
    fontFamily: fonts.REGULAR,
    color: Colors.gray,
  },
  fpass: {
    marginRight: wp(6),
    marginTop: wp(2),
    alignSelf: 'flex-end',
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.REGULAR,
    color: Colors.black,
    textAlign: 'center',
  },
  create: {
    color: Colors.green,
    textDecorationLine: 'underline',
    fontFamily: fonts.BOLD,
  },
  acc_status: {
    marginTop: wp(10),
  },
  errortxt: {
    fontSize: 10,
    color: 'red',
    fontFamily: fonts.REGULAR,
    marginLeft: wp(10),
    marginRight: wp(5),
  },
});
