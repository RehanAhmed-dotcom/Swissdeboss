import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, fonts, icons, images} from '../../../constant/Index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from '../../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../../../ReduxToolkit/Auth';
import Loader from '../../../components/Loader';
import {useFocusEffect} from '@react-navigation/native';
import {AllGetAPI} from '../../../components/Apis/Api_Screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {setUserTypeEmpty} from '../../../ReduxToolkit/Select_Type';
import {useTranslation} from 'react-i18next';
const P_Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const user = useSelector(state => state?.user?.user);
  const [getadmin, setgetadmin] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const _ADminApi = () => {
    setIsLoading(true);

    AllGetAPI({url: 'getAdmin', Token: user?.api_token})
      .then(res => {
        console.log('Admin......l[lldlladaddlald', res);
        setIsLoading(false);
        setgetadmin(res.data);
      })
      .catch(err => {
        setIsLoading(false);
        console.log('api error', err);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      _ADminApi();
    }, []),
  );
  const {top} = useSafeAreaInsets();

  return (
    <View style={{flex: 1, backgroundColor: Colors.bback}}>
      {IsLoading && <Loader />}
      <StatusBar translucent={true} />
      <View
        style={{
          flex: 1,
          marginTop: Platform.OS == 'ios' ? top : StatusBar.currentHeight,
        }}>
        <ScrollView>
          <ImageBackground source={images.profileback} style={styles.backimage}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(logoutUser());
                  dispatch(setUserTypeEmpty());
                }}>
                <Image
                  source={icons.logout}
                  resizeMode="contain"
                  style={styles.icon}
                />
              </TouchableOpacity>

              <Text style={styles.headerText}>{t('Profile')}</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('P_Edit_Profile');
                }}>
                <Image
                  source={icons.edit}
                  resizeMode="contain"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>

          <View style={styles.circle}>
            <Image
              source={user.image ? {uri: user.image} : images.profile}
              resizeMode="cover"
              style={styles.profilepic}
            />
          </View>

          <View style={{marginTop: wp(8)}}>
            <View style={styles.input_Box}>
              <Image
                source={icons.profile}
                resizeMode="contain"
                style={styles.profile}
              />
              <Text style={styles.input}>{user?.username}</Text>
            </View>

            <View style={styles.input_Box}>
              <Image
                source={icons.email}
                resizeMode="contain"
                style={styles.profile}
              />
              <Text style={styles.input}>{user?.email}</Text>
            </View>

            <View style={styles.input_Box}>
              <Image
                source={icons.mobile}
                resizeMode="contain"
                style={styles.profile}
              />
              <Text style={styles.input}>{user?.phone_number}</Text>
            </View>

            <View style={styles.input_Box}>
              <Image
                source={icons.add}
                resizeMode="contain"
                style={styles.profile}
              />
              <Text
                style={[
                  styles.input,
                  {
                    // paddingVertical: wp(2),
                  },
                ]}>
                {user?.address}
              </Text>
            </View>
          </View>

          <View style={{marginTop: wp(20)}}>
            <Button
              title={t('ChatSupport')}
              onPress={() => {
                navigation.navigate('Chat_Support', {getadmin: getadmin});
              }}
            />
          </View>

          <View style={{marginTop: wp(4)}}>
            <Button
              title={t('ChangePassword')}
              onPress={() => {
                navigation.navigate('P_Change_Password');
              }}
            />
          </View>
          <View style={{marginBottom: wp(20)}}></View>
        </ScrollView>
      </View>
    </View>
  );
};

export default P_Profile;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    alignItems: 'center',
    marginTop: wp(6),
  },
  headerText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: fonts.BOLD,
  },
  backimage: {
    width: wp(100),
    height: wp(50),
    // backgroundColor: 'red',
  },
  icon: {
    width: wp(6),
    height: wp(6),
  },
  profilepic: {
    width: wp(25),
    height: wp(25),
    borderWidth: 3,
    borderColor: Colors.white,
    borderRadius: 100,
    marginTop: wp(-22),
  },
  circle: {
    alignSelf: 'center',
  },
  input_Box: {
    width: wp(90),
    paddingVertical: wp(3),
    backgroundColor: Colors.white,
    elevation: 2,
    alignSelf: 'center',
    marginTop: wp(4),
    marginBottom: wp(1),
    borderRadius: 20,
    shadowColor: Colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    borderWidth: 0.5,
    borderColor: Colors.verylightgray,
  },
  profile: {
    width: wp(6),
    height: wp(6),
  },
  input: {
    fontFamily: fonts.REGULAR,
    flex: 1,
    paddingLeft: wp(2),
    color: Colors.black,
  },
});
