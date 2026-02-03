import { Button, View } from "react-native";
import MonthlyTable from "./components/MonthlyTable";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <MonthlyTable />
      <Button title="Alert" onPress={() => alert("Alert Button Pressed!")} />
    </View>
  );
}
