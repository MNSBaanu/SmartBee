import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function MessagesScreen() {
  const conversations = [
    {
      name: 'Sarah Chen',
      lastMessage: 'See you at the hiking meetup tomorrow!',
      time: '2m ago',
      unread: true,
      avatar: '👩‍💻',
      online: true,
    },
    {
      name: 'React Native Devs',
      lastMessage: 'Alex: Just pushed the new update to the repo',
      time: '15m ago',
      unread: true,
      avatar: '💻',
      online: false,
      isGroup: true,
    },
    {
      name: 'Mike Rodriguez',
      lastMessage: 'Thanks for the coffee recommendation!',
      time: '1h ago',
      unread: false,
      avatar: '☕',
      online: false,
    },
    {
      name: 'Weekend Hikers',
      lastMessage: 'Emma: Weather looks perfect for Saturday',
      time: '2h ago',
      unread: false,
      avatar: '🥾',
      online: false,
      isGroup: true,
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Messages</ThemedText>
        <TouchableOpacity style={styles.composeButton}>
          <IconSymbol name="square.and.pencil" size={20} color="#FFB800" />
        </TouchableOpacity>
      </ThemedView>

      <ScrollView style={styles.conversationsList}>
        {conversations.map((conversation, index) => (
          <TouchableOpacity key={index} style={styles.conversationCard}>
            <ThemedView style={styles.avatarContainer}>
              <ThemedText style={styles.avatar}>{conversation.avatar}</ThemedText>
              {conversation.online && <ThemedView style={styles.onlineIndicator} />}
            </ThemedView>
            
            <ThemedView style={styles.conversationContent}>
              <ThemedView style={styles.conversationHeader}>
                <ThemedText type="defaultSemiBold" style={styles.conversationName}>
                  {conversation.name}
                  {conversation.isGroup && (
                    <IconSymbol name="person.3.fill" size={14} color="#666" style={styles.groupIcon} />
                  )}
                </ThemedText>
                <ThemedText style={styles.conversationTime}>{conversation.time}</ThemedText>
              </ThemedView>
              
              <ThemedText 
                style={[
                  styles.lastMessage, 
                  conversation.unread && styles.unreadMessage
                ]}
                numberOfLines={1}
              >
                {conversation.lastMessage}
              </ThemedText>
            </ThemedView>
            
            {conversation.unread && <ThemedView style={styles.unreadDot} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ThemedView style={styles.emptyState}>
        <IconSymbol name="message.circle" size={64} color="#FFB800" style={styles.emptyIcon} />
        <ThemedText style={styles.emptyText}>
          Start connecting with your community!
        </ThemedText>
        <ThemedText style={styles.emptySubtext}>
          Join groups and events to start conversations
        </ThemedText>
      </ThemedView>
    </ThemedView>
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
  composeButton: {
    padding: 8,
  },
  conversationsList: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  conversationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0', // Light gray border
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    fontSize: 32,
    width: 48,
    height: 48,
    textAlign: 'center',
    lineHeight: 48,
    backgroundColor: '#FFF3CD', // Light yellow background
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#FFB800',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    backgroundColor: '#34C759',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  conversationName: {
    flex: 1,
    fontSize: 16,
    color: '#000000', // Black text
  },
  groupIcon: {
    marginLeft: 6,
  },
  conversationTime: {
    fontSize: 12,
    color: '#999999', // Light gray
  },
  lastMessage: {
    fontSize: 14,
    color: '#666666', // Dark gray
    lineHeight: 18,
  },
  unreadMessage: {
    color: '#000000', // Black for unread
    fontWeight: '500',
  },
  unreadDot: {
    width: 8,
    height: 8,
    backgroundColor: '#FFB800', // Yellow dot
    borderRadius: 4,
    marginLeft: 12,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#FFFFFF',
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
    color: '#000000', // Black text
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666666', // Dark gray
    textAlign: 'center',
  },
});