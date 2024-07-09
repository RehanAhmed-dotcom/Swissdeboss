import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useTransition} from 'react';
import {Colors, fonts, icons, images} from '../../../constant/Index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../../ReduxToolkit/Auth';
import {setUserType} from '../../../ReduxToolkit/Select_Type';
import SplashScreen from 'react-native-splash-screen';
import i18n from '../../../components/i18n';
import {useTranslation} from 'react-i18next';
const Select = ({navigation}) => {
  // const lang = useSelector(state => state.language.value);
  // console.log('lldlkadjahdagdugaudgjaggdaad', lang);

  const dispatch = useDispatch();
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const {t} = useTranslation();
  console.log('jdkjda', t);
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <ImageBackground source={images.selectback} style={{flex: 1}}>
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor={'transparent'}
        />
        <View
          style={{
            flex: 1,
            marginTop: StatusBar.currentHeight,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.row}>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.icon_back}
                activeOpacity={0.9}
                onPress={() => {
                  navigation.navigate('Login', {type: 'user'});
                  dispatch(setUserType('user'));
                }}>
                <Image
                  source={icons.user}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text style={styles.type}>{t('User')}</Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.icon_back}
                activeOpacity={0.9}
                onPress={() => {
                  dispatch(setUserType('partner'));
                }}>
                <Image
                  source={icons.partner}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text style={styles.type}>{t('Partner')}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(65),
  },
  icon_back: {
    width: wp(25),
    height: wp(25),
    backgroundColor: Colors.white,
    elevation: 2,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: wp(20),
    height: wp(20),
  },
  type: {
    fontSize: 16,
    fontFamily: fonts.BOLD,
    color: '#262626',
    marginTop: wp(4),
  },
});
