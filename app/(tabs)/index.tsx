import { Button, View } from "react-native";
import Header from "../Header";
import MonthlyTable from "../components/MonthlyTable";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <MonthlyTable />
      <Button title="Alert" onPress={() => alert("Alert Button Pressed!")} />
    </View>
  );
}
