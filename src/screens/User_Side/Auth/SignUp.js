import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ToastAndroid,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, fonts, icons, images} from '../../../constant/Index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImageCropPicker from 'react-native-image-crop-picker';
import Button from '../../../components/Button';
import {Formik} from 'formik';
import * as yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PostAPiwithFrom} from '../../../components/Apis/Api_Screen';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../../ReduxToolkit/Auth';
import Loader from '../../../components/Loader';
import {useTranslation} from 'react-i18next';

const SignUp = ({navigation, route}) => {
  const type = useSelector(state => state?.userType?.userType);
  console.log('type on on Signup', type);
  const {t} = useTranslation();

  const pickImage = async setFieldValue => {
    try {
      const image = await ImageCropPicker.openPicker({
        width: wp(25),
        height: wp(25),
        cropping: true,
      });
      console.log('image', image);
      if (image && image.path) {
        setFieldValue('image', image.path); // Update Formik field 'image' with the selected image path
      } else {
        console.error('No image path found');
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const _validationSchema = yup.object({
    username: yup.string().required('User name is required.'),
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
    mobile: yup.string().required('Mobile number is required'),
    address: yup.string().required('Address  is required'),
  });
  const [IsLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const _registerAPI = (
    username: string,
    email: string,
    password: string,
    mobile: string,
    address: string,
    image: string,
  ) => {
    setIsLoading(true);

    const formdata = new FormData();
    formdata.append('type', type);
    formdata.append('username', username);
    formdata.append('email', email);
    formdata.append('password', password);
    formdata.append('phone_number', mobile);
    formdata.append('address', address);
    if (image) {
      formdata.append('image', {
        uri: image,
        type: 'image/jpeg',
        name: `image${new Date()}.jpg`,
      });
    }

    PostAPiwithFrom({url: 'register'}, formdata)
      .then(res => {
        if (res.status == 'success') {
          setIsLoading(false);
          dispatch(setUser(res.userdata));
          ToastAndroid.show(
            'Your Account has been created!',
            ToastAndroid.SHORT,
          );

          console.log('res of register ', res);
        } else {
          setIsLoading(false);
          console.log('res of register else ', res);

          ToastAndroid.show('Error creating user account!', ToastAndroid.SHORT);
        }
        console.log('res of register ', res);
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
        username: '',
        password: '',
        email: '',
        mobile: '',
        address: '',
        image: '',
        type,
      }}
      validateOnMount={true}
      onSubmit={values => {
        _registerAPI(
          values.username,
          values.email,
          values.password,
          values.mobile,
          values.address,
          values.image,
          type,
        );
      }}
      validationSchema={_validationSchema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
        setFieldValue,
      }) => (
        <View style={{flex: 1, backgroundColor: Colors.white}}>
          <StatusBar
            barStyle="dark-content"
            translucent={true}
            backgroundColor={Colors.white}
          />
          {IsLoading && <Loader />}
          <View
            style={{
              flex: 1,
              marginTop: StatusBar.currentHeight,
            }}>
            <Wrapper behavior="padding">
              <ScrollView>
                <Text style={styles.header_text}>{t('CreateAccount')}</Text>
                <TouchableOpacity
                  style={styles.too}
                  onPress={() => pickImage(setFieldValue)}>
                  <Image
                    source={values.image ? {uri: values.image} : images.avatar}
                    resizeMode="contain"
                    style={styles.profile}
                    borderRadius={100}
                  />
                </TouchableOpacity>

                <View style={{marginTop: wp(6)}}>
                  <View style={styles.input_Box}>
                    <Image
                      source={icons.profile}
                      resizeMode="contain"
                      style={styles.icon}
                    />
                    <TextInput
                      placeholder={t('Username')}
                      placeholderTextColor={Colors.verylightgray}
                      style={styles.input}
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      value={values.username}
                    />
                  </View>

                  {errors.username && touched.username && (
                    <Text style={[styles.errortxt]}>{errors.username}</Text>
                  )}

                  <View style={styles.input_Box}>
                    <Image
                      source={icons.lock}
                      resizeMode="contain"
                      style={styles.icon}
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

                  <View style={styles.input_Box}>
                    <Image
                      source={icons.email}
                      resizeMode="contain"
                      style={styles.icon}
                    />
                    <TextInput
                      placeholder="E-mail"
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
                      source={icons.mobile}
                      resizeMode="contain"
                      style={styles.icon}
                    />
                    <TextInput
                      placeholder={t('Mobile')}
                      placeholderTextColor={Colors.verylightgray}
                      style={styles.input}
                      keyboardType="phone-pad"
                      onChangeText={handleChange('mobile')}
                      onBlur={handleBlur('mobile')}
                      value={values.mobile}
                    />
                  </View>

                  {errors.mobile && touched.mobile && (
                    <Text style={[styles.errortxt]}>{errors.mobile}</Text>
                  )}

                  <View style={styles.input_Box}>
                    <Image
                      source={icons.address}
                      resizeMode="contain"
                      style={styles.icon}
                    />
                    <TextInput
                      placeholder={t('Address')}
                      placeholderTextColor={Colors.verylightgray}
                      style={styles.input}
                      onChangeText={handleChange('address')}
                      onBlur={handleBlur('address')}
                      value={values.address}
                    />
                  </View>
                  {errors.address && touched.address && (
                    <Text style={[styles.errortxt]}>{errors.address}</Text>
                  )}
                </View>

                <View style={{marginTop: wp(16)}}>
                  <Button
                    title={t('Signup')}
                    onPress={() => {
                      handleSubmit();
                    }}
                  />
                </View>

                <TouchableOpacity
                  style={styles.acc_status}
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.navigate('Login');
                  }}>
                  <Text style={styles.text}>
                    {t('Alreadyhaveanaccount')}?{' '}
                    <Text style={styles.create}>{t('login')}</Text>
                  </Text>
                </TouchableOpacity>

                <View style={{marginBottom: wp(10)}}></View>
              </ScrollView>
            </Wrapper>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  header_text: {
    textAlign: 'center',
    color: Colors.black,
    fontFamily: fonts.REGULAR,
    fontSize: 18,
    marginTop: wp(18),
  },
  profile: {
    width: wp(25),
    height: wp(25),
  },
  too: {
    alignSelf: 'center',
    marginTop: wp(6),
  },
  input_Box: {
    width: wp(90),
    height: wp(14),
    backgroundColor: Colors.white,
    elevation: 2,
    alignSelf: 'center',
    marginTop: wp(6),
    marginBottom: wp(1),
    borderRadius: 100,
    shadowColor: Colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    borderWidth: 0.5,
    borderColor: Colors.verylightgray,
  },
  icon: {
    width: wp(6),
    height: wp(6),
  },
  input: {
    fontFamily: fonts.REGULAR,
    flex: 1,
    paddingLeft: wp(2),
    color: Colors.black,
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
  imageerr: {
    fontSize: 10,
    color: 'red',
    fontFamily: fonts.REGULAR,
    textAlign: 'center',
    marginTop: wp(2),
  },
});
