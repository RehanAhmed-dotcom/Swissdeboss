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
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors, fonts, icons, images} from '../../constant/Index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Back from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/Button';
import {useFocusEffect} from '@react-navigation/native';
import {AllGetAPI} from '../../components/Apis/Api_Screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import messaging from '@react-native-firebase/messaging';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import {stylemain} from './Styles';
import moment from 'moment';
import {recieverMsg, senderMsg} from '../../components/SenderMessage';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const Chat_Support = ({navigation, route}) => {
  const {getadmin} = route.params;
  const user = useSelector(state => state.user.user);
  console.log('user', user);
  const [firbasemsg, setFirbasemsg] = useState([]);
  const [message, setMessage] = useState('');
  console.log('messagemessagemessage', message);
  const [focus, setFocus] = useState(false);

  // { user and guest information}
  const guestData = {
    username: getadmin?.name,
    email: getadmin?.email,
    // image: getadmin?.image,
    id: getadmin.id,
  };

  //   const guestData = {
  //     username: 'Admin',
  //     email: 'admin123@gmail.com',
  //     image: images.avatar,
  //     id: '0',
  //   };

  // console.log('guestData', guestData);
  const userData2 = {
    username: user?.username,
    email: user?.email,
    image: user.image ? user.image : icons.logo,
    id: user?.id,
  };

  const _chatUsers = async => {
    try {
      database()
        .ref('supportusers/' + user?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .child(guestData?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .set({
          latestMessage: message,
          timestamp: database.ServerValue.TIMESTAMP,
          counter: 0,
          user: guestData,
        });

      database()
        .ref('supportusers/' + guestData?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .child(user?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .once('value', snapshot => {
          const counts = snapshot?.val()?.counter;
          database()
            .ref(
              'supportusers/' + guestData?.email.replace(/[^a-zA-Z0-9 ]/g, ''),
            )
            .child(user.email.replace(/[^a-zA-Z0-9 ]/g, ''))
            .set({
              latestMessage: message,
              timestamp: database.ServerValue.TIMESTAMP,
              counter: counts ? counts + 1 : 1,
              user: userData2,
            });
        });
    } catch (error) {
      console.log('error in crate chat', error);
    }
  };

  const _updateChatCount = async () => {
    try {
      database()
        .ref('supportusers/' + user?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .child(guestData?.email.replace(/[^a-zA-Z0-9 ]/g, ''))

        .once('value', snapshot => {
          if (snapshot.val() != null) {
            database()
              .ref('supportusers/' + user?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
              .child(guestData?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
              .update({
                counter: 0,
              });
          }
        });
    } catch (error) {}
  };
  const _getMeesages = async () => {
    // console.log('jhbhjhjbn', getadmin.email);
    try {
      database()
        .ref('supportmsg')
        .child(user?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .child(guestData?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .on('value', dataSnapshot => {
          let msgs = [];
          dataSnapshot.forEach(child => {
            msgs.push({
              sendBy: child.val().sender,
              receivedBy: child.val().receiver,
              msg: child.val().msg,
              date: child.val().date,
            });
            return undefined;
          });
          setFirbasemsg(msgs.reverse());
        });
    } catch (error) {}
  };

  // { send message component function}
  const handleSend = () => {
    setMessage('');
    if (message) {
      // if (message.slice(-4) != '.jpg') {
      //   Send_notifi(message);
      // }
      senderMsg(
        message,
        user?.email?.replace(/[^a-zA-Z0-9 ]/g, ''),
        guestData?.email?.replace(/[^a-zA-Z0-9 ]/g, ''),
        Date.now(),
        userData2?.id,
        guestData?.id,
      );
      _chatUsers();

      // recieverMsg(
      //   message,
      //   user.email.replace(/[^a-zA-Z0-9 ]/g, ''),
      //   guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''),
      //   Date.now(),
      //   userData2.id,
      //   guestData.id

      // );
      _chatUsers();
    }
  };

  useEffect(() => {
    _getMeesages();
    _updateChatCount();
  }, []);
  const {top, bottom} = useSafeAreaInsets();
  const Wrapper = Platform.OS == 'ios' ? KeyboardAvoidingView : View;
  return (
    <View style={{flex: 1, backgroundColor: Colors.bback}}>
      <StatusBar translucent={true} />
      <View
        style={{
          flex: 1,
          marginBottom: Platform.OS == 'ios' ? bottom : 0,
          marginTop: Platform.OS == 'ios' ? top : StatusBar.currentHeight,
        }}>
        {/* <ScrollView> */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Back name="chevron-back-outline" color="#003C3C" size={22} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{guestData.username}</Text>
          <View></View>
        </View>

        <View style={{flex: 1, paddingTop: 10}}>
          <FlatList
            inverted
            data={firbasemsg}
            renderItem={({item, index}) => {
              const isCurrentUser =
                item?.sendBy === user?.email.replace(/[^a-zA-Z0-9 ]/g, '');
              const isSticker = item.msg.startsWith('data:image/png;base64,');

              return (
                <>
                  {!isCurrentUser ? (
                    item?.msg?.slice(-4) == '.jpg' ||
                    item?.msg?.slice(-4) == '.png' ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'flex-end',
                          marginVertical: 8,
                          marginLeft: 10,
                        }}>
                        <Image
                          style={stylemain.senderimg}
                          source={icons.logo}
                          resizeMode="cover"
                        />
                        <TouchableOpacity
                          onPress={() => {
                            setChatImgView(true), setChatImg(item.msg);
                          }}
                          activeOpacity={0.9}
                          style={{
                            width: wp(30),
                            height: wp(40),
                            backgroundColor: '#525252',
                            // alignSelf: 'flex-end',
                            borderBottomRightRadius: 10,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            marginLeft: 5,
                          }}>
                          <ImageBackground
                            style={{width: wp(30), height: wp(36)}}
                            source={{uri: item?.msg}}
                            resizeMode="cover"
                            borderTopLeftRadius={10}
                            borderTopRightRadius={10}
                            borderBottomRightRadius={10}>
                            <Text
                              style={[
                                stylemain.chatTimeR,
                                {
                                  alignSelf: 'flex-start',
                                  color: Colors.white,
                                  marginLeft: 5,
                                  top: 1,
                                },
                              ]}>
                              {/* {moment(item.date).format('hh:mm A')} */}
                              12:18
                            </Text>
                          </ImageBackground>
                        </TouchableOpacity>
                      </View>
                    ) : item?.msg?.slice(-4) == '.gif' ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'flex-end',
                          marginVertical: 8,
                          marginLeft: 10,
                        }}>
                        <Image
                          style={stylemain.senderimg}
                          source={icons.logo}
                          resizeMode="cover"
                        />
                        <TouchableOpacity
                          onPress={() => {
                            setChatImgView(true), setChatImg(item.msg);
                          }}
                          activeOpacity={0.9}
                          style={{
                            width: wp(30),
                            height: wp(40),
                            backgroundColor: '#525252',
                            // alignSelf: 'flex-end',
                            borderBottomRightRadius: 10,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            marginLeft: 5,
                          }}>
                          <ImageBackground
                            style={{width: wp(30), height: wp(35)}}
                            source={{uri: item?.msg}}
                            resizeMode="cover"
                            borderTopLeftRadius={10}
                            borderTopRightRadius={10}
                            borderBottomRightRadius={10}>
                            <Text
                              style={[
                                stylemain.chatTimeR,
                                {
                                  alignSelf: 'flex-start',
                                  color: Colors.white,
                                  marginLeft: 5,
                                  top: 1,
                                },
                              ]}>
                              {moment(item?.date).format('hh:mm A')}
                            </Text>
                          </ImageBackground>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            marginLeft: 8,
                          }}>
                          <Image
                            style={stylemain.senderimg}
                            source={icons.logo}
                            resizeMode="cover"
                          />
                          <View style={stylemain.chatItemLft}>
                            <Text style={[stylemain.sender]}>{item?.msg}</Text>
                          </View>
                        </View>
                        <Text
                          style={[
                            stylemain.chatTimeL,
                            {alignSelf: 'flex-start'},
                          ]}>
                          {moment(item.date).format('hh:mm A')}
                        </Text>
                      </View>
                    )
                  ) : (
                    <View>
                      <View
                        style={[
                          stylemain.chatItemRit,
                          {
                            alignSelf: 'flex-end',
                            borderTopRightRadius: 10,
                            borderTopLeftRadius: 10,
                            borderBottomLeftRadius: 10,
                            marginRight: 10,
                            // backgroundColor: Colors.g,
                            marginVertical: 10,
                            paddingHorizontal: wp(3),
                          },
                        ]}>
                        <Text style={stylemain.reciver}>{item?.msg}</Text>
                      </View>
                      <Text style={stylemain.chatTimeR}>
                        {moment(item?.date).format('hh:mm A')}
                      </Text>
                    </View>
                  )}
                </>
              );
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // backgroundColor: '#F2F2F2',
              justifyContent: 'center',
              height: 70,
            }}>
            <View style={stylemain.singlechatinput}>
              <TextInput
                style={stylemain.chatinput}
                placeholder="Type Your Message"
                multiline={true}
                placeholderTextColor={Colors.gray}
                onChangeText={text => {
                  setFocus(text.trim().length > 0), setMessage(text);
                }}
                // value={
                //   message.startsWith('data:image/png;base64,')
                //     ? 'Send Sticker'
                //     : message
                // }
                value={message}
                // returnKeyLabel="Send"
                // returnKeyType="send"
              />
              <TouchableOpacity
                onPress={() => handleSend()}
                activeOpacity={0.8}
                style={{marginRight: 18}}>
                <FontAwesome name={'send'} size={20} color={'#007EF4'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* </ScrollView> */}
      </View>
    </View>
  );
};

export default Chat_Support;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    alignItems: 'center',
    marginTop: wp(6),
  },
  headerText: {
    color: Colors.blue,
    fontSize: 18,
    fontFamily: fonts.BOLD,
  },
});
