import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, fonts, icons, images} from '../../constant/Index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser, setUser} from '../../ReduxToolkit/Auth';
import ImageCropPicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PostAPiwithToken} from '../../components/Apis/Api_Screen';
import Loader from '../../components/Loader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
const Edit_Profile = ({navigation}) => {
  const user = useSelector(state => state?.user?.user);
  console.log('user on  EDIT Profile', user);
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const [image, setImage] = useState(user?.image ? user?.image : null);
  const [phone, setphone] = useState(user?.phone_number);
  const [address, setaddress] = useState(user?.address);
  const [username, setusername] = useState(user?.username);
  const [IsLoading, setIsLoading] = useState(false);

  const pickImage = () => {
    ImageCropPicker.openPicker({
      width: wp(100),
      height: hp(100),
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setImage(image.path);
      })
      .catch(err => console.log(err));
  };

  const _EditAPi = () => {
    setIsLoading(true);

    const formdata = new FormData();

    formdata.append('username', username);
    formdata.append('phone_number', phone);
    formdata.append('address', address);
    {
      image &&
        formdata.append('image', {
          uri: image,
          type: 'image/jpeg',
          name: `image${new Date()}.jpg`,
        });
    }

    PostAPiwithToken({url: 'edit', Token: user.api_token}, formdata)
      .then(res => {
        console.log('...d.sdashiahdh', res);
        if (res.status == 'success') {
          setIsLoading(false);
          dispatch(setUser(res.userdata));
          navigation.navigate('Bottom_Nav', {screen: 'Profile'});
          ToastAndroid.show('Data Updated Successfully!', ToastAndroid.SHORT);

          console.log('res of editprofile ', res);
        } else {
          setIsLoading(false);
          dispatch(setUser(res.userdata));
          navigation.navigate('Bottom_Nav', {screen: 'Profile'});
          ToastAndroid.show('Errorr in Data Updating!', ToastAndroid.SHORT);
        }
      })
      .catch(err => {
        setIsLoading(false);

        console.log('api error', err);
      });
  };
  const Wrapper = Platform.OS == 'ios' ? KeyboardAvoidingView : View;
  const {top} = useSafeAreaInsets();
  return (
    <View style={{flex: 1, backgroundColor: Colors.bback}}>
      <StatusBar translucent={true} />
      {IsLoading && <Loader />}
      <View
        style={{
          flex: 1,
          marginTop: Platform.OS == 'ios' ? top : StatusBar.currentHeight,
        }}>
        <Wrapper behavior="padding" style={{flex: 1}}>
          <ScrollView>
            <ImageBackground
              source={images.profileback}
              style={styles.backimage}>
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Ionicons
                    name="chevron-back-outline"
                    color="white"
                    size={26}
                  />
                </TouchableOpacity>

                <Text style={styles.headerText}>{t('Edit')}</Text>
                <View></View>
              </View>
            </ImageBackground>
            <TouchableOpacity activeOpacity={0.7} onPress={() => pickImage()}>
              <ImageBackground
                source={image ? {uri: image} : {uri: user.image}}
                resizeMode="cover"
                borderRadius={100}
                style={styles.profilepic}>
                <View style={{}}>
                  <Ionicons name="camera" color="white" size={54} />
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <View style={{marginTop: wp(8)}}>
              <View style={styles.input_Box}>
                <Image
                  source={icons.profile}
                  resizeMode="contain"
                  style={styles.profile}
                />
                <TextInput
                  placeholder="username"
                  placeholderTextColor={Colors.gray}
                  style={styles.input}
                  value={username}
                  onChangeText={setusername}
                />
              </View>

              <View style={styles.input_Box}>
                <Image
                  source={icons.mobile}
                  resizeMode="contain"
                  style={styles.profile}
                />
                <TextInput
                  placeholder="Mobile"
                  placeholderTextColor={Colors.gray}
                  style={styles.input}
                  value={phone}
                  onChangeText={setphone}
                />
              </View>

              <View style={styles.input_Box}>
                <Image
                  source={icons.add}
                  resizeMode="contain"
                  style={styles.profile}
                />
                <TextInput
                  placeholder="Address"
                  placeholderTextColor={Colors.gray}
                  style={styles.input}
                  value={address}
                  onChangeText={setaddress}
                />
              </View>
            </View>

            <View style={{marginTop: wp(20)}}>
              <Button
                title={t('Confirm')}
                onPress={() => {
                  // navigation.navigate('Change_Password');
                  _EditAPi();
                }}
              />
            </View>
            <View style={{marginBottom: wp(20)}}></View>
          </ScrollView>
        </Wrapper>
      </View>
    </View>
  );
};

export default Edit_Profile;

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
    borderColor: Colors.white,
    borderRadius: 100,
    marginTop: wp(-22),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input_Box: {
    width: wp(90),
    height: wp(14),
    backgroundColor: Colors.white,
    elevation: 2,
    alignSelf: 'center',
    marginTop: wp(4),
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
