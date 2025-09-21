import { Colors } from '@/utils/colors';
import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="paper-plane" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
