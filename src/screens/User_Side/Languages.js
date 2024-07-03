import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Switch,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import SplashScreen from 'react-native-splash-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Button from '../../components/Button';
import {Colors, fonts, images, icons} from '../../constant/Index';
//   import {useDispatch, useSelector} from 'react-redux';
//   import {setCurrentLanguage} from '../../redux/LanguagesSlice';
//   import {LangData} from '../../Data/Index';
const Languages = ({navigation}) => {
  // const lang = useSelector(state => state.language.currentLanguage);
  // const dispatch = useDispatch();
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  //   const [ln, setln] = useState(lang ? lang : 'English');
  const [ln, setln] = useState('English');

  const setlanguage = () => {
    //   dispatch(setCurrentLanguage(ln));
    navigation.navigate('Select');
  };
  // const currentlanguage = LangData[lang ? lang : 'English'];
  return (
    <View style={{flex: 1, backgroundColor: Colors.whitesmoke}}>
      <View style={styles.header}>
        <View></View>
        <Text style={styles.header_text}>Languages</Text>
        <View></View>
      </View>

      <ScrollView
        contentContainerStyle={{}}
        style={{
          // marginHorizontal: '5%',
          height: '65%',
        }}>
        <View style={{marginTop: wp(8)}}></View>
        {/* <Text style={styles.text}>{currentlanguage['20']}</Text> */}
        <TouchableOpacity activeOpacity={1} onPress={() => setln('English')}>
          <View style={styles.list}>
            <Text
              style={[
                styles.lng,
                {
                  color: ln == 'English' ? Colors.wild : 'black',
                },
              ]}>
              English
            </Text>

            <Icon1
              name={
                ln == 'English'
                  ? 'radio-button-checked'
                  : 'radio-button-unchecked'
              }
              size={22}
              color={ln == 'English' ? Colors.wild : 'black'}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={() => setln('French')}>
          <View style={styles.list}>
            <Text
              style={[
                styles.lng,
                {
                  color: ln == 'French' ? Colors.wild : 'black',
                },
              ]}>
              French
            </Text>

            <Icon1
              name={
                ln == 'French'
                  ? 'radio-button-checked'
                  : 'radio-button-unchecked'
              }
              size={22}
              color={ln == 'French' ? Colors.wild : 'black'}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={1} onPress={() => setln('German')}>
          <View style={styles.list}>
            <Text
              style={[
                styles.lng,
                {
                  color: ln == 'German' ? Colors.wild : 'black',
                },
              ]}>
              German
            </Text>

            <Icon1
              name={
                ln == 'German'
                  ? 'radio-button-checked'
                  : 'radio-button-unchecked'
              }
              size={22}
              color={ln == 'German' ? Colors.wild : 'black'}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={1} onPress={() => setln('Italian')}>
          <View style={styles.list}>
            <Text
              style={[
                styles.lng,
                {
                  color: ln == 'Italian' ? Colors.wild : 'black',
                },
              ]}>
              Italian
            </Text>

            <Icon1
              name={
                ln == 'Italian'
                  ? 'radio-button-checked'
                  : 'radio-button-unchecked'
              }
              size={22}
              color={ln == 'Italian' ? Colors.wild : 'black'}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* <TouchableOpacity
            // onPress={() => setlanguage()}
            >
              <View style={styles.button}>
                <Text style={styles.button_text}>Apply</Text>
              </View>
            </TouchableOpacity> */}
      <View style={{paddingVertical: wp(4)}}>
        <Button
          title="Done"
          onPress={() => {
            setlanguage();
          }}
        />
      </View>
    </View>
  );
};

export default Languages;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    height: hp(10),
    width: wp(100),
    marginTop: wp(2),
    elevation: 2,
  },
  back_circle: {
    width: wp(10),
    height: wp(10),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
  },
  upper_back_circle: {
    width: wp(9),
    height: wp(9),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  back: {
    width: wp(4.5),
    height: wp(4.5),
  },
  header_text: {
    fontSize: 18,
    color: Colors.wild,
    fontFamily: fonts.BOLD,
    marginRight: wp(4),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(90),
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: wp(4),
  },
  text: {
    fontSize: 14,
    color: Colors.lightgray,
    fontFamily: fonts.REGULAR,
    textAlign: 'center',
    paddingHorizontal: wp(8),
    paddingVertical: wp(6),
  },
  viw: {
    // flex: 1,
    // height: '80%',
    marginHorizontal: '5%',
    marginTop: '6%',
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2.5%',
    // backgroundColor: '#7B7D7D',
    width: wp(90),
    height: wp(14),
    borderRadius: 10,
    backgroundColor: Colors.white,
    borderRadius: 15,
    elevation: 2,
    alignSelf: 'center',
    paddingHorizontal: wp(2),
  },
  lng: {
    color: 'black',
    fontFamily: fonts.BOLD,
    fontSize: 14,
    letterSpacing: 1,
  },
  cancel: {
    color: 'black',
    fontFamily: Colors.wild,
    fontSize: 14,
    textAlign: 'center',
  },
  apply: {
    color: 'black',
    fontFamily: Colors.wild,
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    width: wp(60),
    height: hp(8),
    marginVertical: wp(2),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderRadius: 15,
    backgroundColor: 'red',
  },
  button_text: {
    fontSize: 16,
    fontFamily: fonts.BOLD,
    color: Colors.wild,
  },
});
