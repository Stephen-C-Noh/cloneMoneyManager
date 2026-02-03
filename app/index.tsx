import { Button, View } from "react-native";
import MonthlyTable from "./components/MonthlyTable";
import TransactionsScreen from "../TransactionsScreen";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <TransactionsScreen />  
      
      <MonthlyTable />        
      <Button title="Alert" onPress={() => alert("Alert Button Pressed!")}/>
    </View>
  );
}
