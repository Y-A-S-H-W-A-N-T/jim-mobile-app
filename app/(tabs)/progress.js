import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Progress() {

  const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']
  const num = new Date().getDay()
  const [workout,setWorkout] = useState('')
  const [exercises,setExercises] = useState([])

  const fetchExercises = async()=>{
    try {
      const jsonValue = await AsyncStorage.getItem(`${days[num]}-exercises`)
      if(jsonValue != null)
      {
        const new_exercise = JSON.parse(jsonValue).map((val)=>({
          ...val,
          done: 0
        }))
        setExercises(new_exercise)
      }
      
    } catch (e) {
      console.error('Failed to fetch data from AsyncStorage', e);
    }
  }

  const fetchDayWorkout = async()=>{
    try {
      const jsonValue = await AsyncStorage.getItem(`${days[num]}-workout`)
      jsonValue != null ? setWorkout(JSON.parse(jsonValue)) : '';
    } catch (e) {
      console.error('Failed to fetch data from AsyncStorage', e);
    }
  }

  useEffect(()=>{
    fetchDayWorkout()
    fetchExercises()
  },[])

  const callExercises = ()=>{
    fetchExercises()
    fetchDayWorkout()
  }

  const setDone = (id)=>{
    setExercises(prev => {
      const newExercises = [...prev];
      newExercises[id].done += 1;
      return newExercises;
    });
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title} onPress={callExercises}>{days[num].toUpperCase()}</Text>
      <Text style={styles.workout}>{workout.toUpperCase()}</Text>
      <Text style={{alignSelf: 'center'}} >Press on {days[num].toUpperCase()} to load or reset exercises</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={exercises}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.listItem}>
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{item.name}</Text>
                <Text style={styles.exerciseProgress}>{item.done}/{item.sets}</Text>
              </View>
              {item.done < item.sets && (
                <Text style={styles.addButton} onPress={() => setDone(index)}>➕</Text>
              )}
              {item.sets==item.done && <Text>✔️</Text>}
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
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 10,   // Padding for vertical space
    paddingHorizontal: 20, // Padding for horizontal space
    backgroundColor: '#9A5EE2', // Light gray background to resemble a button
    borderRadius: 5,       // Rounded corners
    borderWidth: 1,        // Border width
    borderColor: '#ccc',   // Border 
    elevation: 5
  },
  workout: {
    fontSize: 18,
    color: '#6F25CA',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  listContainer: {
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  exerciseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  exerciseProgress: {
    fontSize: 16,
    color: '#555',
  },
  addButton: {
    fontSize: 24,
    color: '#007BFF',
  },
});