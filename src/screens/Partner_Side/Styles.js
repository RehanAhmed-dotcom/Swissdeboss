import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Colors, fonts} from '../../constant/Index';

const stylemain = StyleSheet.create({
  senderimg: {
    width: wp(7),
    height: wp(7),
    borderRadius: 100,
  },
  chatTimeR: {
    fontFamily: fonts.REGULAR,
    color: Colors.gray,
    fontSize: 10,
    alignSelf: 'flex-end',
    marginRight: wp(3),
  },
  chatItemLft: {
    maxWidth: wp(80),
    paddingVertical: wp(4),
    backgroundColor: 'white',
    elevation: 2,
    marginLeft: wp(2),
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginVertical: wp(1),
    paddingHorizontal: wp(3),
  },
  chatTimeL: {
    fontFamily: fonts.REGULAR,
    color: Colors.gray,
    fontSize: 10,
    alignSelf: 'flex-start',
    marginLeft: wp(15),
  },
  sender: {
    fontFamily: fonts.REGULAR,
    color: Colors.black,
    fontSize: 14,
  },
  chatItemRit: {
    maxWidth: wp(80),
    paddingVertical: wp(4),
    backgroundColor: '#EFF0FE',
    elevation: 2,
    // marginLeft: wp(5),
    alignSelf: 'flex-end',
  },
  reciver: {
    fontFamily: fonts.REGULAR,
    color: Colors.black,
    fontSize: 14,
  },
  singlechatinput: {
    width: wp(90),
    height: wp(16),
    backgroundColor: 'white',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    elevation: 2,
    marginBottom: wp(2),
  },
  chatinput: {
    color: 'black',
    fontFamily: fonts.REGULAR,
    flex: 1,
  },
});
export {stylemain};
