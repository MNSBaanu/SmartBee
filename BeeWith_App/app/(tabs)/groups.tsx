import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';

export default function GroupsScreen() {
  const myGroups = [
    { 
      name: 'React Native Developers', 
      members: 234, 
      lastActivity: '2 hours ago',
      unread: 3,
      emoji: '💻'
    },
    { 
      name: 'Weekend Hikers', 
      members: 89, 
      lastActivity: '1 day ago',
      unread: 0,
      emoji: '🥾'
    },
    { 
      name: 'Coffee Enthusiasts', 
      members: 156, 
      lastActivity: '3 hours ago',
      unread: 7,
      emoji: '☕'
    },
  ];

  const suggestedGroups = [
    { name: 'Photography Club', members: 445, emoji: '📸' },
    { name: 'Book Readers United', members: 278, emoji: '📚' },
    { name: 'Local Foodies', members: 189, emoji: '🍕' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* iOS-style header with action button */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Groups</ThemedText>
        <TouchableOpacity style={styles.createButton}>
          <IconSymbol name="plus" size={16} color="#FFFFFF" />
          <ThemedText style={styles.createButtonText}>New</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* My Groups Section */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>My Groups</ThemedText>
        
        <View style={styles.groupsList}>
          {myGroups.map((group, index) => (
            <TouchableOpacity key={index} style={[
              styles.groupItem,
              index === myGroups.length - 1 && styles.lastItem
            ]}>
              <View style={styles.groupIcon}>
                <ThemedText style={styles.groupEmoji}>{group.emoji}</ThemedText>
              </View>
              <View style={styles.groupContent}>
                <ThemedText style={styles.groupName}>{group.name}</ThemedText>
                <ThemedText style={styles.groupMeta}>
                  {group.members} members • {group.lastActivity}
                </ThemedText>
              </View>
              <View style={styles.groupActions}>
                {group.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <ThemedText style={styles.unreadText}>{group.unread}</ThemedText>
                  </View>
                )}
                <IconSymbol name="chevron.right" size={16} color={Colors.light.tertiaryLabel} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ThemedView>

      {/* Suggested Groups Section */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Suggested for You</ThemedText>
        
        <View style={styles.groupsList}>
          {suggestedGroups.map((group, index) => (
            <TouchableOpacity key={index} style={[
              styles.groupItem,
              index === suggestedGroups.length - 1 && styles.lastItem
            ]}>
              <View style={styles.groupIcon}>
                <ThemedText style={styles.groupEmoji}>{group.emoji}</ThemedText>
              </View>
              <View style={styles.groupContent}>
                <ThemedText style={styles.groupName}>{group.name}</ThemedText>
                <ThemedText style={styles.groupMeta}>
                  {group.members} members
                </ThemedText>
              </View>
              <TouchableOpacity style={styles.joinButton}>
                <ThemedText style={styles.joinButtonText}>Join</ThemedText>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
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
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: 60,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: Colors.light.label,
    letterSpacing: -0.5,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
    ...Shadows.small,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.light.label,
    marginBottom: Spacing.md,
    marginHorizontal: Spacing.md,
  },
  groupsList: {
    backgroundColor: Colors.light.secondaryBackground,
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    ...Shadows.small,
  },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.light.separator,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.tertiaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  groupEmoji: {
    fontSize: 20,
  },
  groupContent: {
    flex: 1,
  },
  groupName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.light.label,
    marginBottom: 2,
  },
  groupMeta: {
    fontSize: 13,
    fontWeight: '400',
    color: Colors.light.secondaryLabel,
  },
  groupActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  unreadBadge: {
    backgroundColor: Colors.light.systemRed,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  joinButton: {
    backgroundColor: Colors.light.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: Spacing.xl,
  },
});