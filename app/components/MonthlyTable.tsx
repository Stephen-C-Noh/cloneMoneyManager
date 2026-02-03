// components/MonthlyTable.tsx

import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// Interfaces for type safety
interface MonthlyData {
  month: string;
  dateRange: string;
  income: number;
  expense: number;
  total: number;
  weeks?: WeeklyData[];
}

interface WeeklyData {
  dateRange: string;
  income: number;
  expense: number;
  total: number;
}

export default function MonthlyTable() {
  // Summary data (totals at the top)
  const summaryData = {
    totalIncome: 0.0,
    totalExpense: 0.0,
    total: 0.0,
  };

  // Sample monthly data - you'll expand this in Milestone 5
  const monthlyData: MonthlyData[] = [
    {
      month: "Dec",
      dateRange: "12-01 ~ 12-31",
      income: 0.0,
      expense: 0.0,
      total: 0.0,
      weeks: [
        { dateRange: "12-28 ~ 01-03", income: 0.0, expense: 0.0, total: 0.0 },
        { dateRange: "12-21 ~ 12-27", income: 0.0, expense: 0.0, total: 0.0 },
        { dateRange: "12-14 ~ 12-20", income: 0.0, expense: 0.0, total: 0.0 },
        { dateRange: "12-07 ~ 12-13", income: 0.0, expense: 0.0, total: 0.0 },
        { dateRange: "11-30 ~ 12-06", income: 0.0, expense: 0.0, total: 0.0 },
      ],
    },
    {
      month: "Nov",
      dateRange: "11-01 ~ 11-30",
      income: 0.0,
      expense: 0.0,
      total: 0.0,
    },
    {
      month: "Oct",
      dateRange: "10-01 ~ 10-31",
      income: 0.0,
      expense: 0.0,
      total: 0.0,
    },
    {
      month: "Sep",
      dateRange: "09-01 ~ 09-30",
      income: 0.0,
      expense: 0.0,
      total: 0.0,
    },
    {
      month: "Aug",
      dateRange: "08-01 ~ 08-31",
      income: 0.0,
      expense: 0.0,
      total: 0.0,
    },
    {
      month: "Jul",
      dateRange: "07-01 ~ 07-31",
      income: 0.0,
      expense: 0.0,
      total: 0.0,
    },
    {
      month: "Jun",
      dateRange: "06-01 ~ 06-30",
      income: 0.0,
      expense: 0.0,
      total: 0.0,
    },
    {
      month: "May",
      dateRange: "05-01 ~ 05-31",
      income: 0.0,
      expense: 0.0,
      total: 0.0,
    },
    {
      month: "Apr",
      dateRange: "04-01 ~ 04-30",
      income: 0.0,
      expense: 0.0,
      total: 0.0,
    },
    {
      month: "Mar",
      dateRange: "03-01 ~ 03-31",
      income: 0.0,
      expense: 0.0,
      total: 0.0,
    },
    {
      month: "Feb",
      dateRange: "02-01 ~ 02-28",
      income: 0.0,
      expense: 0.0,
      total: 0.0,
    },
    {
      month: "Jan",
      dateRange: "01-01 ~ 01-31",
      income: 0.0,
      expense: 0.0,
      total: 0.0,
    },
  ];
  return (
    <ScrollView style={styles.container}>
      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        {/* Income Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Income</Text>
          <Text style={styles.incomeText}>
            {summaryData.totalIncome.toFixed(2)}
          </Text>
        </View>

        {/* Expense Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Exp.</Text>
          <Text style={styles.expenseText}>
            {summaryData.totalExpense.toFixed(2)}
          </Text>
        </View>

        {/* Total Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total</Text>
          <Text style={styles.totalText}>{summaryData.total.toFixed(2)}</Text>
        </View>
      </View>

      {/* Monthly List */}
      <View style={styles.monthlyList}>
        {monthlyData.map((month, index) => (
          <View key={index}>
            {/* Month Row */}
            <View style={styles.monthRow}>
              {/* Left Section: Month name and date range */}
              <View style={styles.monthInfo}>
                <Text style={styles.monthName}>{month.month}</Text>
                <Text style={styles.dateRange}>{month.dateRange}</Text>
              </View>

              {/* Right Section: Income and Expense */}
              <View style={styles.amountsContainer}>
                <View style={styles.incomeColumn}>
                  <Text style={styles.incomeAmount}>
                    $ {month.income.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.expenseColumn}>
                  <Text style={styles.expenseAmount}>
                    $ {month.expense.toFixed(2)}
                  </Text>
                  <Text style={styles.monthTotal}>
                    Total $ {month.total.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Milestone 4: Week rows */}

            {month.weeks &&
              month.weeks.map((week, weekIndex) => (
                <View key={weekIndex} style={styles.weekRow}>
                  {/* Left: Date range (indented) */}
                  <View style={styles.weekInfo}>
                    <Text style={styles.weekDateRange}>{week.dateRange}</Text>
                  </View>

                  {/* Right: Amounts (same structure as month row) */}
                  <View style={styles.amountsContainer}>
                    <View style={styles.incomeColumn}>
                      <Text style={styles.weekIncome}>
                        $ {week.income.toFixed(2)}
                      </Text>
                    </View>

                    <View style={styles.expenseColumn}>
                      <Text style={styles.weekExpense}>
                        $ {week.expense.toFixed(2)}
                      </Text>
                      <Text style={styles.weekTotal}>
                        $ {week.total.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  placeholder: {
    padding: 20,
    alignItems: "center",
  },
  // Summary Section Styles
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  summaryCard: {
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  incomeText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#4A90E2", // Blue
  },
  expenseText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FF6B6B", // Red/Orange
  },
  totalText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333333", // Dark gray
  },
  // Monthly List Container
  monthlyList: {
    backgroundColor: "#FFFFFF",
  },

  // Month Row Styles
  monthRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  // Left section
  monthInfo: {
    flex: 1,
  },
  monthName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 2,
  },
  dateRange: {
    fontSize: 12,
    color: "#999999",
  },

  // Right section
  amountsContainer: {
    flexDirection: "row",
    gap: 50, // Space between income and expense columns
  },
  incomeColumn: {
    alignItems: "flex-end",
    width: 80,
  },
  expenseColumn: {
    alignItems: "flex-end",
    width: 80,
  },
  incomeAmount: {
    fontSize: 16,
    color: "#4A90E2", // Blue
    fontWeight: "500",
  },
  expenseAmount: {
    fontSize: 16,
    color: "#FF6B6B", // Red/Orange
    fontWeight: "500",
    marginBottom: 2,
  },
  monthTotal: {
    fontSize: 11,
    color: "#999999",
  },
  // Week Row Styles
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingLeft: 50,
    paddingRight: 16,
    paddingVertical: 12,
    backgroundColor: "#FAFAFA",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  weekInfo: {
    flex: 1,
  },
  weekDateRange: {
    fontSize: 15,
    color: "#666666",
  },
  weekIncome: {
    fontSize: 15,
    color: "#4A90E2",
    fontWeight: "500",
  },
  weekExpense: {
    fontSize: 15,
    color: "#FF6B6B",
    fontWeight: "500",
    marginBottom: 2,
  },
  weekTotal: {
    fontSize: 11,
    color: "#999999",
  },
});
