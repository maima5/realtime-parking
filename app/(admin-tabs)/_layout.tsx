import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AdminTabLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
          tabBarBackground: () => <View style={styles.tabBarBackground} />,
        }}
      >
        <Tabs.Screen
          name="users"
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
        <Tabs.Screen
          name="locations"
          options={{
            title: 'Locations',
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
        <Tabs.Screen
          name="history"
          options={{
            title: 'History',
            tabBarIcon: ({ focused }) => (
              <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
                <Ionicons 
                  name={focused ? "time" : "time-outline"} 
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
    bottom: Platform.OS === 'ios' ? 40 : 24,
    left: '50%',
    transform: [{ translateX: -140 }], // Setengah dari width (280/2) agar simetris di tengah
    width: 280, // Lebih lebar karena menampung 4 ikon
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