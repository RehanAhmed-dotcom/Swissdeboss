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
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {AllGetAPI, PostAPiwithToken} from '../../components/Apis/Api_Screen';
import Loader from '../../components/Loader';
import {useTranslation} from 'react-i18next';
const Invoices_List = ({navigation, route}) => {
  const user = useSelector(state => state?.user?.user);
  console.log('user on invoces list', user);
  const {t} = useTranslation();
  const [IsLoading, setIsLoading] = useState(false);
  const [invoceData, setinvoceData] = useState([]);

  const fetchRentalData = () => {
    AllGetAPI({url: 'getUserInvoices', Token: user?.api_token})
      .then(res => {
        setinvoceData(res.data);
        console.log('----------------------------------------', res.data);
      })
      .catch(err => {
        console.log('api error', err);
      });
  };

  useEffect(() => {
    fetchRentalData();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Colors.bback}}>
      {IsLoading && <Loader />}
      <StatusBar translucent={true} />
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
              <Back name="chevron-back-outline" color="#003C3C" size={22} />
            </TouchableOpacity>
            <Text style={styles.headerText}>{t('invoiceslist')}</Text>
            <View></View>
          </View>
          <View style={{marginTop: wp(8)}}>
            <FlatList
              data={invoceData}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Invoice', {item});
                    }}
                    activeOpacity={0.9}
                    style={styles.Invocebox}>
                    <Image
                      source={
                        item.category.iamge
                          ? {uri: item.category.image}
                          : icons.invoice
                      }
                      resizeMode="contain"
                      style={{width: wp(10), height: wp(12)}}
                    />
                    <View style={{marginLeft: wp(2)}}>
                      <Text numberOfLines={1} style={styles.heading}>
                        {item.category.name}
                      </Text>
                      <Text numberOfLines={2} style={styles.des}>
                        {item.address}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View style={{marginBottom: 30}}></View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Invoices_List;

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
    shadowColor: Colors.gray,
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
  tectadd: {
    color: Colors.blue,
    fontSize: 12,
    fontFamily: fonts.BOLD,
    paddingHorizontal: wp(5),
    marginTop: wp(2),
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
  Invocebox: {
    width: wp(90),
    paddingVertical: wp(3),
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: wp(2),
    borderRadius: 12,
    elevation: 2,
    marginBottom: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3),
  },
  heading: {
    color: Colors.blue,
    fontSize: 14,
    fontFamily: fonts.BOLD,
  },
  des: {
    color: Colors.gray,
    fontSize: 12,
    fontFamily: fonts.REGULAR,
    marginTop: wp(1),
    // backgroundColor: 'red',
    maxWidth: wp(70),
  },
});
