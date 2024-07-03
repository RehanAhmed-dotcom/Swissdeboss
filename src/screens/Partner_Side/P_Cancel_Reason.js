import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  ToastAndroid,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {PostAPiwithToken} from '../../components/Apis/Api_Screen';
import Button from '../../components/Button';
import {Colors, fonts} from '../../constant/Index';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const P_Cancel_Reason = ({navigation, route}) => {
  const {item} = route.params;
  // console.log('item on cancel appointment detail', item);
  const user = useSelector(state => state?.user?.user);
  const [selected, setSelected] = useState(null); // Change initial state to null
  const [otherReason, setOtherReason] = useState(''); // Add state for other reason text
  const Reasons = [
    'Weather Condition',
    'Unexpected Work',
    'Childcare issue',
    'Travel delays',
    'Other',
  ];

  const handleSelected = index => {
    setSelected(index); // Update state with the selected index
    if (index !== Reasons.length - 1) {
      setOtherReason(''); // Clear other reason text if not "Other"
    }
  };

  const _CancelApi = () => {
    // setIsLoading(true);
    if (selected === null) {
      ToastAndroid.show(
        'Please select a reason for cancellation.',
        ToastAndroid.SHORT,
      );
      return;
    }

    if (selected === Reasons.length - 1 && !otherReason.trim()) {
      ToastAndroid.show(
        'Please write a note for the selected reason.',
        ToastAndroid.SHORT,
      );
      return;
    }

    const reason =
      selected === Reasons.length - 1 ? otherReason : Reasons[selected];
    const formdata = new FormData();
    formdata.append('status', 'Cancelled');
    formdata.append('reason', reason);

    PostAPiwithToken(
      {url: `statusupdate/${item.id}`, Token: user?.api_token},
      formdata,
    )
      .then(res => {
        if (res.status == 'success') {
          // setIsLoading(false);

          ToastAndroid.show('Order Accepted Sucessfully!', ToastAndroid.SHORT);
          navigation.navigate('Cancelled_Detail');
          console.log('Acepteddd==================', res);
        }
        // console.log('order Changed successfully', res);
      })
      .catch(err => {
        // setIsLoading(false);

        console.log('api error', err);
      });
  };
  const {top} = useSafeAreaInsets();
  return (
    <View style={{flex: 1, backgroundColor: Colors.bback}}>
      <StatusBar translucent={true} />
      <View
        style={{
          flex: 1,
          marginTop: Platform.OS == 'ios' ? top : StatusBar.currentHeight,
        }}>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <MaterialIcons name="chevron-left" color="#003C3C" size={22} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Cancel Appointment</Text>
            <View></View>
          </View>

          <View style={{marginTop: wp(8)}}>
            <FlatList
              data={Reasons}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      handleSelected(index);
                    }}
                    key={index}
                    style={styles.reason_row}>
                    <MaterialIcons
                      name={
                        selected === index
                          ? 'radio-button-checked'
                          : 'radio-button-unchecked'
                      }
                      color={selected === index ? Colors.blue : Colors.black} // Ensure correct color based on selection
                      size={22}
                    />

                    <Text style={styles.item_text}>{item}</Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index.toString()} // Add keyExtractor to improve performance
            />
          </View>

          {selected === Reasons.length - 1 && ( // Check if the "Other" option is selected
            <>
              <Text style={styles.heading}>Other</Text>
              <View style={styles.input}>
                <TextInput
                  placeholder="Write a note"
                  placeholderTextColor={Colors.gray}
                  style={styles.textinput}
                  multiline
                  value={otherReason}
                  onChangeText={setOtherReason}
                />
              </View>
            </>
          )}

          <View style={{marginTop: wp(20), marginBottom: wp(6)}}>
            <Button title="Cancel Appointment" onPress={_CancelApi()} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default P_Cancel_Reason;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    alignItems: 'center',
    marginTop: wp(6),
  },
  headerText: {
    color: '#003C3C',
    fontSize: 18,
    fontFamily: fonts.BOLD,
  },
  reason_row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    marginTop: wp(4),
  },
  item_text: {
    fontSize: 14,
    color: '#000000',
    marginLeft: wp(2),
    fontFamily: fonts.REGULAR,
  },
  heading: {
    color: '#202244',
    fontSize: 14,
    fontFamily: fonts.BOLD,
    marginLeft: wp(5),
    marginTop: wp(14),
  },
  input: {
    width: wp(90),
    height: wp(40),
    backgroundColor: Colors.white,
    alignSelf: 'center',
    elevation: 2,
    marginVertical: wp(4),
    borderRadius: 12,
    padding: wp(2),
  },
  textinput: {
    color: Colors.black,
    fontFamily: fonts.REGULAR,
    flex: 1,
    textAlignVertical: 'top',
  },
});
