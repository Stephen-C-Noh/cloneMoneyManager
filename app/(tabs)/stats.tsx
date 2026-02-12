import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StatsScreen() {
  const [activeTab, setActiveTab] = useState<"income" | "expenses">("expenses");
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const periods = ["Monthly", "Weekly", "Annually", "Period"];
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1)); // Feb 2026 (month is 0-indexed)

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.toLocaleString("en-US", { month: "short" });
    return `${year} ${month}`;
  };

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const categoryData = [
    {
      name: "Transport",
      percentage: 90.8,
      amount: 346.0,
      color: "#FF6B6B", // Coral/red
      legendFontColor: "#000",
    },
    {
      name: "Food",
      percentage: 6.0,
      amount: 23.0,
      color: "#FFA07A", // Orange
      legendFontColor: "#000",
    },
    {
      name: "Education",
      percentage: 3.1,
      amount: 12.0,
      color: "#FFD700", // Yellow
      legendFontColor: "#000",
    },
  ];
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Date navigation row - chevrons + "2026 Feb" + "Monthly" dropdown */}
      {/* ... */}
      <View style={styles.dateNav}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        {/* Center Date */}
        <Text style={styles.dateText}>{formatDate(currentDate)}</Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity>

        {/* Dropdown - Monthly, Weekly, Annually, Period */}
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setDropdownVisible(true)}
        >
          <Text style={styles.dropdownText}>{selectedPeriod}</Text>
          <Ionicons name="chevron-down" size={16} color={"#000"} />
        </TouchableOpacity>
      </View>

      {/* Income/Expenses Toggle */}
      <View style={styles.tabContainer}>
        {/* Income Tab */}
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab("income")}
        >
          <Text
            style={[
              styles.tabLabel,
              activeTab === "income" && styles.activeLabel,
            ]}
          >
            Income
          </Text>
          <Text
            style={[
              styles.tabAmount,
              activeTab === "income" && styles.activeAmount,
            ]}
          >
            $ 1,674.00
          </Text>
          {activeTab === "income" && <View style={styles.indicator} />}
        </TouchableOpacity>

        {/* Expenses Tab */}
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab("expenses")}
        >
          <Text
            style={[
              styles.tabLabel,
              activeTab === "expenses" && styles.activeLabel,
            ]}
          >
            Expenses
          </Text>
          <Text
            style={[
              styles.tabAmount,
              activeTab === "expenses" && styles.activeAmount,
            ]}
          >
            $ 381.00
          </Text>
          {activeTab === "expenses" && <View style={styles.indicator} />}
        </TouchableOpacity>
      </View>

      {/* Content below - pie chart, category list */}
      {activeTab === "income" ? (
        <View>{/* Income content */}</View>
      ) : (
        <View style={styles.chartContainer}>
          <PieChart
            data={categoryData}
            width={Dimensions.get("window").width}
            height={220}
            chartConfig={{ color: (opacity = 1) => `rgba(0,0,0,${opacity})` }}
            accessor="percentage"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },

  tabLabel: {
    fontSize: 14,
    color: "#999999", // Inactive gray
    marginBottom: 4,
  },

  activeLabel: {
    color: "#000000", // Active black
    fontWeight: "500",
  },

  tabAmount: {
    fontSize: 16,
    color: "#999999",
  },

  activeAmount: {
    color: "#000000",
    fontWeight: "600",
  },

  indicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "#FF6B6B", // Red underline
  },

  dateNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  dateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    gap: 4,
  },

  dropdownText: {
    fontSize: 14,
    color: "#000",
  },

  chartContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
});
