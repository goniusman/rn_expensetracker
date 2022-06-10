import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import AddExpense from "./src/screen/addexpense";
import Dashboard from "./src/screen/main";
import Welcome from "./src/screen/welcome";
import ExpProvider from "./src/contexts/ExpProvider";

import colors from "./src/misc/colors";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState({});
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);

  const findUser = async () => {
    // await AsyncStorage.removeItem("user")
    const result = await AsyncStorage.getItem("user");
    if (result === null) return setIsAppFirstTimeOpen(true);
    setUser(JSON.parse(result));
    setIsAppFirstTimeOpen(false);
  };

  useEffect(() => {
    findUser();
  }, []);

  const RenderExpScreen = (props: any) => <Dashboard {...props} user={user} />;

  if (isAppFirstTimeOpen) return <Welcome onFinish={findUser} />;

  return (
    <>
      <NavigationContainer>
        <ExpProvider>
          <Stack.Navigator screenOptions={{ headerTransparent: true }}>
            <Stack.Screen
              options={{ title: "" }}
              component={RenderExpScreen}
              name="Dashboard"
            />
            <Stack.Screen
              options={{ title: "Add Amount" }}
              component={AddExpense}
              name="AddExpense"
            />
          </Stack.Navigator>
        </ExpProvider>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LIGHT,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 10,
  },
});
