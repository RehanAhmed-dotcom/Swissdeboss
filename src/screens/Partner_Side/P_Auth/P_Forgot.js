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
import Loader from '../../../components/Loader';
import {useTranslation} from 'react-i18next';
const P_Forgot = ({navigation}) => {
  const {t} = useTranslation();

  const _validation = yup.object({
    email: yup
      .string()
      .email(`well that's not an email`)
      .required('please! enter your email')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),
  });

  const [IsLoading, setIsLoading] = useState(false);

  const _ForgotApiAPI = (email: string) => {
    setIsLoading(true);

    const formdata = new FormData();
    formdata.append('email', email);

    PostAPiwithFrom({url: 'forgot'}, formdata)
      .then(res => {
        if (res.status == 'success') {
          setIsLoading(false);
          navigation.navigate('P_Verify', {email});
          ToastAndroid.show(
            'Code Sent to your email! Check email',
            ToastAndroid.SHORT,
          );

          console.log('res of Login ', res);
        } else {
          setIsLoading(false);
          ToastAndroid.show('Enter correct email!', ToastAndroid.SHORT);
        }
        console.log('res of Login ', res);
      })
      .catch(err => {
        setIsLoading(false);

        console.log('api error', err);
      });
  };

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validateOnMount={true}
      onSubmit={values => {
        _ForgotApiAPI(values.email);
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

                <Text style={styles.header_text}>{t('forgotpassword')}</Text>
                <View></View>
              </View>
              <Text style={styles.text}>{t('resetpasswordinfo')}</Text>
              <View style={styles.input_Box}>
                <Image
                  source={icons.email}
                  resizeMode="contain"
                  style={styles.profile}
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

              <View style={{marginTop: wp(30), marginBottom: wp(10)}}>
                <Button
                  title="Next"
                  onPress={() => {
                    handleSubmit();
                  }}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default P_Forgot;

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
});
