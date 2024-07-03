import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Colors, fonts} from '../../constant/Index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Back from 'react-native-vector-icons/Ionicons';
import Cross from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
const Bucket = () => {
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
            <Text style={styles.headerText}>Bucket</Text>
            <View></View>
          </View>

          <View style={{marginTop: wp(10)}}>
            <FlatList
              data={[1, 2, 3, 4]}
              renderItem={({item}) => {
                return (
                  <View style={styles.box}>
                    <TouchableOpacity style={styles.cross}>
                      <Cross name="close-circle" size={24} color={Colors.red} />
                    </TouchableOpacity>
                    <View style={{width: wp(63)}}>
                      <Text style={styles.heading}>Front Doors</Text>
                      <Text numberOfLines={3} style={styles.des}>
                        On sait depuis longtemps que travailler avec du texte
                        lisible et contenant du sens est source de distractions,
                        et empêche de se concentrer sur la mise en page elle...
                      </Text>
                    </View>

                    <View style={styles.row2}>
                      <View style={styles.line}></View>
                      <View style={{alignItems: 'center', marginLeft: wp(4)}}>
                        <Text style={styles.Price}>Price</Text>
                        <Text style={styles.money}>$500</Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Bucket;

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
    height: wp(26),
    backgroundColor: Colors.white,
    alignSelf: 'center',
    marginTop: wp(4),
    borderRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.green,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(3),
  },
  heading: {
    fontSize: 14,
    color: '#424242',
    fontFamily: fonts.BOLD,
  },
  des: {
    fontSize: 12,
    color: '#7F7F7F',
    fontFamily: fonts.REGULAR,
    marginTop: wp(2),
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  line: {
    width: wp(0.2),
    height: wp(22),
    backgroundColor: Colors.verylightgray,
  },
  Price: {
    fontSize: 14,
    color: Colors.blue,
    fontFamily: fonts.BOLD,
  },
  money: {
    fontSize: 18,
    color: Colors.blue,
    fontFamily: fonts.BOLD,
  },
  cross: {
    position: 'absolute',
    top: wp(-3),
    right: wp(-2),
  },
});
