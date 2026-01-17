import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function ExploreScreen() {
  const categories = [
    { name: 'Tech & Innovation', icon: 'laptopcomputer', count: 24 },
    { name: 'Arts & Creativity', icon: 'paintbrush.fill', count: 18 },
    { name: 'Sports & Fitness', icon: 'figure.run', count: 31 },
    { name: 'Food & Cooking', icon: 'fork.knife', count: 15 },
    { name: 'Travel & Adventure', icon: 'airplane', count: 22 },
    { name: 'Learning & Education', icon: 'book.fill', count: 19 },
  ];

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Explore Communities</ThemedText>
        <ThemedText style={styles.subtitle}>
          Find your tribe and discover new interests
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Popular Categories</ThemedText>
        
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryCard}>
            <IconSymbol name={category.icon} size={28} color="#FFB800" />
            <ThemedView style={styles.categoryContent}>
              <ThemedText type="defaultSemiBold">{category.name}</ThemedText>
              <ThemedText style={styles.categoryCount}>
                {category.count} active groups
              </ThemedText>
            </ThemedView>
            <IconSymbol name="chevron.right" size={16} color="#666" />
          </TouchableOpacity>
        ))}
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Trending Now</ThemedText>
        
        <ThemedView style={styles.trendingCard}>
          <ThemedText type="defaultSemiBold">🔥 Weekend Hiking Group</ThemedText>
          <ThemedText style={styles.trendingDescription}>
            Join 47 adventurers exploring local trails this weekend
          </ThemedText>
          <ThemedText style={styles.trendingMeta}>📍 Local • 2.3k interested</ThemedText>
        </ThemedView>

        <ThemedView style={styles.trendingCard}>
          <ThemedText type="defaultSemiBold">💻 React Native Study Circle</ThemedText>
          <ThemedText style={styles.trendingDescription}>
            Weekly meetups for mobile developers to share knowledge
          </ThemedText>
          <ThemedText style={styles.trendingMeta}>🌐 Online • 1.8k members</ThemedText>
        </ThemedView>
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
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666', // Dark gray
    textAlign: 'center',
    marginTop: 8,
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
  categoryCard: {
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
  categoryContent: {
    marginLeft: 16,
    flex: 1,
  },
  categoryCount: {
    fontSize: 14,
    color: '#666666', // Dark gray
    marginTop: 4,
  },
  trendingCard: {
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
    elevation: 2,
  },
  trendingDescription: {
    fontSize: 14,
    color: '#333333', // Dark text
    marginTop: 8,
    lineHeight: 20,
  },
  trendingMeta: {
    fontSize: 12,
    color: '#999999', // Light gray
    marginTop: 8,
  },
});