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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{day.toUpperCase()}</Text>
      {!Async_Workout && <TextInput style={styles.input} placeholder='Workout' onChangeText={(val) => setWorkout(val)} value={workout} />}
      {Async_Workout && <Text style={styles.workoutText}>{Async_Workout.toUpperCase()}</Text>}
      {!Async_Workout && <Button title='Set Workout' onPress={Workout} />}
      <Text style={styles.separator}>...</Text>
      <TextInput style={styles.input} placeholder='Exercise' onChangeText={(val) => setType((prev) => ({ ...prev, exercise_name: val }))} value={type.exercise_name} />
      <TextInput style={styles.input} placeholder='Sets' onChangeText={(val) => setType((prev) => ({ ...prev, exercise_sets: val }))} value={type.exercise_sets} keyboardType='numeric' />
      <Button title='ADD' onPress={AddExercise} color={'#6F25CA'}/>
      <View style={styles.listContainer}>
        <FlatList
          data={exercises}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>{item.name} - {item.sets}x{item.sets}</Text>
              <Button title='❌' onPress={() => RemoveExercise(item.name)} color='#d9534f' />
            </View>
          )}
        />
      </View>
      <Button onPress={Clear} title='Reset' color='#d9534f'/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#6F25CA'
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    textAlign: 'center'
  },
  workoutText: {
    fontSize: 18,
    marginVertical: 10,
    color: '#6F25CA'
  },
  separator: {
    marginVertical: 10,
    fontSize: 18,
  },
  listContainer: {
    marginTop: 20,
    width: '100%',
    height: 300,
    marginBottom: 20
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  listItemText: {
    fontSize: 16,
  }
});