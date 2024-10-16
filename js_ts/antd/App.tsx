import { Input, List, Provider } from "@ant-design/react-native";
import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default function App() {
  const ref = useRef(null);

  return (
    <Provider>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
        <TextInput placeholder="Enter your name" />
        <View style={{ borderWidth: 2, width: "100%" }}>
          <List renderHeader="基本用法">
            <List.Item>
              <Input placeholder="请输入内容" />
            </List.Item>
          </List>
          {/* <List> */}
          {/*   <List.Item> */}
          {/*    <Input ref={ref} placeholder="Enter your name" /> */}
          {/*   </List.Item> */}
          {/* </List> */}
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
