import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ClientTabLayout() {
  const insets = useSafeAreaInsets();

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
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ focused }) => (
              <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
                <Ionicons 
                  name={focused ? "grid" : "grid-outline"} 
                  size={24} 
                  color={focused ? "#fff" : "#94A3B8"} 
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="report"
          options={{
            title: 'Lapor',
            tabBarIcon: ({ focused }) => (
              <View style={[styles.iconContainer, focused && styles.iconContainerFocused]}>
                <Ionicons 
                  name={focused ? "alert-circle" : "alert-circle-outline"} 
                  size={24} 
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
    backgroundColor: '#D2E4FF', // matches bottom gradient
  },
  tabBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 40 : 24,
    left: '50%',
    transform: [{ translateX: -80 }], // roughly half of the width to center
    width: 160,
    height: 64,
    backgroundColor: '#fff',
    borderRadius: 32,
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  tabBarBackground: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 32,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  iconContainerFocused: {
    backgroundColor: '#1E1B4B', // Dark indigo/blue
  },
});
