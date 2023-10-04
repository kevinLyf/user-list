import { StatusBar } from "expo-status-bar";

const { View } = require("react-native");
const { Appbar } = require("react-native-paper");

const Settings = () => {
  return (
    <View>
      <StatusBar backgroundColor="#2469f4" style="light" />
      <Appbar style={{ backgroundColor: "#2469f4" }}>
        <Appbar.Content
          title="Settings"
          titleStyle={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#ffffff",
          }}
        />
      </Appbar>
    </View>
  );
};

export default Settings;
