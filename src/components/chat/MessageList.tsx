import React from "react";
import { useSelector } from "react-redux";

import { IPropsRoomListToMessageList } from "../../types";
import { IMessageModel } from "../../models/chatModel";
import { spawn } from "child_process";
import SendMessage from "./SendMessage";
import { Text, View, Image } from "react-native";

const MessageList: React.FC<IPropsRoomListToMessageList> = ({ room }) => {
  const { roomsData } = useSelector((state: any) => state.chatSlice);
  const { myProfile, anotherUser } = useSelector(
    (state: any) => state.userSlice
  );

  return (
    <View>
      <View>
        {roomsData?.data && room !== undefined ? (
          <View>
            <View>
              <Image
                source={{ uri: `${anotherUser.data?.profilePhoto}` }}
                style={{ width: 200, height: 200 }}
              />

              <Text>
                {anotherUser.data?.firstName.toLocaleUpperCase()}{" "}
                {anotherUser.data?.lastName.toLocaleUpperCase()}
                {anotherUser.data?.online ? <View></View> : <View></View>}
              </Text>
            </View>
            {roomsData.data[room]?.messages?.map(
              (value: IMessageModel, index: number) => (
                <View key={index}>
                  <View>
                    <Text>{value.message}</Text>
                  </View>
                  <Text>
                    {value.date ? value.date.toDate().toLocaleString() : ""}
                  </Text>
                </View>
              )
            )}
          </View>
        ) : (
          <Text>no message</Text>
        )}
      </View>
      <View>
        <SendMessage room={room} />
      </View>
    </View>
  );
};
export default MessageList;
