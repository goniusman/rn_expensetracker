import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RoundIconBtn from "../common/RoundIconBtn";
import colors from "../misc/colors";

const Welcome = ({ onFinish }) => {
  const [name, setName] = useState("");
  const handleOnChangeText = (text: React.SetStateAction<string>) => setName(text);
  const handleSubmit = async () => {
    const user = { name: name };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    if (onFinish) onFinish();
  };

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <Text style={styles.inputTitle}>Enter Your Name to Continue</Text>
        <TextInput
          value={name}
          onChangeText={handleOnChangeText}
          placeholder="Enter Name > 3 char"
          style={styles.textInput}
        />
        {name.trim().length >= 3 ? (
          <RoundIconBtn antIconName="arrowright" onPress={handleSubmit} color={undefined} style={undefined} size={undefined} />
        ) : null}
      </View>
    </>
  );
};

const width = Dimensions.get("window").width - 50;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.GRAY,
  },
  textInput: {
    borderWidth: 2,
    borderColor: colors.LIGHT,
    color: colors.DARK,
    width,
    height: 50,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 25,
    marginBottom: 15,
    textAlign: "center",
  },
  inputTitle: {
    // alignSelf: "flex-start",
    paddingLeft: 25,
    marginBottom: 5,
    opacity: 0.5,
    textAlign: "center",
  },
});

export default Welcome;
