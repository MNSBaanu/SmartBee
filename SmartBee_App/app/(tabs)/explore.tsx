import { StyleSheet, ScrollView, View, TouchableOpacity, Image } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';

export default function ExploreScreen() {
  const features = [
    {
      icon: 'calendar',
      title: 'Smart Planner',
      description: 'AI-powered daily planning that adapts to your schedule and priorities.',
    },
    {
      icon: 'book.fill',
      title: 'Module Management',
      description: 'Track all your courses, credits, and instructors in one place.',
    },
    {
      icon: 'chart.bar.fill',
      title: 'Attendance Tracking',
      description: 'Monitor your attendance and get alerts when you need to attend more classes.',
    },
    {
      icon: 'bell.fill',
      title: 'Smart Reminders',
      description: 'Never miss a deadline with intelligent notifications and reminders.',
    },
    {
      icon: 'person.2.fill',
      title: 'Virtual Friend',
      description: 'Your AI companion that helps break down tasks and keeps you motivated.',
    },
    {
      icon: 'checkmark.circle.fill',
      title: 'Task Management',
      description: 'Organize assignments, projects, and activities efficiently.',
    },
  ];

  const stats = [
    { label: 'Active Students', value: '10K+' },
    { label: 'Universities', value: '50+' },
    { label: 'Success Rate', value: '95%' },
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
          <ThemedText type="title">Explore SmartBee</ThemedText>
          <ThemedText style={styles.subtitle}>
            Your intelligent campus companion for academic success
          </ThemedText>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <ThemedView key={index} style={styles.statCard}>
              <ThemedText type="title" style={styles.statValue}>
                {stat.value}
              </ThemedText>
              <ThemedText style={styles.statLabel}>{stat.label}</ThemedText>
            </ThemedView>
          ))}
        </View>

        {/* Features */}
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Features
        </ThemedText>

        {features.map((feature, index) => (
          <ThemedView key={index} style={styles.featureCard}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: Colors.light.tint + '20' },
              ]}>
              <IconSymbol
                name={feature.icon}
                size={28}
                color={Colors.light.tint}
              />
            </View>
            <View style={styles.featureContent}>
              <ThemedText type="subtitle" style={styles.featureTitle}>
                {feature.title}
              </ThemedText>
              <ThemedText style={styles.featureDescription}>{feature.description}</ThemedText>
            </View>
          </ThemedView>
        ))}

        {/* About */}
        <ThemedView style={styles.aboutCard}>
          <ThemedText type="subtitle" style={styles.aboutTitle}>
            About SmartBee
          </ThemedText>
          <ThemedText style={styles.aboutText}>
            SmartBee is designed to help students manage their academic life efficiently. From
            tracking modules and attendance to planning your day with AI assistance, we're here to
            make your campus experience smoother and more productive.
          </ThemedText>
          <TouchableOpacity
            style={[
              styles.learnMoreButton,
              { backgroundColor: Colors.light.tint },
            ]}>
            <ThemedText style={styles.learnMoreText}>Learn More</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Footer */}
        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>SmartBee v1.0.0</ThemedText>
          <ThemedText style={styles.footerText}>Made with 💛 for students</ThemedText>
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
    width: 80,
    height: 80,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 8,
    lineHeight: 20,
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
  featureCard: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 20,
  },
  aboutCard: {
    borderRadius: 20,
    padding: 20,
    marginTop: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  aboutTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 22,
    marginBottom: 16,
  },
  learnMoreButton: {
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  learnMoreText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
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
