import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ScrollView,
  Image,
  TextInput,
  ToastAndroid,
  PermissionsAndroid,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, fonts, icons, images} from '../../constant/Index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Back from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {PostAPiwithToken} from '../../components/Apis/Api_Screen';
import DocumentPicker from 'react-native-document-picker';
import Pdf from 'react-native-pdf';
import Loader from '../../components/Loader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// import ImageCropPicker from 'react-native-image-crop-picker';
const P_Invoice = ({navigation, route}) => {
  const {item} = route.params;
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);
  console.log('...............', selectedDocument);
  const pickDocument = async () => {
    // await requestStoragePermission();
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        allowMultiSelection: false,
      });
      setSelectedDocument(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.log('Error occurred while picking the file', err);
      }
    }
  };
  console.log(
    'dalsjdladlajldjlajdljasdjl--------------------------------',
    item.id,
    item.user_id,
    item.package_id,
    item.package.category_id,
  );
  const [address, setaddress] = useState('');
  const _validate = () => {
    if (!address) {
      return false;
    }
    return true;
  };

  const user = useSelector(state => state?.user?.user);

  const AcceptedApi = () => {
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append('status', 'Active');
    formdata.append('user_id', item.user_id);
    formdata.append('package_id', item.package_id);
    formdata.append('cat_id', item.package.category_id);
    formdata.append('address', address);
    {
      selectedDocument &&
        selectedDocument.forEach(element => {
          element.uri &&
            formdata.append('document', {
              uri: element.uri,
              type: 'application/pdf',
              name: 'file.pdf',
            });
        });
    }

    PostAPiwithToken(
      {url: `statusupdate/${item.id}`, Token: user?.api_token},
      formdata,
    )
      .then(res => {
        if (res.status == 'success') {
          setIsLoading(false);

          ToastAndroid.show('Order Accepted Sucessfully!', ToastAndroid.SHORT);
          navigation.navigate('Services_Detail');
          console.log('Acepteddd==================', res);
        }
        console.log('order Changed successfully', res);
      })
      .catch(err => {
        setIsLoading(false);

        console.log('api error', err);
      });
  };
  const {top} = useSafeAreaInsets();
  const Wrapper = Platform.OS == 'ios' ? KeyboardAvoidingView : View;
  return (
    <View style={{flex: 1, backgroundColor: Colors.bback}}>
      {IsLoading && <Loader />}
      <StatusBar translucent={true} />
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
                <Back name="chevron-back-outline" color="#003C3C" size={22} />
              </TouchableOpacity>
              <Text style={styles.headerText}>Invoice</Text>
              <View></View>
            </View>

            <View style={styles.box}>
              <View style={styles.upper_box}>
                <Text style={styles.header1}>{item.package.name}</Text>
                <Image
                  source={icons.acc}
                  resizeMode="contain"
                  style={styles.acc}
                />
              </View>

              <View style={{marginTop: wp(4)}}>
                <View style={styles.row}>
                  <Text style={styles.info}>Username</Text>
                  <Text style={styles.detail}>{item.user.username}</Text>
                </View>
                <View style={styles.line}></View>

                <View style={styles.row}>
                  <Text style={styles.info}>Phone Number</Text>
                  <Text style={styles.detail}>{item.user.phone_number}</Text>
                </View>
                <View style={styles.line}></View>

                <View style={styles.row}>
                  <Text style={styles.info}>Date</Text>
                  <Text style={styles.detail}>{item.date}</Text>
                </View>
                <View style={styles.line}></View>

                <View style={styles.row}>
                  <Text style={styles.info}>Time</Text>
                  <Text style={styles.detail}>{item.time}</Text>
                </View>
                <View style={styles.line}></View>
              </View>

              <View style={{marginTop: wp(4)}}>
                <View style={styles.row}>
                  <Text style={styles.category}>Damaged Category</Text>
                  <Text style={styles.damage}>
                    {item.package.category.name}
                  </Text>
                </View>
              </View>

              <View style={{marginTop: wp(4)}}>
                <Text style={styles.Price}>{item.package.description}</Text>

                <View style={styles.line}></View>
              </View>

              <View style={{marginTop: wp(2), marginBottom: wp(4)}}>
                <View style={styles.row}>
                  <Text style={styles.category}>Service Fee</Text>
                  <Text style={styles.damage}>$100</Text>
                </View>
              </View>
              <View style={styles.line}></View>

              <Text
                style={[
                  styles.category,
                  {
                    marginLeft: wp(5),
                    marginTop: wp(8),
                  },
                ]}>
                Technicion Address
              </Text>
              <TextInput
                placeholder="Enter Technicion Address"
                placeholderTextColor={Colors.gray}
                style={[
                  styles.input,
                  {
                    borderWidth: address === '' ? 1 : 0,
                    height: 50,
                    borderColor: address === '' ? 'red' : null,
                  },
                ]}
                multiline
                value={address}
                onChangeText={text => {
                  setaddress(text);
                }}
              />

              {selectedDocument && (
                <View>
                  <Image
                    source={images.pdf}
                    resizeMode="contain"
                    style={{
                      width: wp(25),
                      height: wp(25),
                      alignSelf: 'center',
                      marginTop: wp(10),
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      color: Colors.black,
                      fontFamily: fonts.REGULAR,
                      textAlign: 'center',
                      marginTop: wp(2),
                    }}>
                    {selectedDocument.name}
                  </Text>
                </View>
              )}
              {/* 
            <Button
              title="send doc"
              onPress={() => {
                pickDocument();
              }}
            /> */}
              <TouchableOpacity
                onPress={() => {
                  pickDocument();
                }}
                style={{
                  paddingHorizontal: wp(6),
                  height: wp(10),
                  borderWidth: 1,
                  borderRadius: 12,
                  alignSelf: 'center',
                  marginTop: wp(4),
                  justifyContent: 'center',
                  borderColor: Colors.blue,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.blue,
                    fontFamily: fonts.REGULAR,
                  }}>
                  Pick Document
                </Text>
              </TouchableOpacity>
              <View style={styles.bottom_View}>
                <Text style={styles.header1}>Sub Total</Text>
                <Text style={styles.total}>$299</Text>
              </View>
            </View>
            <View style={{marginTop: wp(14), marginBottom: wp(10)}}>
              <Button
                title="Send Invoice to Customer"
                onPress={() => {
                  if (_validate()) {
                    AcceptedApi();
                  } else {
                    ToastAndroid.show('Enter Address!', ToastAndroid.SHORT);
                  }
                }}
              />
            </View>
          </ScrollView>
        </Wrapper>
      </View>
    </View>
  );
};

export default P_Invoice;

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
  box: {
    width: wp(90),
    // paddingVertical: wp(4),
    backgroundColor: Colors.white,
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: wp(10),
    elevation: 5,
  },
  upper_box: {
    width: wp(90),
    height: wp(20),
    backgroundColor: Colors.blue,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
  },
  header1: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: fonts.BOLD,
  },
  acc: {
    width: wp(12),
    height: wp(12),
    tintColor: Colors.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    marginTop: wp(4),
  },
  info: {
    color: '#202244',
    fontSize: 14,
    fontFamily: fonts.BOLD,
  },
  detail: {
    color: Colors.blue,
    fontSize: 14,
    fontFamily: fonts.REGULAR,
  },
  line: {
    width: wp(80),
    height: wp(0.3),
    backgroundColor: Colors.verylightgray,
    alignSelf: 'center',
    marginTop: wp(1),
  },
  category: {
    color: '#202244',
    fontSize: 14,
    fontFamily: fonts.BOLD,
  },
  damage: {
    color: Colors.blue,
    fontSize: 12,
    fontFamily: fonts.BOLD,
  },

  part: {
    color: '#424242',
    fontSize: 12,
    fontFamily: fonts.BOLD,
  },
  Price: {
    color: Colors.blue,
    fontSize: 12,
    fontFamily: fonts.BOLD,
    textAlign: 'center',
    marginTop: wp(6),
    marginBottom: wp(2),
  },
  bottom_View: {
    width: wp(90),
    height: wp(20),
    backgroundColor: Colors.blue,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    marginTop: wp(10),
  },
  total: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: fonts.BOLD,
  },
  input: {
    width: wp(80),
    alignSelf: 'center',
    borderRadius: 10,
    fontFamily: fonts.REGULAR,
    color: Colors.black,
    justifyContent: 'center',
    paddingHorizontal: wp(2),
    height: 50,
    backgroundColor: 'white',
    elevation: 2,
    marginTop: wp(2),
  },
  pdfContainer: {
    width: 200,
    height: 200,
  },
  pdf: {
    width: 200,
    height: 200,
  },
});
