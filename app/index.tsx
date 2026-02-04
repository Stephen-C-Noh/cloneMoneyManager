import { Button, View } from "react-native";
import TransactionsScreen from "../TransactionsScreen";
import MonthlyTable from "./components/MonthlyTable";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <TransactionsScreen />
      <MonthlyTable />
      <Button title="Alert" onPress={() => alert("Alert Button Pressed!")} />
    </View>
  );
}
