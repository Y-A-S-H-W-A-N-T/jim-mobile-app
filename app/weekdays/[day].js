import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Day() {

    const { day } = useLocalSearchParams()
    const router = useRouter()

    const refresh = () => {
      router.replace(`/weekdays/${day}`);
    };

    const [type,setType] = useState({})
    const [exercises,addexercises] = useState([])
    const [workout,setWorkout] = useState('')
    const [Async_Workout,setAsync_Workout] = useState('')

    useEffect(()=>{
      const getExercises = async()=>{
        try {
          const jsonValue = await AsyncStorage.getItem(`${day}-exercises`)
          console.log(jsonValue)
          jsonValue != null ? addexercises(JSON.parse(jsonValue)) : [];
        } catch (e) {
          console.error('Failed to fetch data from AsyncStorage', e);
        }
      }
      const getWorkout = async()=>{
        try {
          const jsonValue = await AsyncStorage.getItem(`${day}-workout`)
          jsonValue != null ? setAsync_Workout(JSON.parse(jsonValue)) : '';
        } catch (e) {
          console.error('Failed to fetch data from AsyncStorage', e);
        }
      }
      getExercises()
      getWorkout()
    },[])

    const AddExercise = async()=>{
      addexercises((prev)=>[
        ...prev,
        {
          name: type.exercise_name,
          sets: type.exercise_sets
        }
      ])
      try {
        const jsonValue = await AsyncStorage.getItem(`${day}-exercises`)
        let dataArray = jsonValue != null ? JSON.parse(jsonValue) : []
        dataArray.push({name: type.exercise_name, sets: type.exercise_sets})
        await AsyncStorage.setItem(`${day}-exercises`, JSON.stringify(dataArray))
        setType({})
      } catch (e) {
        console.error('Failed to save data to AsyncStorage', e);
      }
    }

    const Workout = async()=>{
      await AsyncStorage.setItem(`${day}-workout`, JSON.stringify(workout))
      refresh()
    }

    const Clear = async()=>{
      await AsyncStorage.removeItem(`${day}-exercises`)
      await AsyncStorage.removeItem(`${day}-workout`)
      refresh()
    }

    const RemoveExercise = async(name)=>{
      addexercises(exercises.filter(val=>val.name!==name))
      let data = []
      exercises.map(async(val)=>{
        if(val.name !== name){
          data.push({name: val.name, sets: val.sets})
        }
      })
      await AsyncStorage.setItem(`${day}-exercises`, JSON.stringify(data))
    }

    console.log(exercises)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{day.toUpperCase()}</Text>
      {!Async_Workout && <TextInput placeholder='Add Day' onChangeText={(val)=>setWorkout(val)} value={workout}/>}
      {Async_Workout && <Text>{Async_Workout}</Text>}
      {!Async_Workout && <Button title='set workout' onPress={Workout}/>}
      <Text>...</Text>
      <TextInput placeholder='Exercise' onChangeText={(val)=>setType((prev)=>({...prev,exercise_name: val}))} value={type.exercise_name}/>
      <TextInput placeholder='sets' onChangeText={(val)=>setType((prev)=>({...prev,exercise_sets: val}))} value={type.exercise_sets}/>
      <Button title='ADD' onPress={AddExercise}/>
      <Button onPress={Clear} title='reset'/>
      <View>
          <FlatList
            data={exercises}
            renderItem={({ item })=>(
              <View>
                  <Text>{item.name} - {item.sets}x{item.sets}</Text><Button title='Remove exercise' onPress={()=>RemoveExercise(item.name)}/>
              </View>
            )}
          />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});