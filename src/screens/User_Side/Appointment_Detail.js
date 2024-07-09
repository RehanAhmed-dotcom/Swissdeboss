import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from '../../components/Button';
import Back from 'react-native-vector-icons/Ionicons';
import {Colors, fonts, images} from '../../constant/Index';
const Appointment_Detail = ({navigation, route}) => {
  const {item} = route.params;
  console.log('item on appointment detail', item);

  return (
    <View style={{flex: 1, backgroundColor: Colors.bback}}>
      <StatusBar translucent={true} />
      <View style={{flex: 1, marginTop: StatusBar.currentHeight}}>
        <ScrollView>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.backview}
            onPress={() => {
              navigation.goBack();
            }}>
            <Back name="chevron-back-outline" color="white" size={22} />
          </TouchableOpacity>
          <Image
            source={
              item.images[0].image ? {uri: item.images[0].image} : images.clean1
            }
            style={styles.image}
          />
          <View style={styles.lower_View}>
            <Text style={styles.headerText}>{item.category.name}</Text>
            <Text style={styles.Heading}>About</Text>
            <Text style={styles.detail}>{item.description}</Text>
            <View style={{marginTop: wp(2)}}>
              <View style={styles.row}>
                <Text style={styles.categ}>Category</Text>
                <Text style={styles.type}>{item.category.name}</Text>
              </View>
            </View>
            <View style={{marginTop: wp(2)}}>
              <View style={styles.row}>
                <Text style={styles.categ}>Date</Text>
                <Text style={styles.type}>{item.date}</Text>
              </View>
            </View>
            <View style={{marginTop: wp(2)}}>
              <View style={styles.row}>
                <Text style={styles.categ}>Time</Text>
                <Text style={styles.type}>{item.time}</Text>
              </View>
            </View>

            <View style={styles.line}></View>

            <View style={{}}>
              <View style={[styles.row, {marginTop: wp(0)}]}>
                <Text style={styles.categ}>Number Of Cars</Text>
                <Text style={styles.type}>{item.no_of_cars} </Text>
              </View>

              <View style={styles.line}></View>
              {item.status !== 'cancelled' &&
                item.status !== 'completed' &&
                item.status !== 'active' && (
                  <View style={{marginVertical: wp(10)}}>
                    <Button
                      title="Cancel Appointment"
                      onPress={() => {
                        navigation.navigate('Cancel_Appointment_Detail', {
                          item,
                        });
                      }}
                    />
                  </View>
                )}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Appointment_Detail;

const styles = StyleSheet.create({
  image: {
    width: wp(100),
    height: wp(80),
    // backgroundColor: 'red',
  },
  lower_View: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: wp(-10),
  },
  headerText: {
    color: '#202244',
    fontSize: 18,
    fontFamily: fonts.BOLD,
    textAlign: 'center',
    marginTop: wp(4),
  },
  Heading: {
    color: Colors.blue,
    fontSize: 14,
    fontFamily: fonts.BOLD,
    // textAlign: 'center',
    marginTop: wp(6),
    marginLeft: wp(5),
  },
  detail: {
    color: '#979797',
    fontSize: 12,
    fontFamily: fonts.REGULAR,
    paddingHorizontal: wp(5),
    marginTop: wp(2),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    alignItems: 'center',
    marginTop: wp(4),
  },
  categ: {
    color: Colors.purple,
    fontSize: 14,
    fontFamily: fonts.EXTRABOLD,
  },
  type: {
    color: Colors.blue,
    fontSize: 14,
    fontFamily: fonts.BOLD,
  },
  text: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: fonts.REGULAR,
    textAlign: 'center',
    lineHeight: 24,
  },
  line: {
    width: wp(90),
    height: wp(0.3),
    backgroundColor: Colors.verylightgray,
    alignSelf: 'center',
    marginVertical: wp(4),
  },
  backview: {
    width: wp(10),
    height: wp(10),
    backgroundColor: 'rgba(255,255,255,.3)',
    position: 'absolute',
    top: wp(5),
    left: wp(5),
    zIndex: 1000,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
