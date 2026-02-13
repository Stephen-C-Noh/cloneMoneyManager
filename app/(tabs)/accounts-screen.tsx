import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

//types
interface AccountItem {
  id: string;
  name: string;
  value: string;
  secondaryValue?: string;
  type: 'simple' | 'complex';
  isBold: boolean;
}

//data
const accountData: AccountItem[] = [
  { id: '1', name: 'Cash', value: '$ 0.00', type: 'simple', isBold: false },
  { id: '2', name: 'Cash', value: '$ 0.00', type: 'simple', isBold: true },
  { id: '3', name: 'Accounts', value: '$ 0.00', type: 'simple', isBold: false },
  { id: '4', name: 'Accounts', value: '$ 0.00', type: 'simple', isBold: true },
  { id: '5', name: 'Card', value: '$ 0.00', secondaryValue: '$ 0.00', type: 'complex', isBold: false },
  { id: '6', name: 'Card', value: '$ 0.00', secondaryValue: '$ 0.00', type: 'complex', isBold: true },
];

export default function AccountsScreen() {
  const renderItem = ({ item }: { item: AccountItem }) => (
    <View style={[styles.accountRow, item.isBold && styles.totalRowBackground]}>

      {/* Column 1: category name*/}
      <View style={styles.nameColumn}>
        <Text style={[styles.accountName, item.isBold ? styles.textBlackBold : styles.textGrey]}>
          {item.name}
        </Text>
      </View>

      <View style={styles.valueGroup}>

        {/* Column 2: balance payable */}
        <View style={styles.centerColumn}>
          {item.type === 'complex' ? (
            <>
              {!item.isBold && <Text style={styles.miniLabel}>Balance Payable</Text>}
              <Text style={[styles.accountValue, item.isBold ? styles.textBlackBold : styles.textGrey]}>
                {item.secondaryValue}
              </Text>
            </>
          ) : (

            <View style={{ width: 110 }} />
          )}
        </View>

        {/* Column 3:outst. balance */}
        <View style={styles.rightColumn}>
          {item.type === 'complex' && !item.isBold && (
            <Text style={styles.miniLabel}>Outst. Balance</Text>
          )}
          <Text style={[styles.accountValue, item.isBold ? styles.textBlackBold : styles.textGrey]}>
            {item.value}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      {/*Header*/}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Accounts</Text>
        <View style={styles.headerIcons}>
          <MaterialCommunityIcons name="chart-histogram" size={24} color="#111" style={{ marginRight: 16 }} />
          <MaterialCommunityIcons name="dots-vertical" size={24} color="#111" />
        </View>
      </View>

      {/* Summary Row */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Assets</Text>
          <Text style={[styles.summaryValue, { color: '#3498db' }]}>0.00</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Liabilities</Text>
          <Text style={[styles.summaryValue, { color: '#e74c3c' }]}>0.00</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Total</Text>
          <Text style={[styles.summaryValue, { color: '#111' }]}>0.00</Text>
        </View>
      </View>

      <FlatList
        data={accountData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        ItemSeparatorComponent={() => <View style={styles.rowSeparator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    color: '#111',
    fontSize: 18,
    fontWeight: '600'
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  summaryBox: {
    alignItems: 'center'
  },
  summaryLabel: {
    color: '#000000',
    fontSize: 13,
    marginBottom: 5
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111'
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  totalRowBackground: {
    backgroundColor: '#f9f9f9'
  },
  nameColumn: {
    flex: 1
  },
  valueGroup: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  centerColumn: {
    width: 110,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  rightColumn: {
    width: 90,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  textGrey: {
    color: '#857d7d',
    fontSize: 16
  },
  textBlackBold: {
    color: '#111',
    fontSize: 16,
    fontWeight: 'bold'
  },
  accountName: {
    fontSize: 16
  },
  accountValue: {
    fontSize: 16
  },
  miniLabel: {
    color: '#000000',
    fontSize: 10,
    marginBottom: 4,
    textAlign: 'center',
    width: '100%'
  },
  rowSeparator: {
    height: 1,
    backgroundColor: "#eee",
    marginHorizontal: 16,
  },
});