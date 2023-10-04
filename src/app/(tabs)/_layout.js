import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs initialRouteName="index/index">
      <Tabs.Screen
        name="index/index"
        options={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarLabel: "Home",
          title: "Home",
          tabBarActiveTintColor: "#2469f4",
          tabBarLabelStyle: {
            fontWeight: "bold",
          },
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarLabel: "Settings",
          title: "Settings",
          tabBarActiveTintColor: "#2469f4",
          tabBarLabelStyle: {
            fontWeight: "bold",
          },
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="gear" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
