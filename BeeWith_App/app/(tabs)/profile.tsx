import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function ProfileScreen() {
  const stats = [
    { label: 'Groups Joined', value: '12' },
    { label: 'Events Attended', value: '28' },
    { label: 'Connections', value: '156' },
  ];

  const menuItems = [
    { icon: 'person.circle', label: 'Edit Profile', color: '#FFB800' },
    { icon: 'bell', label: 'Notifications', color: '#FFB800' },
    { icon: 'shield', label: 'Privacy & Safety', color: '#FFB800' },
    { icon: 'questionmark.circle', label: 'Help & Support', color: '#FFB800' },
    { icon: 'gear', label: 'Settings', color: '#FFB800' },
  ];

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedView style={styles.profileSection}>
          <ThemedView style={styles.avatarContainer}>
            <ThemedText style={styles.avatar}>👤</ThemedText>
            <TouchableOpacity style={styles.editAvatarButton}>
              <IconSymbol name="camera.fill" size={16} color="#fff" />
            </TouchableOpacity>
          </ThemedView>
          
          <ThemedText type="title" style={styles.name}>John Doe</ThemedText>
          <ThemedText style={styles.bio}>
            Tech enthusiast | Coffee lover | Always up for an adventure 🚀
          </ThemedText>
          
          <ThemedView style={styles.locationContainer}>
            <IconSymbol name="location" size={16} color="#FFB800" />
            <ThemedText style={styles.location}>San Francisco, CA</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <ThemedView key={index} style={styles.statItem}>
            <ThemedText type="title" style={styles.statValue}>{stat.value}</ThemedText>
            <ThemedText style={styles.statLabel}>{stat.label}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Interests</ThemedText>
        <ThemedView style={styles.interestsContainer}>
          {['Technology', 'Hiking', 'Photography', 'Coffee', 'Travel', 'Reading'].map((interest, index) => (
            <ThemedView key={index} style={styles.interestTag}>
              <ThemedText style={styles.interestText}>{interest}</ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Account</ThemedText>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <IconSymbol name={item.icon} size={24} color={item.color} />
            <ThemedText style={styles.menuLabel}>{item.label}</ThemedText>
            <IconSymbol name="chevron.right" size={16} color="#666" />
          </TouchableOpacity>
        ))}
      </ThemedView>

      <ThemedView style={styles.section}>
        <TouchableOpacity style={styles.logoutButton}>
          <IconSymbol name="rectangle.portrait.and.arrow.right" size={20} color="#FF3B30" />
          <ThemedText style={styles.logoutText}>Sign Out</ThemedText>
        </TouchableOpacity>
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
    backgroundColor: '#FFFFFF',
  },
  profileSection: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    fontSize: 48,
    width: 96,
    height: 96,
    textAlign: 'center',
    lineHeight: 96,
    backgroundColor: '#FFF3CD', // Light yellow background
    borderRadius: 48,
    borderWidth: 3,
    borderColor: '#FFB800', // Yellow border
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFB800', // Yellow background
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFB800',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  name: {
    marginBottom: 8,
    color: '#000000', // Black text
  },
  bio: {
    textAlign: 'center',
    color: '#333333', // Dark gray
    marginBottom: 12,
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  location: {
    color: '#666666', // Dark gray
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FFB800', // Yellow border
    shadowColor: '#FFB800',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFB800', // Yellow numbers
  },
  statLabel: {
    fontSize: 12,
    color: '#666666', // Dark gray
    marginTop: 4,
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
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: '#FFF3CD', // Light yellow background
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFB800', // Yellow border
  },
  interestText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000', // Black text
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
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
  menuLabel: {
    marginLeft: 16,
    flex: 1,
    fontSize: 16,
    color: '#000000', // Black text
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FF3B30', // Red border
    gap: 8,
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    color: '#FF3B30', // Red text
    fontWeight: '600',
  },
});