import { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';

interface Module {
  id: number;
  code: string;
  name: string;
  credits: string;
  semester: string;
  instructor: string;
}

export default function ModulesScreen() {
  const [modules, setModules] = useState<Module[]>([
    {
      id: 1,
      code: 'CS301',
      name: 'Operating Systems',
      credits: '4',
      semester: 'Fall 2026',
      instructor: 'Dr. Smith',
    },
    {
      id: 2,
      code: 'CS302',
      name: 'Database Management Systems',
      credits: '4',
      semester: 'Fall 2026',
      instructor: 'Dr. Johnson',
    },
    {
      id: 3,
      code: 'CS303',
      name: 'Artificial Intelligence',
      credits: '3',
      semester: 'Fall 2026',
      instructor: 'Dr. Williams',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    credits: '',
    semester: '',
    instructor: '',
  });

  const handleSubmit = () => {
    if (!formData.code || !formData.name || !formData.credits || !formData.semester || !formData.instructor) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (editingId) {
      setModules(
        modules.map((mod) =>
          mod.id === editingId ? { ...formData, id: editingId } : mod
        )
      );
      setEditingId(null);
    } else {
      setModules([...modules, { ...formData, id: Date.now() }]);
    }

    setFormData({ code: '', name: '', credits: '', semester: '', instructor: '' });
    setModalVisible(false);
  };

  const handleEdit = (module: Module) => {
    setFormData(module);
    setEditingId(module.id);
    setModalVisible(true);
  };

  const handleDelete = (id: number) => {
    Alert.alert('Delete Module', 'Are you sure you want to delete this module?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setModules(modules.filter((mod) => mod.id !== id)),
      },
    ]);
  };

  const handleCancel = () => {
    setFormData({ code: '', name: '', credits: '', semester: '', instructor: '' });
    setEditingId(null);
    setModalVisible(false);
  };

  const handleAddNew = () => {
    setFormData({ code: '', name: '', credits: '', semester: '', instructor: '' });
    setEditingId(null);
    setModalVisible(true);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View>
            <ThemedText type="title">Campus Modules</ThemedText>
            <ThemedText style={styles.subtitle}>
              Manage your academic modules and courses
            </ThemedText>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.beeButton}>
            <View style={styles.beeIconContainer}>
              <Image
                source={require('@/assets/images/SmartBee.png')}
                style={styles.beeLogo}
                resizeMode="contain"
              />
            </View>
            <ThemedText style={styles.beeLabel}>Bee AI</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: Colors.light.tint }]}
            onPress={handleAddNew}>
            <IconSymbol name="plus" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {modules.map((module) => (
          <ThemedView key={module.id} style={styles.moduleCard}>
            <View style={styles.moduleHeader}>
              <View style={styles.moduleInfo}>
                <View style={styles.codeTag}>
                  <ThemedText style={styles.codeText}>{module.code}</ThemedText>
                </View>
                <ThemedText type="subtitle" style={styles.moduleName}>
                  {module.name}
                </ThemedText>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => handleEdit(module)}>
                  <IconSymbol name="pencil" size={20} color={Colors.light.text} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => handleDelete(module.id)}>
                  <IconSymbol name="trash" size={20} color="#ff3b30" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.moduleDetails}>
              <View style={styles.detailRow}>
                <ThemedText style={styles.detailLabel}>Credits:</ThemedText>
                <ThemedText>{module.credits}</ThemedText>
              </View>
              <View style={styles.detailRow}>
                <ThemedText style={styles.detailLabel}>Semester:</ThemedText>
                <ThemedText>{module.semester}</ThemedText>
              </View>
              <View style={styles.detailRow}>
                <ThemedText style={styles.detailLabel}>Instructor:</ThemedText>
                <ThemedText>{module.instructor}</ThemedText>
              </View>
            </View>
          </ThemedView>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}>
        <View style={styles.modalOverlay}>
          <ThemedView style={styles.modalContent}>
            <ThemedText type="subtitle" style={styles.modalTitle}>
              {editingId ? 'Edit Module' : 'Add New Module'}
            </ThemedText>

            <View style={styles.formField}>
              <ThemedText style={styles.label}>Module Code</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  { color: Colors.light.text, borderColor: Colors.light.text + '30' },
                ]}
                placeholder="e.g., CS301"
                placeholderTextColor={Colors.light.text + '60'}
                value={formData.code}
                onChangeText={(text) => setFormData({ ...formData, code: text })}
              />
            </View>

            <View style={styles.formField}>
              <ThemedText style={styles.label}>Module Name</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  { color: Colors.light.text, borderColor: Colors.light.text + '30' },
                ]}
                placeholder="e.g., Operating Systems"
                placeholderTextColor={Colors.light.text + '60'}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
              />
            </View>

            <View style={styles.formField}>
              <ThemedText style={styles.label}>Credits</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  { color: Colors.light.text, borderColor: Colors.light.text + '30' },
                ]}
                placeholder="e.g., 4"
                placeholderTextColor={Colors.light.text + '60'}
                keyboardType="numeric"
                value={formData.credits}
                onChangeText={(text) => setFormData({ ...formData, credits: text })}
              />
            </View>

            <View style={styles.formField}>
              <ThemedText style={styles.label}>Semester</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  { color: Colors.light.text, borderColor: Colors.light.text + '30' },
                ]}
                placeholder="e.g., Fall 2026"
                placeholderTextColor={Colors.light.text + '60'}
                value={formData.semester}
                onChangeText={(text) => setFormData({ ...formData, semester: text })}
              />
            </View>

            <View style={styles.formField}>
              <ThemedText style={styles.label}>Instructor</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  { color: Colors.light.text, borderColor: Colors.light.text + '30' },
                ]}
                placeholder="e.g., Dr. Smith"
                placeholderTextColor={Colors.light.text + '60'}
                value={formData.instructor}
                onChangeText={(text) => setFormData({ ...formData, instructor: text })}
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}>
                <ThemedText style={styles.buttonText}>Cancel</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.submitButton,
                  { backgroundColor: Colors.light.tint },
                ]}
                onPress={handleSubmit}>
                <ThemedText style={styles.submitButtonText}>
                  {editingId ? 'Update' : 'Add'}
                </ThemedText>
              </TouchableOpacity>
            </View>
          </ThemedView>
        </View>
      </Modal>
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
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  beeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  beeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    borderWidth: 2,
    borderColor: '#FECC0B',
  },
  beeLogo: {
    width: 36,
    height: 36,
  },
  beeLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FECC0B',
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
  scrollView: {
    flex: 1,
  },
  moduleCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  moduleInfo: {
    flex: 1,
  },
  codeTag: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  codeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#92400E',
  },
  moduleName: {
    fontSize: 18,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 8,
  },
  moduleDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    opacity: 0.6,
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '90%',
  },
  modalTitle: {
    marginBottom: 20,
    fontSize: 20,
  },
  formField: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  submitButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
