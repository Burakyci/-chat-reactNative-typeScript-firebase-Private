import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../state/store";
import userService from "../../services/userService";
import { getAnotherUser } from "../../state/slices/userSlice";
import { Text, View, TouchableOpacity } from "react-native";
import MessageList from "./MessageList";

const RoomList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { roomsData } = useSelector((state: RootState) => state.chatSlice);
  const [room, setRoom] = React.useState<any>();
  const { user } = useSelector((state: RootState) => state.authSlice);

  const [whichRoom, setWhichRoom] = useState<number>(0);
  useEffect(() => {
    (() => {
      let a: any = [];
      if (roomsData && roomsData.data) {
        const res = roomsData.data.map(async (rooms: any) => {
          if (rooms.members) {
            let usersId = rooms.members.filter((value: string) => {
              return value !== user.uid;
            });
            const data = await userService.getUser(usersId[0]);
            a.push(data.data);
          }
        });
        setRoom(a);
      }
    })();
  }, []);

  useEffect(() => {
    (() => {
      let a: any = [];
      const res = roomsData?.data?.map(async (rooms: any) => {
        let usersId = rooms.members.filter((value: string) => {
          return value !== user.uid;
        });
        const data = await userService.getUser(usersId[0]);
        a.push(data.data);
      });
      setRoom(a);
    })();
  }, []);
  console.log(whichRoom);

  return (
    <View>
      <Text>RoomList</Text>
      <View>
        <MessageList room={whichRoom} />
      </View>
      <View style={{ display: "flex", justifyContent: "space-around" }}>
        <View>
          {roomsData.data?.map((room, key) => (
            <TouchableOpacity onPress={() => setWhichRoom(key)} key={key}>
              <View style={{ display: "flex" }}>
                {room.membersName.map((value, index) => (
                  <View key={index}>
                    <Text>{value}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default RoomList;
