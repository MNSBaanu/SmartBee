import { StyleSheet, ScrollView, View, TouchableOpacity, Image } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';

export default function ExploreScreen() {
  const campusFeatures = [
    {
      icon: 'chart.bar.fill',
      title: 'Attendance',
      description: 'Track your class attendance',
      color: '#3B82F6',
    },
    {
      icon: 'person.2.fill',
      title: 'Study Groups',
      description: 'Find and join study groups',
      color: '#8B5CF6',
    },
    {
      icon: 'building.2.fill',
      title: 'Campus Map',
      description: 'Navigate around campus',
      color: '#10B981',
    },
    {
      icon: 'bell.fill',
      title: 'Notifications',
      description: 'Manage your alerts',
      color: '#F59E0B',
    },
    {
      icon: 'doc.text.fill',
      title: 'Resources',
      description: 'Study materials and notes',
      color: '#EF4444',
    },
    {
      icon: 'calendar.badge.clock',
      title: 'Events',
      description: 'Campus events and activities',
      color: '#EC4899',
    },
    {
      icon: 'graduationcap.fill',
      title: 'GPA Calculator',
      description: 'Calculate your GPA',
      color: '#06B6D4',
    },
    {
      icon: 'person.circle.fill',
      title: 'Profile',
      description: 'Manage your account',
      color: '#6B7280',
    },
  ];

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/SmartBee.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <ThemedText type="title">More Features</ThemedText>
          <ThemedText style={styles.subtitle}>
            Explore all campus management tools
          </ThemedText>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <ThemedView style={styles.statCard}>
            <ThemedText type="title" style={styles.statValue}>89%</ThemedText>
            <ThemedText style={styles.statLabel}>Attendance</ThemedText>
          </ThemedView>
          <ThemedView style={styles.statCard}>
            <ThemedText type="title" style={styles.statValue}>3.8</ThemedText>
            <ThemedText style={styles.statLabel}>GPA</ThemedText>
          </ThemedView>
          <ThemedView style={styles.statCard}>
            <ThemedText type="title" style={styles.statValue}>5</ThemedText>
            <ThemedText style={styles.statLabel}>Pending</ThemedText>
          </ThemedView>
        </View>

        {/* Campus Features Grid */}
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Campus Tools
        </ThemedText>

        <View style={styles.featuresGrid}>
          {campusFeatures.map((feature, index) => (
            <TouchableOpacity key={index} style={styles.featureCard}>
              <ThemedView style={styles.featureCardInner}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: feature.color + '20' },
                  ]}>
                  <IconSymbol
                    name={feature.icon}
                    size={28}
                    color={feature.color}
                  />
                </View>
                <ThemedText style={styles.featureTitle}>{feature.title}</ThemedText>
                <ThemedText style={styles.featureDescription}>
                  {feature.description}
                </ThemedText>
              </ThemedView>
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings Section */}
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Settings
        </ThemedText>

        <ThemedView style={styles.settingsCard}>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <IconSymbol name="gear" size={20} color={Colors.light.icon} />
              <ThemedText>Preferences</ThemedText>
            </View>
            <IconSymbol name="chevron.right" size={16} color={Colors.light.icon} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <IconSymbol name="questionmark.circle" size={20} color={Colors.light.icon} />
              <ThemedText>Help & Support</ThemedText>
            </View>
            <IconSymbol name="chevron.right" size={16} color={Colors.light.icon} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <IconSymbol name="info.circle" size={20} color={Colors.light.icon} />
              <ThemedText>About SmartBee</ThemedText>
            </View>
            <IconSymbol name="chevron.right" size={16} color={Colors.light.icon} />
          </TouchableOpacity>
        </ThemedView>

        {/* Footer */}
        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>SmartBee v1.0.0</ThemedText>
          <ThemedText style={styles.footerText}>Your Campus Companion</ThemedText>
        </View>

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
    marginBottom: 24,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 16,
  },
  logo: {
    width: 60,
    height: 60,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 8,
    lineHeight: 20,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  statValue: {
    fontSize: 24,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
  },
  sectionTitle: {
    marginBottom: 16,
    fontSize: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  featureCard: {
    width: '48%',
  },
  featureCardInner: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    minHeight: 140,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 11,
    opacity: 0.6,
    textAlign: 'center',
    lineHeight: 16,
  },
  settingsCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  footer: {
    alignItems: 'center',
    gap: 4,
    paddingVertical: 16,
  },
  footerText: {
    fontSize: 12,
    opacity: 0.5,
  },
});
