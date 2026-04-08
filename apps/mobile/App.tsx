import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const actions = ['Send', 'Request', 'Fund', 'Withdraw'];
const transactions = [
  'Transfer to Amina · NGN 8,500',
  'GOtv Max renewal · NGN 7,200',
  'Wallet funding · NGN 25,000',
];

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eyebrow}>Mobile Wallet UI</Text>
        <Text style={styles.title}>FlowPocket</Text>
        <Text style={styles.subtitle}>
          A React Native fintech starter for P2P transfers, bill payments, QR receiving, and wallet security.
        </Text>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceValue}>NGN 285,000.00</Text>
        </View>

        <View style={styles.actionGrid}>
          {actions.map((action) => (
            <View key={action} style={styles.actionChip}>
              <Text style={styles.actionText}>{action}</Text>
            </View>
          ))}
        </View>

        <View style={styles.feedCard}>
          <Text style={styles.feedTitle}>Recent Activity</Text>
          {transactions.map((transaction) => (
            <Text key={transaction} style={styles.feedItem}>
              {transaction}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f7fb',
  },
  container: {
    padding: 24,
    gap: 18,
  },
  eyebrow: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#1570ef',
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#526477',
  },
  balanceCard: {
    borderRadius: 24,
    padding: 24,
    backgroundColor: '#0f172a',
  },
  balanceLabel: {
    color: '#cbd5e1',
    marginBottom: 8,
  },
  balanceValue: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionChip: {
    width: '47%',
    borderRadius: 18,
    paddingVertical: 18,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    shadowColor: '#102033',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  actionText: {
    color: '#102033',
    fontWeight: '700',
  },
  feedCard: {
    borderRadius: 24,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  feedTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#102033',
    marginBottom: 12,
  },
  feedItem: {
    color: '#516275',
    marginBottom: 8,
  },
});
