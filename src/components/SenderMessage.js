import database from '@react-native-firebase/database';

export const senderMsg = async (
  msgValue,
  currentUserId,
  guestUserId,
  date,
  auth_id,
  guest_id,
) => {
  // console.log(
  //   'inside sender function',
  //   msgValue,
  //   currentUserId,
  //   guestUserId,
  //   date,
  //   auth_id,
  //   guest_id,
  // );
  try {
    const senderdatabaseRef = database()
      .ref('supportmsg/' + currentUserId)
      .child(guestUserId)
      .push();
    const sendermsgKey = senderdatabaseRef.key;
    await senderdatabaseRef.set({
      _id: senderdatabaseRef.key,
      sender: currentUserId,
      receiver: guestUserId,
      msg: msgValue,
      authId: auth_id,
      guestId: guest_id,
      date,
    });

    const receiverdatabaseRef = database()
      .ref('supportmsg/' + guestUserId)
      .child(currentUserId)
      .child(sendermsgKey);

    await receiverdatabaseRef.set({
      _id: receiverdatabaseRef.key,
      sender: guestUserId,
      receiver: currentUserId,
      msg: msgValue,
      authId: guest_id,
      guestId: auth_id,
      date,
    });
    return true; // Optional: return true on success
  } catch (error) {
    console.log('error in send message', error);
    return error;
  }
};

export const recieverMsg = async (
  msgValue,
  currentUserId,
  guestUserId,
  date,
  auth_id,
  guest_id,
  thumbnailUri,
) => {
  // console.log(
  //   'inside receiver function',
  //   msgValue,
  //   currentUserId,
  //   guestUserId,
  //   date,
  //   auth_id,
  //   guest_id,
  // );
  try {
    const databaseRef = database()
      .ref('supportmsg/' + guestUserId)
      .child(currentUserId)
      .child(sendermsgKey);
    const sendermsgKey = databaseRef.key;
    await databaseRef.set({
      _id: databaseRef.key,
      sender: currentUserId,
      receiver: guestUserId,
      msg: msgValue,
      authId: guest_id,
      guestId: auth_id,
      date,
      thumbnailUri,
    });
    return true; // Optional: return true on success
  } catch (error) {
    console.log('error in reciving message ', error);
    return error;
  }
};
export const senderVoice = async (
  msgValue,
  currentUserId,
  guestUserId,
  date,
  // quote,
) => {
  try {
    return await database()
      .ref('messeges/' + currentUserId)
      .child(guestUserId)
      .push({
        messege: {
          sender: currentUserId,
          reciever: guestUserId,
          audio: msgValue,
          date,

          // quote,
        },
      });
  } catch (error) {
    console.log('error in reciving message ', error);
    return error;
  }
};
