import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

type RowProps = {
  icon?: keyof typeof Ionicons.glyphMap;
  customIcon?: React.ReactNode;
  title: string;
  subtitle?: string;
  rightText?: string;
  rightTextColor?: string;
  onPress?: () => void;
};

function Row({
  icon,
  customIcon,
  title,
  subtitle,
  rightText,
  rightTextColor,
  onPress,
}: RowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      {customIcon ? (
        <View style={styles.rowIcon}>{customIcon}</View>
      ) : (
        icon && (
          <Ionicons
            name={icon}
            size={22}
            color="#b5b5b5"
            style={styles.rowIcon}
          />
        )
      )}

      <View style={styles.rowText}>
        <View style={styles.rowTitleLine}>
          <Text style={styles.title}>{title}</Text>

          {!!rightText && (
            <Text
              style={[
                styles.rightText,
                { color: rightTextColor ?? "#8e8e93" },
              ]}
            >
              {rightText}
            </Text>
          )}
        </View>

        {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </Pressable>
  );
}

function Section({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      {!!label && <Text style={styles.sectionLabel}>{label}</Text>}
      <View style={styles.card}>{children}</View>
    </View>
  );
}

export default function MoreScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Settings</Text>
        <Text style={styles.version}>2.12.3 AF</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <Section>
          <Row icon="calculator-outline" title="CalcBox" />
          <Row icon="desktop-outline" title="PC Manager" />
          <Row
            title="Help"
            customIcon={<FontAwesome5 name="question" size={22} color="#b5b5b5" />}
          />
          <Row icon="mail-outline" title="Feedback" />
          <Row icon="heart-outline" title="Rate it" />
          <Row
            title="Remove Ads." customIcon={
              <MaterialCommunityIcons
                name="advertisements-off"
                size={22}
                color="#b5b5b5"
              />
            }
          />
        </Section>

        <Section label="Trans.">
          <Row
            title="Transaction Settings"
            subtitle="Monthly Start Date, Carry-over Setting, Period, Other"
            customIcon={<FontAwesome5 name="book" size={22} color="#b5b5b5" />}
          />
          <Row icon="repeat-outline" title="Repeat Setting" />
          <Row icon="copy-outline" title="Copy-Paste Settings" />
        </Section>

        <Section label="Category/Accounts">
          <Row icon="cash-outline" title="Income Category Setting" />
          <Row icon="card-outline" title="Expenses Category Setting" />
          <Row
            icon="wallet-outline"
            title="Accounts Setting"
            subtitle="Account Group, Accounts, Include in totals, Transfer-Exp..."
          />
          <Row icon="pie-chart-outline" title="Budget Setting" />
        </Section>

        <Section label="Settings">
          <Row
            title="Backup"
            subtitle="Export, Import, A complete reset"
            customIcon={<Ionicons
            name="reload-sharp"
            size={22}
            color="#b5b5b5"
            style={{ transform: [{ rotate: "180deg" }] }}
            />}
            />

          <Row
            icon="lock-closed-outline"
            title="Passcode"
            rightText="OFF"
            rightTextColor="#ff3b30"
          />

          <Row icon="cash-outline" title="Main Currency Setting" subtitle="CAD($)" />
          <Row icon="cash-outline" title="Sub Currency Setting" />
          <Row
            title="Alarm Setting"
            customIcon={<MaterialCommunityIcons
            name="bell-outline"
            size={22}
            color="#b5b5b5"
            />}
          />
          <Row icon="color-palette-outline" title="Style" />
          <Row
            title="Application Icon" customIcon={ 
            <SimpleLineIcons
              name="rocket"
              size={22}
              color="#b5b5b5"
            />}
          />
          <Row icon="language-outline" title="Language Setting" />
          <Row
            title="Allow ad tracking" customIcon={
              <MaterialCommunityIcons
                name="advertisements"
                size={22}
                color="#b5b5b5"
              />
            }
          />
          
        </Section>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f7" },

  headerContainer: {
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingBottom: 12,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  header: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },
  version: {
    position: "absolute",
    right: 16,
    bottom: 12,
    fontSize: 13,
    color: "#b0b0b5",
  },

  scroll: { flex: 1 },

  section: { marginBottom: 18 },
  sectionLabel: {
    marginLeft: 16,
    marginBottom: 8,
    fontSize: 13,
    color: "#9aa0a6",
  },

  card: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e5e5ea",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  pressed: { opacity: 0.7 },

  rowIcon: { marginRight: 12 },
  rowText: { flex: 1 },

  rowTitleLine: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: { fontSize: 16, color: "#111" },

  rightText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },

  subtitle: { marginTop: 3, fontSize: 12.5, color: "#8e8e93" },
});
