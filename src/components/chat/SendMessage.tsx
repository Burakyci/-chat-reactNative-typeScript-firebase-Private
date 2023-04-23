import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../state/store";
import { sendMessage } from "../../state/slices/chatSlice";
import { IPropsRoomListToMessageList } from "../../types";
import { Text, View, TextInput, Button } from "react-native";

const SendMessage: React.FC<IPropsRoomListToMessageList> = ({ room }) => {
  const dispatch = useAppDispatch();
  const { roomsData } = useSelector((state: RootState) => state.chatSlice);

  useEffect(() => {}, [room]);

  const { user } = useSelector((state: RootState) => state.authSlice);
  const activeUser = user.uid;
  const [message, setMessage] = useState("");

  let chatRoomId = roomsData?.data?.[room]?.chatId || null;
  const sendMessages = (message: string, e: any) => {
    e.preventDefault();
    const values = {
      from: activeUser,
      roomId: chatRoomId as string,
      message,
    };
    dispatch(sendMessage(values));
    setMessage("");
  };

  return (
    <View>
      <TextInput
        onChangeText={(text) => setMessage(text)}
        value={message}
        placeholder="message...."
      />
      <Button title="send" onPress={(e) => sendMessages(message, e)} />
      <Text>asd</Text>
    </View>
  );
};

export default SendMessage;
