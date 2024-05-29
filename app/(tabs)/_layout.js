import { Tabs } from "expo-router"
import { StyleSheet, Text, View } from "react-native"
import { FontAwesome6 } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs screenOptions={{headerTitle: 'JIM', headerTitleAlign: 'center'}} >
        <Tabs.Screen name="index" options={{
          tabBarIcon: ({ focused })=>(
            <FontAwesome6 name="dumbbell" size={24} color={focused? 'orchid' : 'black'} />
          ),
          title: ''
        }}/>
        <Tabs.Screen name="progress" options={{
          tabBarIcon: ({ focused })=>(
            <FontAwesome6 name="bars-progress" size={24} color={focused? 'orchid' : 'black'} />
          ),
          title: ''
        }}/>
        <Tabs.Screen name="home" options={{
          tabBarIcon: ({ focused })=>(
            <FontAwesome6 name="calendar" size={24} color={focused? 'orchid' : 'black'} />
          ),
          title: ''
        }}/>
    </Tabs>
  );
}

