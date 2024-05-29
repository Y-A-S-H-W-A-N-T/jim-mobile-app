import { Stack } from "expo-router"
import { StyleSheet, Text, View } from "react-native"
import { FontAwesome6 } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Stack screenOptions={{headerShown: false}} >
        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
    </Stack>
  );
}

