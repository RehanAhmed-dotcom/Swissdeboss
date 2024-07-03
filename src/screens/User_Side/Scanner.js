import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Colors, fonts, icons, images} from '../../constant/Index';
import Carousel from 'react-native-reanimated-carousel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Back from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import Button from '../../components/Button';
import {useSelector} from 'react-redux';
import Loader from '../../components/Loader';
import {PostAPiwithToken} from '../../components/Apis/Api_Screen';
const Scanner = ({navigation, route}) => {
  const user = useSelector(state => state?.user?.user);
  const {id, SelectedDate, SelectedTime, note, address} = route.params;
  const device = useCameraDevice('back');
  if (device == null) return <ActivityIndicator />;

  const [imageData, setImageData] = useState([]);
  const [clickPicture, setClickPicture] = useState(false);
  console.log('imageDataimageDataimageDataimageData', imageData);

  const camera = useRef(null);
  const camera_permission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    const newMicrophonePermission = await Camera.requestMicrophonePermission();
    console.log('newCameraPermission', newCameraPermission);
  };
  useEffect(() => {
    camera_permission();
  }, []);

  const takepicture = async () => {
    if (camera != null) {
      const photo = await camera.current.takePhoto();
      console.log('photo///////////', photo);

      setImageData([...imageData, {image: photo.path}]);
    }
  };
  const [IsLoading, setIsLoading] = useState(false);
  const _AddNewAppointmentAPi = () => {
    setIsLoading(true);

    const formdata = new FormData();

    formdata.append('package_id', id);
    formdata.append('time', SelectedTime);
    formdata.append('date', SelectedDate);
    formdata.append('address', address);
    formdata.append('description', note);

    imageData.forEach((element, index) => {
      const {image} = element;
      const uri = `file://${image}`;
      formdata.append('images[]', {
        uri,
        type: 'image/jpeg',
        name: `image${index}_${new Date().toISOString()}.jpg`,
      });
    });

    PostAPiwithToken({url: 'addappointment', Token: user.api_token}, formdata)
      .then(res => {
        console.log('res', res);
        if (res.status == 'success') {
          setIsLoading(false);

          // thankyouSheet.current.open();
          // refRBSheet.current.close();

          ToastAndroid.show('Data Updated Successfully!', ToastAndroid.SHORT);
          navigation.navigate('Bottom_Nav');
          console.log('res of editprofile ', res);
        } else {
          setIsLoading(false);
          ToastAndroid.show('Errorr in Data Updating!', ToastAndroid.SHORT);
        }
        console.log('res of addappointment ', res);
      })
      .catch(err => {
        setIsLoading(false);

        console.log('api error', err);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.bback}}>
      <StatusBar translucent={true} />
      {IsLoading && <Loader />}
      <View
        style={{
          flex: 1,
          marginTop: StatusBar.currentHeight,
        }}>
        {clickPicture === false ? (
          <View style={{flex: 1}}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Back name="chevron-back-outline" color="#003C3C" size={22} />
              </TouchableOpacity>
              <Text style={styles.headerText}>Hail Scanner</Text>
              <View></View>
            </View>

            {imageData == '' ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  //   backgroundColor: 'pink',
                }}>
                <Image
                  source={icons.noimages}
                  resizeMode="contain"
                  style={styles.noimages}
                />

                <Text style={styles.text}>You don’t have any file here.</Text>
                <Text style={styles.des}>
                  Sync docs accross smartphones, tablets, and computers
                </Text>

                <Image
                  source={icons.arrow}
                  resizeMode="contain"
                  style={styles.arrow}
                />
              </View>
            ) : (
              <View style={{flex: 1}}>
                <ScrollView>
                  <Text style={styles.recent}>Recents</Text>
                  <Carousel
                    data={imageData}
                    width={wp(100)}
                    height={wp(100)}
                    style={{alignSelf: 'center'}}
                    mode="parallax"
                    renderItem={({item}) => (
                      <ImageBackground
                        source={{uri: 'file://' + item.image}}
                        borderRadius={20}
                        style={{
                          width: wp(100),
                          height: wp(100),
                          alignSelf: 'center',
                          justifyContent: 'flex-end',
                        }}>
                        <View style={styles.itemView}>
                          <Text style={styles.scantext}>
                            Scan 01:11:2020 03:57:06
                          </Text>
                          <View style={styles.row}>
                            <Text style={styles.day}>Today</Text>
                            <Text style={styles.image}>Image</Text>
                          </View>
                        </View>
                      </ImageBackground>
                    )}
                  />

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      if (imageData.length !== 0) {
                        _AddNewAppointmentAPi();
                      } else {
                        ToastAndroid.show('Add Images!', ToastAndroid.SHORT);
                      }
                    }}>
                    <Text style={styles.Button_text}>
                      Send Images & Book An Appointment
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            )}

            <View style={styles.bottom}>
              <TouchableOpacity
                onPress={() => {
                  // _AddNewAppointmentAPi();
                }}>
                <Image
                  source={icons.data}
                  resizeMode="contain"
                  style={styles.data}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setClickPicture(true);
                }}
                activeOpacity={0.7}
                style={styles.scan_container}>
                <AntDesign name="plus" size={22} color={Colors.white} />
                <Text style={styles.scan_text}>Scan</Text>
              </TouchableOpacity>
              <View></View>
            </View>
          </View>
        ) : (
          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <Camera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                photo={true}
              />
            </View>
            <View style={styles.camera_bottom}>
              <View style={styles.image_contaier}>
                <Ionicons name="image" size={26} color={Colors.green} />
              </View>
              <TouchableOpacity
                onPress={() => {
                  takepicture();
                }}
                style={styles.click}></TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setClickPicture(false);
                }}>
                <Text style={styles.cancel}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Scanner;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    alignItems: 'center',
    marginTop: wp(6),
  },
  headerText: {
    color: Colors.wild,
    fontSize: 18,
    fontFamily: fonts.BOLD,
  },
  noimages: {
    width: wp(30),
    height: wp(30),
    // backgroundColor: 'red',
    marginTop: wp(40),
  },
  text: {
    fontSize: 14,
    color: Colors.verylightgray,
    fontFamily: fonts.BOLD,
    marginTop: wp(8),
  },
  des: {
    fontSize: 14,
    color: Colors.verylightgray,
    fontFamily: fonts.REGULAR,
    marginTop: wp(2),
    paddingHorizontal: wp(10),
    textAlign: 'center',
  },
  arrow: {
    width: wp(30),
    height: wp(30),
    marginTop: wp(10),
  },
  bottom: {
    width: wp(100),
    height: wp(24),
    backgroundColor: '#DDDBFF',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(15),
  },
  data: {
    width: wp(10),
    height: wp(10),
  },
  scan_container: {
    width: wp(28),
    height: wp(14),
    backgroundColor: Colors.green,
    borderRadius: 12,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  scan_text: {
    fontSize: 16,
    fontFamily: fonts.EXTRABOLD,
    marginLeft: wp(2),
    color: Colors.white,
  },
  camera_bottom: {
    width: wp(100),
    height: wp(24),
    backgroundColor: '#525252CC',
    // position: 'absolute',
    // bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(10),
  },
  image_contaier: {
    width: wp(10),
    height: wp(10),
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  click: {
    width: wp(14),
    height: wp(14),
    backgroundColor: Colors.white,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.green,
  },
  cancel: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: fonts.BOLD,
  },
  itemView: {
    width: wp(100),
    height: wp(28),
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: wp(5),
    paddingVertical: wp(3),
  },
  scantext: {
    fontSize: 18,
    color: '#000',
    fontFamily: fonts.BOLD,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  day: {
    fontSize: 14,
    color: Colors.verylightgray,
    fontFamily: fonts.REGULAR,
  },
  image: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: fonts.REGULAR,
    marginTop: wp(8),
  },
  recent: {
    fontSize: 16,
    color: Colors.gray,
    fontFamily: fonts.REGULAR,
    paddingHorizontal: wp(5),
    marginTop: wp(8),
  },
  button: {
    width: wp(90),
    height: wp(14),
    backgroundColor: Colors.green,
    alignSelf: 'center',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: wp(10),
  },
  Button_text: {
    fontSize: 14,
    fontFamily: fonts.BOLD,
    color: Colors.white,
  },
});
