import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            overflow: "hidden",
            backgroundColor: "transparent", // Transparent to show the blur effect
          },
          default: {},
        }),
        tabBarBackground: () => (
          <BlurView
            intensity={80}
            style={{
              flex: 1, // Fill the tab bar area
              backgroundColor: "transparent",
            }}
          />
        ),
      }}
    >
      {/* Define your screens here */}
    </Tabs>
  );
}
