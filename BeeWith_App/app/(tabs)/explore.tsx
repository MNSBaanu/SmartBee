import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors, Spacing, BorderRadius, Shadows } from '@/constants/theme';

export default function ExploreScreen() {
  const categories = [
    { name: 'Technology', icon: 'laptopcomputer', count: 24, color: '#007AFF' },
    { name: 'Arts & Design', icon: 'paintbrush.fill', count: 18, color: '#FF3B30' },
    { name: 'Sports & Fitness', icon: 'figure.run', count: 31, color: '#34C759' },
    { name: 'Food & Cooking', icon: 'fork.knife', count: 15, color: '#FF9500' },
    { name: 'Travel', icon: 'airplane', count: 22, color: '#5856D6' },
    { name: 'Education', icon: 'book.fill', count: 19, color: '#AF52DE' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* iOS-style large title header */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Explore</ThemedText>
        <ThemedText style={styles.subtitle}>
          Find your tribe and discover new interests
        </ThemedText>
      </ThemedView>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <IconSymbol name="magnifyingglass" size={16} color={Colors.light.tertiaryLabel} />
          <ThemedText style={styles.searchPlaceholder}>Search communities...</ThemedText>
        </View>
      </View>

      {/* Categories Section */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Categories</ThemedText>
        
        <View style={styles.categoriesGrid}>
          {categories.map((category, index) => (
            <TouchableOpacity key={index} style={styles.categoryCard}>
              <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                <IconSymbol name={category.icon} size={24} color="#FFFFFF" />
              </View>
              <ThemedText style={styles.categoryName}>{category.name}</ThemedText>
              <ThemedText style={styles.categoryCount}>
                {category.count} groups
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ThemedView>

      {/* Trending Section */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Trending Now</ThemedText>
        
        <View style={styles.trendingList}>
          <TouchableOpacity style={styles.trendingItem}>
            <View style={styles.trendingIcon}>
              <ThemedText style={styles.trendingEmoji}>🔥</ThemedText>
            </View>
            <View style={styles.trendingContent}>
              <ThemedText style={styles.trendingTitle}>Weekend Hiking Group</ThemedText>
              <ThemedText style={styles.trendingDescription}>
                Join 47 adventurers exploring local trails this weekend
              </ThemedText>
              <ThemedText style={styles.trendingMeta}>📍 Local • 2.3k interested</ThemedText>
            </View>
            <IconSymbol name="chevron.right" size={16} color={Colors.light.tertiaryLabel} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.trendingItem}>
            <View style={styles.trendingIcon}>
              <ThemedText style={styles.trendingEmoji}>💻</ThemedText>
            </View>
            <View style={styles.trendingContent}>
              <ThemedText style={styles.trendingTitle}>React Native Study Circle</ThemedText>
              <ThemedText style={styles.trendingDescription}>
                Weekly meetups for mobile developers to share knowledge
              </ThemedText>
              <ThemedText style={styles.trendingMeta}>🌐 Online • 1.8k members</ThemedText>
            </View>
            <IconSymbol name="chevron.right" size={16} color={Colors.light.tertiaryLabel} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.trendingItem}>
            <View style={styles.trendingIcon}>
              <ThemedText style={styles.trendingEmoji}>🎨</ThemedText>
            </View>
            <View style={styles.trendingContent}>
              <ThemedText style={styles.trendingTitle}>Digital Art Collective</ThemedText>
              <ThemedText style={styles.trendingDescription}>
                Creative minds sharing techniques and inspiration
              </ThemedText>
              <ThemedText style={styles.trendingMeta}>🎯 Creative • 892 members</ThemedText>
            </View>
            <IconSymbol name="chevron.right" size={16} color={Colors.light.tertiaryLabel} />
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* Bottom spacing for tab bar */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: 60,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: Colors.light.label,
    marginBottom: Spacing.xs,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '400',
    color: Colors.light.secondaryLabel,
    lineHeight: 22,
  },
  searchContainer: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.secondaryBackground,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    gap: Spacing.sm,
    ...Shadows.small,
  },
  searchPlaceholder: {
    fontSize: 17,
    color: Colors.light.tertiaryLabel,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.light.label,
    marginBottom: Spacing.md,
    marginHorizontal: Spacing.md,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  categoryCard: {
    width: '47%',
    backgroundColor: Colors.light.secondaryBackground,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
    ...Shadows.small,
  },
  categoryIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.light.label,
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 13,
    fontWeight: '400',
    color: Colors.light.secondaryLabel,
    textAlign: 'center',
  },
  trendingList: {
    backgroundColor: Colors.light.secondaryBackground,
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    ...Shadows.small,
  },
  trendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.light.separator,
  },
  trendingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.tertiaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  trendingEmoji: {
    fontSize: 20,
  },
  trendingContent: {
    flex: 1,
  },
  trendingTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.light.label,
    marginBottom: 4,
  },
  trendingDescription: {
    fontSize: 13,
    fontWeight: '400',
    color: Colors.light.secondaryLabel,
    lineHeight: 18,
    marginBottom: 4,
  },
  trendingMeta: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.light.tertiaryLabel,
  },
  bottomSpacing: {
    height: Spacing.xl,
  },
});