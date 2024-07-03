import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Colors, fonts} from '../constant/Index';

const Button = ({title, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.Button}
      activeOpacity={0.7}
      onPress={onPress}>
      <Text style={styles.butonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  Button: {
    width: widthPercentageToDP(80),
    height: widthPercentageToDP(14),
    backgroundColor: Colors.green,
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  butonText: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: fonts.BOLD,
  },
});
