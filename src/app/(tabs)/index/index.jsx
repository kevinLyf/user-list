import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Alert, FlatList, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  ActivityIndicator,
  Appbar,
  Avatar,
  Button,
  Text,
  TextInput,
  Title,
} from "react-native-paper";
import styled from "styled-components";
import Api from "../../../services/api";
import { BottomSheet, ListItem } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const list = [
    {
      title: "Male",
      titleStyle: { color: "#000", fontWeight: "bold" },

      onPress: () => {
        setUsers(users.sort((a, b) => (a.gender == "male" ? -1 : 1)));
        setOpen(false);
      },
    },
    {
      title: "Female",
      titleStyle: { color: "#000", fontWeight: "bold" },

      onPress: () => {
        setUsers(users.sort((a, b) => (a.gender == "female" ? -1 : 1)));
        setOpen(false);
      },
    },
    {
      title: "Cancel",
      titleStyle: { color: "#ffffff", fontWeight: "bold" },
      containerStyle: {
        backgroundColor: "red",
      },
      onPress: () => setOpen(false),
    },
  ];

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
      <TouchableOpacity
        delayLongPress={700}
        onLongPress={() => {
          if (!selected.includes(item.login.uuid) && selected.length == 0) {
            setSelected(selected.concat(item.login.uuid));
          } else if (selected.length == 0) {
            setSelected(selected.filter((id) => id != item.login.uuid));
          }
        }}
        onPress={() => {
          if (!selected.includes(item.login.uuid) && selected.length > 0) {
            setSelected(selected.concat(item.login.uuid));
          } else {
            setSelected(selected.filter((id) => id != item.login.uuid));
          }
        }}
      >
        <Card>
          {selected.includes(item.login.uuid) ? (
            <Avatar.Icon icon="check" style={{ backgroundColor: "#2469f4" }} />
          ) : (
            <Avatar.Image source={{ uri: item.picture.large }} />
          )}
          <Body>
            <Title>
              {item.name.first} {item.name.last}
            </Title>
            <Text>{item.email}</Text>
            <Text>{item.gender}</Text>
          </Body>
        </Card>
      </TouchableOpacity>
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
    <SafeAreaProvider>
      <View>
        <StatusBar backgroundColor="#2469f4" style="light" />
        <Appbar style={{ backgroundColor: "#2469f4" }}>
          <Appbar.Action icon="blank" color="#ffffff" />
          <Appbar.Content
            title={
              selected.length == 0 ? "Users" : `Selected: ${selected.length}`
            }
            titleStyle={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#ffffff",
            }}
          />
          <Appbar.Action
            icon="tune"
            color="#ffffff"
            onPress={() => setOpen(true)}
          />
        </Appbar>
        <Input
          onChangeText={(text) => setSearch(text)}
          value={search}
          placeholder="Find a person"
          focusable={false}
          left={<TextInput.Icon icon="magnify" color="#2469f4" />}
          mode="outlined"
          cursorColor="#2469f4"
          outlineColor="#3e7bf5"
          activeOutlineColor="#2469f4"
        />
        <Options>
          {selected.length > 0 && selected.length != users.length ? (
            <Button
              onPress={() => {
                setSelected([]);
              }}
              style={{ alignSelf: "flex-end" }}
              labelStyle={{ color: "#2469f4" }}
            >
              Cancel
            </Button>
          ) : null}
          {selected.length > 0 && selected.length != users.length ? (
            <Button
              onPress={() => {
                setSelected(users.map((item) => item.login.uuid));
              }}
              style={{ alignSelf: "flex-end" }}
              labelStyle={{ color: "#2469f4" }}
            >
              Select All
            </Button>
          ) : null}
          {selected.length == users.length ? (
            <Button
              onPress={() => {
                setSelected([]);
              }}
              style={{ alignSelf: "flex-end" }}
              labelStyle={{ color: "#2469f4" }}
            >
              Unselect All
            </Button>
          ) : null}
        </Options>
        <BottomSheet
          isVisible={open}
          containerStyle={{ backgroundColor: "transparent" }}
          onBackdropPress={() => setOpen(false)}
        >
          {list.map((item, i) => (
            <ListItem
              key={i}
              containerStyle={item.containerStyle}
              onPress={item.onPress}
            >
              <ListItem.Content>
                <ListItem.Title style={item.titleStyle}>
                  {item.title}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </BottomSheet>
        <FlatList
          data={users.filter(
            (user) =>
              `${user.name.first} ${user.name.last}`
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase()) ||
              user.email
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase())
          )}
          keyExtractor={(users) => users.login.uuid}
          renderItem={renderItem}
          onEndReached={getUsers}
          ListFooterComponent={renderLoading}
          onEndReachedThreshold={0.5}
          style={{ marginLeft: 10, marginRight: 10 }}
        />
      </View>
    </SafeAreaProvider>
  );
};

export default Home;

export const Input = styled(TextInput)`
  margin: 10px;
`;

const Card = styled.View`
  width: 100%;
  height: 80px;
  border-radius: 3px;
  margin: 10px 0px;
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

export const Options = styled.View`
  justify-content: flex-end;
  flex-direction: row;
  gap: 10px;
`;
