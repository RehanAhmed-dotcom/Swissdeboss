import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors, fonts, images} from '../../../constant/Index';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
const P_Onboarding1 = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <ImageBackground source={images.onb} style={{flex: 1}}>
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor="#94D9FF"
        />
        <View
          style={{
            flex: 1,
            marginTop: StatusBar.currentHeight,
          }}>
          <View style={{flex: 1}}></View>
          <View style={{flex: 1}}>
            <Text style={styles.heading}>Car Workshop</Text>
            <Text style={styles.des}>
              On sait depuis longtemps que travailler avec du texte lisible et
              contenant du On sait depuis longtemps que travailler avec du texte
              lisible et contenant du On sait depuis longtemps que travailler
              avec du texte lisible et contenant du
            </Text>

            <TouchableOpacity
              style={styles.Button}
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('P_Onboarding2');
              }}>
              <Text style={styles.butonText}>Next</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.row}>
            <Text style={styles.skip}>Skip</Text>
            <AntDesign name="right" color={'#000'} size={15} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default P_Onboarding1;

const styles = StyleSheet.create({
  onboarding: {
    width: wp(100),
    height: wp(100),

    marginTop: wp(30),
    resizeMode: 'contain',
  },
  bottom_View: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  heading: {
    fontSize: 16,
    color: '#2B2B2B',
    fontFamily: fonts.BOLD,
    textAlign: 'center',
    marginTop: wp(14),
  },
  des: {
    fontSize: 12,
    color: Colors.gray,
    fontFamily: fonts.REGULAR,
    textAlign: 'center',
    marginTop: wp(6),
    paddingHorizontal: wp(5),
    lineHeight: 24,
    // backgroundColor: 'red',
    maxHeight: wp(26),
  },
  Button: {
    width: wp(80),
    height: wp(14),
    borderColor: Colors.green,
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginTop: wp(12),
  },
  butonText: {
    fontSize: 16,
    color: Colors.green,
    fontFamily: fonts.BOLD,
  },
  row: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'flex-end',
    right: wp(6),
    top: wp(6),
  },
  skip: {
    fontSize: 12,
    fontFamily: fonts.REGULAR,
    color: Colors.black,
  },
});
