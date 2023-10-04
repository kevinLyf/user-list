import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Appbar,
  Avatar,
  Text,
  Title,
} from "react-native-paper";
import Api from "../../../services/api";
import styled from "styled-components";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

const { View, Alert, FlatList } = require("react-native");

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await Api.get("/?results=20");
      setUsers(users.concat(response.data.results));
    } catch (err) {
      Alert.alert(err.toString());
    }
  };

  const renderItem = ({ item }) => {
    return (
      <Card>
        <Avatar.Image source={{ uri: item.picture.large }} />
        <Body>
          <Title>{item.name.first}</Title>
          <Text>{item.email}</Text>
        </Body>
      </Card>
    );
  };

  const renderLoading = () => {
    return (
      <Loading>
        <ActivityIndicator />
      </Loading>
    );
  };

  return (
    <View>
      <StatusBar backgroundColor="#2469f4" style="light" />
      <Appbar style={{ backgroundColor: "#2469f4" }}>
        <Appbar.Content
          title="Usuários"
          titleStyle={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#ffffff",
          }}
        />
        <Appbar.Action
          icon="magnify"
          color="#ffffff"
          onPress={() => router.push("/search")}
        />
      </Appbar>
      <FlatList
        data={users}
        keyExtractor={(users) => users.login.uuid}
        renderItem={renderItem}
        onEndReached={getUsers}
        ListFooterComponent={renderLoading}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default Home;

const Card = styled.View`
  width: 100%;
  height: 80px;
  border-radius: 3px;
  margin: 5px;
  padding: 5px;
  flex-direction: row;
`;

export const CardTitle = styled(Title)``;
export const Body = styled.View`
  margin-left: 10px;
`;

export const Loading = styled.View`
  width: 100%;
  height: 150px;
  padding: 30px;
  justify-content: flex-start;
  align-items: center;
`;
