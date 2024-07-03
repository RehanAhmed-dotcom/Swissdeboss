import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, fonts, images} from '../../constant/Index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Back from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/Button';

const Damage = ({navigation}) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const data = [
    {
      key: 1,
      name: 'Front bumper',
      price: '20$',
    },
    {
      key: 2,
      name: 'Front doors',
      price: '20$',
    },
    {
      key: 3,
      name: 'Headlights',
      price: '20$',
    },
    {
      key: 4,
      name: 'Rear doors glass',
      price: '20$',
    },
    {
      key: 5,
      name: 'Hub covers',
      price: '20$',
    },
    {
      key: 6,
      name: 'Wheel trim',
      price: '20$',
    },
    {
      key: 7,
      name: 'Alloy wheel',
      price: '20$',
    },
  ];

  const handleSelected = index => {
    let newSelectedItems = [...selectedItems];

    // Toggle selection
    if (newSelectedItems.includes(index)) {
      newSelectedItems = newSelectedItems.filter(item => item !== index);
    } else {
      newSelectedItems.push(index);
    }

    setSelectedItems(newSelectedItems);
  };

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
            <Text style={styles.headerText}>Home</Text>
            <View></View>
          </View>

          <View style={{marginTop: wp(8)}}>
            <FlatList
              data={data}
              renderItem={({item, index}) => {
                const isSelected = selectedItems.includes(index);
                return (
                  <TouchableOpacity
                    // onPress
                    key={index}
                    activeOpacity={0.9}
                    onPress={() => {
                      handleSelected(index);
                      // navigation.navigate('Damage_Detail');
                    }}>
                    <ImageBackground
                      resizeMode="contain"
                      source={images.damage}
                      style={[styles.type]}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <MaterialCommunityIcons
                          name={
                            isSelected ? 'circle-slice-8' : 'circle-outline'
                          }
                          size={24}
                          color={isSelected ? Colors.blue : Colors.blue} // Change icon color based on selection
                        />
                        <Text numberOfLines={1} style={styles.name}>
                          {item.name}
                        </Text>
                      </View>
                      <Text style={styles.money}>{item.price}</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </ScrollView>
        <View style={{marginVertical: wp(4)}}>
          <Button
            title="Done Selecting"
            onPress={() => {
              navigation.navigate('Damage_Detail');
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Damage;

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
  type: {
    width: wp(90),
    height: wp(20),
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: wp(7),
    marginTop: wp(4),
    alignItems: 'center',
  },
  name: {
    color: '#424242',
    fontSize: 14,
    fontFamily: fonts.BOLD,
    marginLeft: wp(2),
    maxWidth: wp(50),
  },
  money: {
    color: Colors.blue,
    fontSize: 16,
    fontFamily: fonts.BOLD,
  },
});
