import React from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '../constant/Index';
const Loader = ({loader, y}) => {
  return (
    <Modal transparent={true} animationType={'none'} visible={loader}>
      <View style={styles.modalBackground}>
        <View style={styles.indicator}>
          <View style={styles.upper_indicator}>
            <ActivityIndicator color={Colors.main} size="large" />
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    // backgroundColor: 'rgba(4, 4, 4,0.7)',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 60,
    width: 60,
    borderRadius: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  indicator: {
    width: wp(16),
    height: wp(16),
    borderRadius: 30,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.main,
  },
  upper_indicator: {
    borderRadius: 28,
    height: wp(15),
    width: wp(15),
    borderRadius: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.white,
  },
});
