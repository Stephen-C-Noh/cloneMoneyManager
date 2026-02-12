import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
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

  const expenseData = [
    {
      name: "Transport",
      emoji: "\u{1F68C}",
      percentage: 90.8,
      amount: 346.0,
      color: "#FF6B6B",
      badgeColor: "#FF6B6B",
      legendFontColor: "#000",
    },
    {
      name: "Food",
      emoji: "\u{1F35C}",
      percentage: 6.0,
      amount: 23.0,
      color: "#FFA07A",
      badgeColor: "#FFA07A",
      legendFontColor: "#000",
    },
    {
      name: "Education",
      emoji: "\u{1F4D5}",
      percentage: 3.1,
      amount: 12.0,
      color: "#FFD700",
      badgeColor: "#FFD700",
      legendFontColor: "#000",
    },
  ];
  const incomeData = [
    {
      name: "Salary",
      emoji: "\u{1F4B0}",
      percentage: 72.5,
      amount: 1214.0,
      color: "#4CAF50",
      badgeColor: "#4CAF50",
      legendFontColor: "#000",
    },
    {
      name: "Freelance",
      emoji: "\u{1F4BB}",
      percentage: 17.9,
      amount: 300.0,
      color: "#66BB6A",
      badgeColor: "#66BB6A",
      legendFontColor: "#000",
    },
    {
      name: "Investments",
      emoji: "\u{1F4C8}",
      percentage: 9.6,
      amount: 160.0,
      color: "#A5D6A7",
      badgeColor: "#A5D6A7",
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

      {/* Dropdown Modal */}
      <Modal
        visible={dropdownVisible}
        transparent={true}
        animationType="fade"
      >
        <TouchableOpacity
          style={styles.dropdownOverlay}
          activeOpacity={1}
          onPress={() => setDropdownVisible(false)}
        >
          <View style={styles.dropdownMenu}>
            {periods.map((period, index) => (
              <TouchableOpacity
                key={period}
                onPress={() => {
                  setSelectedPeriod(period);
                  setDropdownVisible(false);
                }}
                style={[
                  styles.dropdownItem,
                  index < periods.length - 1 && styles.dropdownItemBorder,
                ]}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    selectedPeriod === period && styles.dropdownItemSelected,
                  ]}
                >
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Income/Expenses Toggle */}
      <View style={styles.tabContainer}>
        {/* Income Tab */}
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab("income")}
        >
          <View style={styles.tabContent}>
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
          </View>
          {activeTab === "income" && <View style={styles.indicator} />}
        </TouchableOpacity>

        {/* Expenses Tab */}
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab("expenses")}
        >
          <View style={styles.tabContent}>
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
          </View>
          {activeTab === "expenses" && <View style={styles.indicator} />}
        </TouchableOpacity>
      </View>

      {/* Content below - pie chart, category list */}
      {activeTab === "income" ? (
        <View style={styles.chartContainer}>
          {/* Income content */}
          <PieChart
            data={incomeData}
            width={Dimensions.get("window").width}
            height={260}
            chartConfig={{ color: (opacity = 1) => `rgba(0,0,0,${opacity})` }}
            accessor="percentage"
            backgroundColor="transparent"
            paddingLeft={String(Dimensions.get("window").width / 4)}
            hasLegend={false}
            absolute
          />
          <View style={styles.listSeparator} />
          <FlatList
            style={styles.categoryList}
            data={incomeData}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <View style={styles.categoryRow}>
                <View style={styles.categoryLeft}>
                  <View
                    style={[
                      styles.percentBadge,
                      { backgroundColor: item.badgeColor },
                    ]}
                  >
                    <Text style={styles.percentBadgeText}>
                      {Math.round(item.percentage)}%
                    </Text>
                  </View>
                  <Text style={styles.categoryEmoji}>{item.emoji}</Text>
                  <Text style={styles.categoryName}>{item.name}</Text>
                </View>
                <Text style={styles.categoryAmount}>
                  $ {item.amount.toFixed(2)}
                </Text>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.rowSeparator} />}
            ListFooterComponent={() => <View style={styles.rowSeparator} />}
          />
        </View>
      ) : (
        <View style={styles.chartContainer}>
          {/* Expenses content */}
          <PieChart
            data={expenseData}
            width={Dimensions.get("window").width}
            height={260}
            chartConfig={{ color: (opacity = 1) => `rgba(0,0,0,${opacity})` }}
            accessor="percentage"
            backgroundColor="transparent"
            paddingLeft={String(Dimensions.get("window").width / 4)}
            hasLegend={false}
            absolute
          />
          <View style={styles.listSeparator} />
          <FlatList
            style={styles.categoryList}
            data={expenseData}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <View style={styles.categoryRow}>
                <View style={styles.categoryLeft}>
                  <View
                    style={[
                      styles.percentBadge,
                      { backgroundColor: item.badgeColor },
                    ]}
                  >
                    <Text style={styles.percentBadgeText}>
                      {Math.round(item.percentage)}%
                    </Text>
                  </View>
                  <Text style={styles.categoryEmoji}>{item.emoji}</Text>
                  <Text style={styles.categoryName}>{item.name}</Text>
                </View>
                <Text style={styles.categoryAmount}>
                  $ {item.amount.toFixed(2)}
                </Text>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.rowSeparator} />}
            ListFooterComponent={() => <View style={styles.rowSeparator} />}
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

  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  tabLabel: {
    fontSize: 14,
    color: "#999999", // Inactive gray
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

  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  categoryLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  categoryList: {
    alignSelf: "stretch",
  },

  listSeparator: {
    height: 1,
    backgroundColor: "#eee",
    marginTop: 8,
    alignSelf: "stretch",
  },

  percentBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 44,
    alignItems: "center",
  },

  percentBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
  },

  categoryEmoji: {
    fontSize: 18,
  },

  categoryName: {
    fontSize: 16,
  },

  categoryAmount: {
    fontSize: 16,
    fontWeight: "600",
  },

  rowSeparator: {
    height: 1,
    backgroundColor: "#eee",
    marginHorizontal: 16,
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  dropdownMenu: {
    position: "absolute",
    top: 55,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  dropdownItem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  dropdownItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  dropdownItemText: {
    fontSize: 14,
    color: "#000",
  },

  dropdownItemSelected: {
    fontWeight: "700",
  },
});
