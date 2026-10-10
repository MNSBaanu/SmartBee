import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Audio } from 'expo-av';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';

type Note = {
  id: number;
  title: string;
  content: string;
  date: string;
  duration: string;
};

export default function LectureNotesScreen() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [notes, setNotes] = useState<Note[]>([]);
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      if (permissionResponse?.status !== 'granted') {
        await requestPermission();
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(recording);
      setIsRecording(true);
      setRecordingDuration(0);
    } catch (err) {
      Alert.alert('Error', 'Failed to start recording');
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    setIsRecording(false);
    setIsProcessing(true);

    try {
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      const uri = recording.getURI();
      
      // Simulate AI processing (replace with actual API call)
      await processAudioToNotes(uri);
      
      setRecording(null);
    } catch (err) {
      Alert.alert('Error', 'Failed to stop recording');
      console.error('Failed to stop recording', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const processAudioToNotes = async (audioUri: string | null) => {
    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock AI-generated notes (replace with actual API call to OpenAI/Whisper + GPT)
    const newNote: Note = {
      id: Date.now(),
      title: `Lecture Notes - ${new Date().toLocaleDateString()}`,
      content: `# Key Points\n\n• Introduction to the topic\n• Main concepts discussed\n• Important formulas and definitions\n• Examples and case studies\n• Summary and conclusions\n\n## Detailed Notes\n\nThe lecture covered fundamental concepts...\n\n## Action Items\n- Review chapter 5\n- Complete assignment by Friday\n- Prepare for quiz next week`,
      date: new Date().toLocaleString(),
      duration: formatDuration(recordingDuration),
    };

    setNotes((prev) => [newNote, ...prev]);
    Alert.alert('Success', 'Notes generated successfully!');
  };

  const deleteNote = (id: number) => {
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setNotes((prev) => prev.filter((note) => note.id !== id)),
      },
    ]);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title">AI Lecture Notes</ThemedText>
          <ThemedText style={styles.subtitle}>
            Record lectures and get AI-generated notes
          </ThemedText>
        </View>

        {/* Recording Section */}
        <ThemedView style={styles.recordingCard}>
          <View style={styles.recordingHeader}>
            <IconSymbol
              name="waveform"
              size={24}
              color={isRecording ? '#EF4444' : Colors.light.tint}
            />
            <ThemedText type="subtitle">
              {isRecording ? 'Recording...' : 'Ready to Record'}
            </ThemedText>
          </View>

          {isRecording && (
            <View style={styles.durationContainer}>
              <View style={styles.recordingIndicator} />
              <ThemedText style={styles.duration}>
                {formatDuration(recordingDuration)}
              </ThemedText>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.recordButton,
              { backgroundColor: isRecording ? '#EF4444' : Colors.light.tint },
            ]}
            onPress={isRecording ? stopRecording : startRecording}
            disabled={isProcessing}
          >
            <IconSymbol
              name={isRecording ? 'stop.fill' : 'mic.fill'}
              size={32}
              color="#fff"
            />
          </TouchableOpacity>

          <ThemedText style={styles.recordHint}>
            {isRecording
              ? 'Tap to stop recording'
              : 'Tap to start recording lecture'}
          </ThemedText>

          {isProcessing && (
            <View style={styles.processingContainer}>
              <ActivityIndicator size="small" color={Colors.light.tint} />
              <ThemedText style={styles.processingText}>
                Processing audio and generating notes...
              </ThemedText>
            </View>
          )}
        </ThemedView>

        {/* Notes List */}
        <View style={styles.notesSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Recent Notes ({notes.length})
          </ThemedText>

          {notes.length === 0 ? (
            <ThemedView style={styles.emptyState}>
              <IconSymbol name="doc.text" size={48} color={Colors.light.icon} />
              <ThemedText style={styles.emptyText}>No notes yet</ThemedText>
              <ThemedText style={styles.emptySubtext}>
                Start recording a lecture to generate AI notes
              </ThemedText>
            </ThemedView>
          ) : (
            notes.map((note) => (
              <ThemedView key={note.id} style={styles.noteCard}>
                <View style={styles.noteHeader}>
                  <View style={styles.noteInfo}>
                    <ThemedText style={styles.noteTitle}>{note.title}</ThemedText>
                    <View style={styles.noteMeta}>
                      <IconSymbol name="clock" size={12} color={Colors.light.icon} />
                      <ThemedText style={styles.noteDate}>{note.date}</ThemedText>
                      <ThemedText style={styles.noteDuration}>
                        • {note.duration}
                      </ThemedText>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => deleteNote(note.id)}>
                    <IconSymbol name="trash" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>

                <ThemedText style={styles.noteContent} numberOfLines={4}>
                  {note.content}
                </ThemedText>

                <TouchableOpacity style={styles.viewButton}>
                  <ThemedText style={styles.viewButtonText}>View Full Notes</ThemedText>
                  <IconSymbol
                    name="chevron.right"
                    size={14}
                    color={Colors.light.tint}
                  />
                </TouchableOpacity>
              </ThemedView>
            ))
          )}
        </View>

        <View style={{ height: 100 }} />
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
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
  recordingCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  recordingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  recordingIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  duration: {
    fontSize: 24,
    fontWeight: '600',
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  recordHint: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
  },
  processingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  processingText: {
    fontSize: 12,
    opacity: 0.7,
  },
  notesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
    textAlign: 'center',
  },
  noteCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  noteInfo: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  noteMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  noteDate: {
    fontSize: 11,
    opacity: 0.6,
  },
  noteDuration: {
    fontSize: 11,
    opacity: 0.6,
  },
  noteContent: {
    fontSize: 13,
    lineHeight: 20,
    opacity: 0.8,
    marginBottom: 12,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FECC0B',
  },
});
