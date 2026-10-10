import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type NavItem = {
  name: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
};

const navItems: NavItem[] = [
  { name: 'home', label: 'Home', icon: 'home', route: '/' },
  { name: 'modules', label: 'Modules', icon: 'book', route: '/modules' },
  { name: 'schedule', label: 'Schedule', icon: 'calendar', route: '/schedule' },
  { name: 'tasks', label: 'Tasks', icon: 'checkmark-circle', route: '/tasks' },
  { name: 'more', label: 'More', icon: 'ellipsis-horizontal', route: '/explore' },
];

export function FloatingNavBar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (route: string) => {
    if (route === '/') return pathname === '/';
    return pathname.startsWith(route);
  };

  const getIcon = (name: string, active: boolean): keyof typeof Ionicons.glyphMap => {
    const iconMap: Record<string, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }> = {
      home: { active: 'home', inactive: 'home-outline' },
      modules: { active: 'book', inactive: 'book-outline' },
      schedule: { active: 'calendar', inactive: 'calendar-outline' },
      tasks: { active: 'checkmark-circle', inactive: 'checkmark-circle-outline' },
      more: { active: 'ellipsis-horizontal-circle', inactive: 'ellipsis-horizontal-circle-outline' },
    };
    return active ? iconMap[name].active : iconMap[name].inactive;
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        {navItems.map((item) => {
          const active = isActive(item.route);
          return (
            <Pressable
              key={item.name}
              style={styles.navItem}
              onPress={() => router.push(item.route as any)}
            >
              <View style={styles.iconWrapper}>
                <Ionicons
                  name={getIcon(item.name, active)}
                  size={24}
                  color={active ? '#FECC0B' : '#FFFFFF'}
                />
              </View>
              <Text style={[styles.label, active && styles.activeLabel]}>{item.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    left: 15,
    right: 15,
    zIndex: 1000,
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(18, 18, 18, 0.75)',
    borderRadius: 35,
    height: 70,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.5,
    shadowRadius: 25,
    elevation: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(20px)',
  },
  navItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 8,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 11,
    fontWeight: '500',
  },
  activeLabel: {
    color: '#FECC0B',
    fontWeight: '600',
  },
});
