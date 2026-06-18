import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AdminTabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: [
            styles.tabBar,
            { bottom: Math.max(insets.bottom + 16, 24) }
          ],
          tabBarBackground: () => <View style={styles.tabBarBackground} />,
        }}
      >
        {/* index.tsx → Manajemen User */}
        <Tabs.Screen
          name="index"
          options={{
            title: 'Users',
            tabBarIcon: ({ focused }) => (
              <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
                <Ionicons
                  name={focused ? "people" : "people-outline"}
                  size={22}
                  color={focused ? "#fff" : "#94A3B8"}
                />
              </View>
            ),
          }}
        />
        {/* log-tap.tsx → Log Tap */}
        <Tabs.Screen
          name="log-tap"
          options={{
            title: 'Log Tap',
            tabBarIcon: ({ focused }) => (
              <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
                <Ionicons
                  name={focused ? "pulse" : "pulse-outline"}
                  size={22}
                  color={focused ? "#fff" : "#94A3B8"}
                />
              </View>
            ),
          }}
        />
        {/* area.tsx → Area Parkir */}
        <Tabs.Screen
          name="area"
          options={{
            title: 'Area',
            tabBarIcon: ({ focused }) => (
              <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
                <Ionicons
                  name={focused ? "map" : "map-outline"}
                  size={22}
                  color={focused ? "#fff" : "#94A3B8"}
                />
              </View>
            ),
          }}
        />
        {/* violation.tsx → Pelanggaran */}
        <Tabs.Screen
          name="violation"
          options={{
            title: 'Violation',
            tabBarIcon: ({ focused }) => (
              <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
                <Ionicons
                  name={focused ? "alert-circle" : "alert-circle-outline"}
                  size={22}
                  color={focused ? "#fff" : "#94A3B8"}
                />
              </View>
            ),
          }}
        />
        {/* user.tsx → Data Satpam */}
        <Tabs.Screen
          name="user"
          options={{
            title: 'Satpam',
            tabBarIcon: ({ focused }) => (
              <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
                <Ionicons
                  name={focused ? "shield" : "shield-outline"}
                  size={22}
                  color={focused ? "#fff" : "#94A3B8"}
                />
              </View>
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D2E4FF',
  },
  tabBar: {
    position: 'absolute',
    left: 20,
    right: 20,
    height: 64,
    backgroundColor: '#fff',
    borderRadius: 32,
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  tabBarBackground: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 32,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  iconContainerFocused: {
    backgroundColor: '#1E1B4B', // Konsisten dengan warna tombol utama
  },
});