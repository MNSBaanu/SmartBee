import { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  category: string;
}

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'AI Mini Project',
      description: 'Complete the machine learning assignment',
      dueDate: 'Today, 11:59 PM',
      priority: 'High',
      completed: false,
      category: 'Assignment',
    },
    {
      id: 2,
      title: 'DBMS Lab Report',
      description: 'Submit lab 5 report',
      dueDate: 'Tomorrow',
      priority: 'Medium',
      completed: false,
      category: 'Lab',
    },
    {
      id: 3,
      title: 'Library Book Return',
      description: 'Return "Operating Systems" book',
      dueDate: 'Mar 15',
      priority: 'Low',
      completed: false,
      category: 'Other',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Completed'>('All');

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setTasks(tasks.filter(task => task.id !== id)),
      },
    ]);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Pending') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return '#EF4444';
      case 'Medium': return '#F59E0B';
      case 'Low': return '#10B981';
      default: return '#6B7280';
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View>
          <ThemedText type="title">Tasks & Assignments</ThemedText>
          <ThemedText style={styles.subtitle}>
            {filteredTasks.filter(t => !t.completed).length} pending tasks
          </ThemedText>
        </View>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: Colors.light.tint }]}
          onPress={() => setModalVisible(true)}
        >
          <IconSymbol name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {(['All', 'Pending', 'Completed'] as const).map((filterOption) => (
          <TouchableOpacity
            key={filterOption}
            style={[
              styles.filterTab,
              filter === filterOption && { backgroundColor: Colors.light.tint },
            ]}
            onPress={() => setFilter(filterOption)}
          >
            <ThemedText
              style={[
                styles.filterText,
                filter === filterOption && styles.filterTextActive,
              ]}
            >
              {filterOption}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredTasks.map((task) => (
          <ThemedView key={task.id} style={styles.taskCard}>
            <View style={styles.taskHeader}>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  task.completed && { backgroundColor: Colors.light.tint },
                ]}
                onPress={() => toggleTask(task.id)}
              >
                {task.completed && (
                  <IconSymbol name="checkmark" size={16} color="#fff" />
                )}
              </TouchableOpacity>

              <View style={styles.taskContent}>
                <ThemedText
                  type="subtitle"
                  style={[
                    styles.taskTitle,
                    task.completed && styles.taskTitleCompleted,
                  ]}
                >
                  {task.title}
                </ThemedText>
                <ThemedText style={styles.taskDescription}>
                  {task.description}
                </ThemedText>

                <View style={styles.taskMeta}>
                  <View style={styles.categoryBadge}>
                    <ThemedText style={styles.categoryText}>{task.category}</ThemedText>
                  </View>
                  <View style={styles.metaRow}>
                    <IconSymbol name="clock" size={14} color={Colors.light.icon} />
                    <ThemedText style={styles.dueDate}>{task.dueDate}</ThemedText>
                  </View>
                </View>
              </View>

              <View style={styles.taskActions}>
                <View
                  style={[
                    styles.priorityDot,
                    { backgroundColor: getPriorityColor(task.priority) },
                  ]}
                />
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteTask(task.id)}
                >
                  <IconSymbol name="trash" size={18} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          </ThemedView>
        ))}

        {filteredTasks.length === 0 && (
          <ThemedView style={styles.emptyState}>
            <IconSymbol name="checkmark.circle" size={48} color={Colors.light.icon} />
            <ThemedText style={styles.emptyText}>
              {filter === 'Completed' ? 'No completed tasks yet' : 'No tasks found'}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 4,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  taskCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  taskHeader: {
    flexDirection: 'row',
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.light.tint,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  taskContent: {
    flex: 1,
    gap: 6,
  },
  taskTitle: {
    fontSize: 16,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  taskDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  categoryBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dueDate: {
    fontSize: 12,
    opacity: 0.6,
  },
  taskActions: {
    alignItems: 'center',
    gap: 12,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  deleteButton: {
    padding: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
    opacity: 0.6,
  },
});
