import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Colors, fonts, images} from '../../constant/Index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Back from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/Button';
const Damage_Detail = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.bback}}>
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
            <Text style={styles.headerText}>Front Bumper</Text>
            <View></View>
          </View>

          <Image
            source={images.bumper}
            resizeMode="contain"
            style={styles.bumper}
          />

          <View style={{paddingHorizontal: wp(5), marginTop: wp(10)}}>
            <Text style={styles.heading}>About</Text>
            <Text style={styles.des}>
              On sait depuis longtemps que travailler avec du texte lisible et
              contenant du sens est source de distractions, et empêche de se
              concentrer sur la mise en page elle-même. L'avantage du Lorem
              Ipsum sur un texte générique comme 'Du texte. Du texte.
            </Text>
          </View>
          <View style={styles.line}></View>

          <View style={{marginTop: wp(8)}}>
            <View style={styles.row}>
              <Text style={styles.heading}>Damaged Category</Text>
              <Text style={styles.category}>Medium Damage</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.heading}>Front bumper</Text>
              <Text style={styles.category}>$70</Text>
            </View>
            <View style={styles.line}></View>

            <View style={styles.row}>
              <Text style={styles.heading}>Number Of Days</Text>
              <Text style={styles.category}>3 Days</Text>
            </View>

            <View style={styles.line}></View>

            <View style={styles.row}>
              <Text style={styles.heading}>Service Fee</Text>
              <Text style={styles.category}>$100</Text>
            </View>

            <View style={styles.line}></View>
          </View>

          <View style={{marginVertical: wp(10)}}>
            <Button title="Add to bucket" />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Damage_Detail;

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
  bumper: {
    width: wp(60),
    height: wp(40),
    alignSelf: 'center',
    marginTop: wp(16),
  },
  heading: {
    fontSize: 14,
    fontFamily: fonts.BOLD,
    color: Colors.brownpod,
  },
  des: {
    fontSize: 12,
    fontFamily: fonts.REGULAR,
    color: '#7F7F7F',
    lineHeight: 20,
    marginTop: wp(2),
  },
  line: {
    width: wp(90),
    height: wp(0.3),
    backgroundColor: Colors.verylightgray,
    alignSelf: 'center',
    marginTop: wp(4),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    alignItems: 'center',
    marginTop: wp(4),
  },
  category: {
    fontSize: 14,
    fontFamily: fonts.REGULAR,
    color: Colors.blue,
  },
});
