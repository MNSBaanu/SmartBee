import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* iOS-style large title header */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.greeting}>Good Morning</ThemedText>
        <ThemedText style={styles.title}>🐝 BeeWith</ThemedText>
        <ThemedText style={styles.subtitle}>Connect, Collaborate, Create Together</ThemedText>
      </ThemedView>

      {/* Quick Actions Section */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
        
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIconContainer}>
              <IconSymbol name="person.2.fill" size={24} color="#FFFFFF" />
            </View>
            <ThemedText style={styles.actionTitle}>Find People</ThemedText>
            <ThemedText style={styles.actionDescription}>
              Discover others with similar interests
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIconContainer}>
              <IconSymbol name="plus.circle.fill" size={24} color="#FFFFFF" />
            </View>
            <ThemedText style={styles.actionTitle}>Create Group</ThemedText>
            <ThemedText style={styles.actionDescription}>
              Start a new community or project
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIconContainer}>
              <IconSymbol name="calendar" size={24} color="#FFFFFF" />
            </View>
            <ThemedText style={styles.actionTitle}>Join Events</ThemedText>
            <ThemedText style={styles.actionDescription}>
              Participate in local activities
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIconContainer}>
              <IconSymbol name="message.fill" size={24} color="#FFFFFF" />
            </View>
            <ThemedText style={styles.actionTitle}>Messages</ThemedText>
            <ThemedText style={styles.actionDescription}>
              Chat with your connections
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* Recent Activity Section */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Recent Activity</ThemedText>
        
        <View style={styles.activityList}>
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <ThemedText style={styles.activityEmoji}>🎉</ThemedText>
            </View>
            <View style={styles.activityContent}>
              <ThemedText style={styles.activityTitle}>Welcome to BeeWith!</ThemedText>
              <ThemedText style={styles.activityTime}>Just now</ThemedText>
            </View>
          </View>

          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <ThemedText style={styles.activityEmoji}>👥</ThemedText>
            </View>
            <View style={styles.activityContent}>
              <ThemedText style={styles.activityTitle}>3 new groups match your interests</ThemedText>
              <ThemedText style={styles.activityTime}>2 hours ago</ThemedText>
            </View>
          </View>
        </View>
      </ThemedView>

      {/* Bottom spacing for tab bar */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background, // iOS light gray background
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: 60,
    paddingBottom: Spacing.lg,
    backgroundColor: Colors.light.background,
  },
  greeting: {
    fontSize: 17,
    fontWeight: '400',
    color: Colors.light.secondaryLabel,
    marginBottom: 4,
  },
  title: {
    fontSize: 34,
    fontWeight: '700', // iOS bold weight
    color: Colors.light.label,
    marginBottom: Spacing.xs,
    letterSpacing: -0.5, // iOS large title letter spacing
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '400',
    color: Colors.light.secondaryLabel,
    lineHeight: 22,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600', // iOS semibold
    color: Colors.light.label,
    marginBottom: Spacing.md,
    marginHorizontal: Spacing.md,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  actionCard: {
    width: '47%', // Two columns with gap
    backgroundColor: Colors.light.secondaryBackground,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
    ...Shadows.medium,
  },
  actionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.light.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.light.label,
    textAlign: 'center',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 13,
    fontWeight: '400',
    color: Colors.light.secondaryLabel,
    textAlign: 'center',
    lineHeight: 18,
  },
  activityList: {
    backgroundColor: Colors.light.secondaryBackground,
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    ...Shadows.small,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.light.separator,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.light.tertiaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  activityEmoji: {
    fontSize: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: Colors.light.label,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 13,
    fontWeight: '400',
    color: Colors.light.tertiaryLabel,
  },
  bottomSpacing: {
    height: Spacing.xl, // Extra space for tab bar
  },
});
