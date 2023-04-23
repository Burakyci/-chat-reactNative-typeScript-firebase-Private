import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../state/store";
import { createRoom } from "../../state/slices/chatSlice";
import { Unsubscribe } from "firebase/auth";
import userService from "../../services/userService";
import { updateUsers } from "../../state/slices/userSlice";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

interface IUserData {
  id: string;
  firstName: string;
  profilePhoto: string;
  online: boolean;
}

const UserList: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const { user } = useSelector((state: RootState) => state.authSlice);
  const { userList } = useSelector((state: any) => state.userSlice);
  const dispatch = useAppDispatch();
  const activeUser = user.uid;

  const createOneRoom = (to: string) => {
    const values = { to, from: user.uid };
    dispatch(createRoom(values));
  };

  useEffect(() => {
    let userSub: Unsubscribe;
    userSub = userService.getUsersSub(isOnline, (users) => {
      dispatch(updateUsers(users));
    });
    return () => {
      if (typeof userSub === "function") {
        userSub();
      }
    };
  }, [isOnline]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>UserList</Text>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setIsOnline(!isOnline)}>
          <View style={styles.checkbox}></View>
        </TouchableOpacity>
        <Text>Only Online Users</Text>
      </View>

      {userList.data?.map((value: IUserData, key: number) => (
        <TouchableOpacity
          key={key}
          style={styles.userContainer}
          onPress={() => createOneRoom(value.id)}
        >
          {value.id === activeUser ? (
            <View style={styles.activeUser}>
              <Image
                source={{ uri: value.profilePhoto }}
                style={styles.profilePhoto}
              />
              <Text style={styles.activeUserName}>{value.firstName}</Text>
            </View>
          ) : (
            <View style={styles.inactiveUser}>
              <Image
                source={{ uri: value.profilePhoto }}
                style={styles.profilePhoto}
              />
              <Text style={styles.inactiveUserName}>{value.firstName}</Text>
              {value.online && <View style={styles.onlineStatus} />}
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkbox: {
    marginRight: 8,
  },
  checkIcon: {
    width: 24,
    height: 24,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  activeUser: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    padding: 8,
    borderRadius: 8,
  },
  inactiveUser: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  onlineStatus: {
    width: 8,
    height: 8,
    backgroundColor: "green",
    borderRadius: 4,
    marginLeft: 8,
  },
  profilePhoto: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 8,
  },
  activeUserName: {
    fontWeight: "bold",
  },
  inactiveUserName: {},
});
export default UserList;
