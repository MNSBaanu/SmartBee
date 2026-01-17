import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

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
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">My Groups</ThemedText>
        <TouchableOpacity style={styles.createButton}>
          <IconSymbol name="plus" size={20} color="#fff" />
          <ThemedText style={styles.createButtonText}>Create</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Active Groups</ThemedText>
        
        {myGroups.map((group, index) => (
          <TouchableOpacity key={index} style={styles.groupCard}>
            <ThemedView style={styles.groupIcon}>
              <ThemedText style={styles.groupEmoji}>{group.emoji}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.groupContent}>
              <ThemedText type="defaultSemiBold">{group.name}</ThemedText>
              <ThemedText style={styles.groupMeta}>
                {group.members} members • {group.lastActivity}
              </ThemedText>
            </ThemedView>
            {group.unread > 0 && (
              <ThemedView style={styles.unreadBadge}>
                <ThemedText style={styles.unreadText}>{group.unread}</ThemedText>
              </ThemedView>
            )}
          </TouchableOpacity>
        ))}
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Suggested for You</ThemedText>
        
        {suggestedGroups.map((group, index) => (
          <TouchableOpacity key={index} style={styles.suggestionCard}>
            <ThemedView style={styles.groupIcon}>
              <ThemedText style={styles.groupEmoji}>{group.emoji}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.groupContent}>
              <ThemedText type="defaultSemiBold">{group.name}</ThemedText>
              <ThemedText style={styles.groupMeta}>
                {group.members} members
              </ThemedText>
            </ThemedView>
            <TouchableOpacity style={styles.joinButton}>
              <ThemedText style={styles.joinButtonText}>Join</ThemedText>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFB800', // Yellow background
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    shadowColor: '#FFB800',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  createButtonText: {
    color: '#FFFFFF', // White text on yellow
    fontWeight: '600',
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
  groupCard: {
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
  suggestionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0', // Light gray border for suggestions
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  groupIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF3CD', // Light yellow background
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFB800',
  },
  groupEmoji: {
    fontSize: 24,
  },
  groupContent: {
    marginLeft: 16,
    flex: 1,
  },
  groupMeta: {
    fontSize: 14,
    color: '#666666', // Dark gray
    marginTop: 4,
  },
  unreadBadge: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  joinButton: {
    backgroundColor: '#FFB800', // Yellow background
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    shadowColor: '#FFB800',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  joinButtonText: {
    color: '#FFFFFF', // White text
    fontWeight: '600',
    fontSize: 14,
  },
});