import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>🐝 BeeWith</ThemedText>
        <ThemedText style={styles.subtitle}>Connect, Collaborate, Create Together</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Quick Actions</ThemedText>
        
        <TouchableOpacity style={styles.actionCard}>
          <IconSymbol name="person.2.fill" size={24} color="#FFB800" />
          <ThemedView style={styles.actionContent}>
            <ThemedText type="defaultSemiBold">Find People</ThemedText>
            <ThemedText style={styles.actionDescription}>
              Discover others with similar interests
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <IconSymbol name="plus.circle.fill" size={24} color="#FFB800" />
          <ThemedView style={styles.actionContent}>
            <ThemedText type="defaultSemiBold">Create Group</ThemedText>
            <ThemedText style={styles.actionDescription}>
              Start a new community or project
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <IconSymbol name="calendar" size={24} color="#FFB800" />
          <ThemedView style={styles.actionContent}>
            <ThemedText type="defaultSemiBold">Join Events</ThemedText>
            <ThemedText style={styles.actionDescription}>
              Participate in local activities
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Recent Activity</ThemedText>
        <ThemedView style={styles.activityCard}>
          <ThemedText>Welcome to BeeWith! 🎉</ThemedText>
          <ThemedText style={styles.activityTime}>Just now</ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000', // Black text
  },
  subtitle: {
    fontSize: 16,
    color: '#666666', // Dark gray
    textAlign: 'center',
  },
  section: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    marginBottom: 16,
    fontSize: 20,
    color: '#000000', // Black text
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FFB800', // Yellow border
    shadowColor: '#FFB800',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionContent: {
    marginLeft: 16,
    flex: 1,
  },
  actionDescription: {
    fontSize: 14,
    color: '#666666', // Dark gray
    marginTop: 4,
  },
  activityCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FFB800', // Yellow border
    shadowColor: '#FFB800',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#999999',
    marginTop: 8,
  },
});
