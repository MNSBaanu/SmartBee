import { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';

type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

interface ScheduleItem {
  time: string;
  subject: string;
  room: string;
  type: string;
}

type WeekSchedule = Record<DayOfWeek, ScheduleItem[]>;

export default function ScheduleScreen() {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Monday');
  
  const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const schedule: WeekSchedule = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Class Schedule</ThemedText>
        <ThemedText style={styles.subtitle}>Your weekly timetable</ThemedText>
      </View>

      {/* Day Selector */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.daySelector}
        contentContainerStyle={styles.daySelectorContent}
      >
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayChip,
              selectedDay === day && { backgroundColor: Colors.light.tint },
            ]}
            onPress={() => setSelectedDay(day)}
          >
            <ThemedText
              style={[
                styles.dayText,
                selectedDay === day && styles.dayTextActive,
              ]}
            >
              {day.substring(0, 3)}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Schedule List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ThemedText style={styles.dayTitle}>{selectedDay}</ThemedText>
        
        {schedule[selectedDay]?.length > 0 ? (
          schedule[selectedDay].map((item, index) => (
            <ThemedView key={index} style={styles.scheduleCard}>
              <View style={styles.timeSection}>
                <IconSymbol name="clock.fill" size={20} color={Colors.light.tint} />
                <ThemedText style={styles.timeText}>{item.time}</ThemedText>
              </View>
              
              <View style={styles.detailsSection}>
                <View style={styles.subjectRow}>
                  <ThemedText type="subtitle" style={styles.subjectText}>
                    {item.subject}
                  </ThemedText>
                  <View style={[
                    styles.typeBadge,
                    item.type === 'Lab' && styles.labBadge,
                    item.type === 'Event' && styles.eventBadge,
                  ]}>
                    <ThemedText style={styles.typeText}>{item.type}</ThemedText>
                  </View>
                </View>
                
                <View style={styles.roomRow}>
                  <IconSymbol name="location.fill" size={16} color={Colors.light.icon} />
                  <ThemedText style={styles.roomText}>{item.room}</ThemedText>
                </View>
              </View>
            </ThemedView>
          ))
        ) : (
          <ThemedView style={styles.emptyState}>
            <IconSymbol name="calendar.badge.exclamationmark" size={64} color={Colors.light.icon} />
            <ThemedText type="subtitle" style={styles.emptyTitle}>
              No classes scheduled
            </ThemedText>
            <ThemedText style={styles.emptyText}>
              Your schedule for {selectedDay} is empty
            </ThemedText>
          </ThemedView>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
  },
  header: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 4,
  },
  daySelector: {
    marginBottom: 20,
  },
  daySelectorContent: {
    gap: 8,
  },
  dayChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '600',
  },
  dayTextActive: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  scheduleCard: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 16,
  },
  timeSection: {
    alignItems: 'center',
    gap: 8,
    minWidth: 70,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  detailsSection: {
    flex: 1,
    gap: 8,
  },
  subjectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subjectText: {
    fontSize: 16,
    flex: 1,
  },
  typeBadge: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  labBadge: {
    backgroundColor: '#FEF3C7',
  },
  eventBadge: {
    backgroundColor: '#DCFCE7',
  },
  typeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0369A1',
  },
  roomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  roomText: {
    fontSize: 14,
    opacity: 0.7,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
    marginTop: 40,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  emptyTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: 'center',
  },
});
