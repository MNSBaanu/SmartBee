import { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';

export default function HomeScreen() {
  const [chatMessage, setChatMessage] = useState('');

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Handle message sending logic here
      setChatMessage('');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.brandWrap}>
            <Image
              source={require('@/assets/images/SmartBee.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <ThemedText type="title">SmartBee</ThemedText>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <IconSymbol name="person.circle.fill" size={32} color={Colors.light.text} />
          </TouchableOpacity>
        </View>

        {/* Quick Planner */}
        <ThemedView style={styles.plannerCard}>
          <View style={styles.plannerSegment}>
            <ThemedText style={styles.segmentLabel}>What</ThemedText>
            <ThemedText style={styles.segmentValue}>Plan my day</ThemedText>
          </View>
          <View style={styles.plannerDivider} />
          <View style={styles.plannerSegment}>
            <ThemedText style={styles.segmentLabel}>When</ThemedText>
            <ThemedText style={styles.segmentValue}>Today</ThemedText>
          </View>
          <View style={styles.plannerDivider} />
          <View style={styles.plannerSegment}>
            <ThemedText style={styles.segmentLabel}>Focus</ThemedText>
            <ThemedText style={styles.segmentValue}>Classes + Assignment</ThemedText>
          </View>
          <TouchableOpacity
            style={[styles.askBeeButton, { backgroundColor: Colors.light.tint }]}>
            <ThemedText style={styles.askBeeText}>Ask Bee</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Hero Card */}
        <ThemedView style={[styles.heroCard, styles.card]}>
          <ThemedText style={styles.sectionLabel}>TODAY AT A GLANCE</ThemedText>
          <ThemedText type="title" style={styles.heroTitle}>
            Good Morning, Baanu
          </ThemedText>
          <ThemedText style={styles.muted}>
            You have 2 classes, 1 assignment due, and a club event at 4:00 PM.
          </ThemedText>
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: Colors.light.tint }]}>
              <ThemedText style={styles.primaryButtonText}>Open My Planner</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <ThemedText style={styles.secondaryButtonText}>Focus Session</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>

        {/* Info Cards Grid */}
        <View style={styles.cardGrid}>
          <ThemedView style={[styles.infoCard, styles.card]}>
            <ThemedText style={styles.sectionLabel}>CLASSES</ThemedText>
            <ThemedText type="subtitle">Operating Systems</ThemedText>
            <ThemedText style={styles.muted}>Starts in 45 mins • Room B-204</ThemedText>
          </ThemedView>

          <ThemedView style={[styles.infoCard, styles.card]}>
            <ThemedText style={styles.sectionLabel}>DEADLINE</ThemedText>
            <ThemedText type="subtitle">AI Mini Project</ThemedText>
            <ThemedText style={styles.muted}>Submission due today at 11:59 PM</ThemedText>
          </ThemedView>

          <ThemedView style={[styles.infoCard, styles.card]}>
            <ThemedText style={styles.sectionLabel}>ATTENDANCE</ThemedText>
            <ThemedText type="title">89%</ThemedText>
            <ThemedText style={styles.muted}>Need 3 more attended classes this week</ThemedText>
          </ThemedView>
        </View>

        {/* Virtual Friend Card */}
        <ThemedView style={[styles.friendCard, styles.card]}>
          <ThemedText style={styles.sectionLabel}>VIRTUAL FRIEND</ThemedText>
          <ThemedText type="subtitle">Bee says:</ThemedText>
          <ThemedText style={styles.quote}>
            "You are closest to your goal when you do the next small task. Want me to break your
            assignment into 3 quick steps?"
          </ThemedText>
          <View style={styles.chatForm}>
            <TextInput
              style={[
                styles.chatInput,
                {
                  color: Colors.light.text,
                  borderColor: Colors.light.text + '30',
                },
              ]}
              placeholder="Ask Bee to plan your day..."
              placeholderTextColor={Colors.light.text + '60'}
              value={chatMessage}
              onChangeText={setChatMessage}
            />
            <TouchableOpacity
              style={[styles.sendButton, { backgroundColor: Colors.light.tint }]}
              onPress={handleSendMessage}>
              <IconSymbol name="paperplane.fill" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </ThemedView>

        {/* Tasks Card */}
        <ThemedView style={[styles.tasksCard, styles.card]}>
          <ThemedText style={styles.sectionLabel}>UPCOMING</ThemedText>
          <View style={styles.tasksList}>
            <View style={styles.taskItem}>
              <ThemedText style={styles.taskTime}>10:00 AM</ThemedText>
              <ThemedText>DBMS Lab</ThemedText>
            </View>
            <View style={styles.taskDivider} />
            <View style={styles.taskItem}>
              <ThemedText style={styles.taskTime}>1:30 PM</ThemedText>
              <ThemedText>Library Book Return Reminder</ThemedText>
            </View>
            <View style={styles.taskDivider} />
            <View style={styles.taskItem}>
              <ThemedText style={styles.taskTime}>4:00 PM</ThemedText>
              <ThemedText>Coding Club Meetup</ThemedText>
            </View>
          </View>
        </ThemedView>

        <View style={{ height: 20 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  brandWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 32,
    height: 32,
  },
  profileButton: {
    padding: 4,
  },
  plannerCard: {
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  plannerSegment: {
    marginBottom: 12,
  },
  segmentLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1,
    opacity: 0.6,
    marginBottom: 4,
  },
  segmentValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  plannerDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: 12,
  },
  askBeeButton: {
    borderRadius: 20,
    padding: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  askBeeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  card: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  heroCard: {
    backgroundColor: '#FFFBEB',
  },
  sectionLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1,
    opacity: 0.6,
    marginBottom: 8,
  },
  heroTitle: {
    marginBottom: 8,
  },
  muted: {
    opacity: 0.7,
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
    flexWrap: 'wrap',
  },
  primaryButton: {
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    minWidth: 140,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  secondaryButton: {
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
    flex: 1,
    minWidth: 120,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontWeight: '600',
    fontSize: 14,
  },
  cardGrid: {
    gap: 12,
  },
  infoCard: {
    minHeight: 100,
  },
  friendCard: {
    marginTop: 0,
  },
  quote: {
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  chatForm: {
    flexDirection: 'row',
    gap: 8,
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tasksCard: {
    marginTop: 0,
  },
  tasksList: {
    marginTop: 8,
  },
  taskItem: {
    flexDirection: 'row',
    gap: 16,
    paddingVertical: 12,
  },
  taskTime: {
    fontWeight: '600',
    minWidth: 70,
  },
  taskDivider: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
});
