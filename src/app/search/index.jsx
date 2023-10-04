import { router } from "expo-router";
import { Appbar, TextInput } from "react-native-paper";
import { Container } from "./styles";
import { StatusBar } from "expo-status-bar";

const { View } = require("react-native");

const SearchScreen = () => {
  return (
    <View>
      <StatusBar backgroundColor="#2469f4" style="light" />
      <Appbar style={{ backgroundColor: "#2469f4" }}>
        <Appbar.BackAction color="#ffffff" onPress={() => router.back()} />
        <Appbar.Content
          title="Search"
          titleStyle={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#ffffff",
          }}
        />
        <Appbar.Action icon="tune" color="#ffffff" />
      </Appbar>
      <Container>
        <TextInput
          placeholder="Find a person"
          focusable={false}
          left={<TextInput.Icon icon="magnify" color="#2469f4" />}
          mode="outlined"
          cursorColor="#2469f4"
          outlineColor="#3e7bf5"
          activeOutlineColor="#2469f4"
        />
      </Container>
    </View>
  );
};

export default SearchScreen;
