import { Tabs } from "expo-router"
import { StyleSheet, Text, View } from "react-native"
import { FontAwesome6 } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


export default function Layout() {
  return (
    <Tabs screenOptions={{ headerStyle: { backgroundColor: '#6F25CA' } }}>
        <Tabs.Screen name="index" options={{
          tabBarIcon: ({ focused })=>(
            <FontAwesome6 name="dumbbell" size={24} color={focused? '#6F25CA' : 'black'} />
          ),
          title: '',
        }}/>
        <Tabs.Screen name="progress" options={{
          tabBarIcon: ({ focused })=>(
            <FontAwesome5 name="tasks" size={24} color={focused? '#6F25CA' : 'black'} />
          ),
          title: ''
        }}/>
        <Tabs.Screen name="home" options={{
          tabBarIcon: ({ focused })=>(
            <MaterialCommunityIcons name="robot" size={24} color={focused? '#6F25CA' : 'black'} />
          ),
          title: ''
        }}/>
    </Tabs>
  );
}

