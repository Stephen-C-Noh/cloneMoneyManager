import { StyleSheet, Text, View } from "react-native";

export default function MoreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>More Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
});
