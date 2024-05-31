import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Progress() {

  const days = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
  const num = new Date().getDay()
  const [workout,setWorkout] = useState('')
  const [exercises,setExercises] = useState([])

  useEffect(()=>{
    const fetchDayWorkout = async()=>{
      try {
        const jsonValue = await AsyncStorage.getItem(`${days[num-1]}-workout`)
        jsonValue != null ? setWorkout(JSON.parse(jsonValue)) : '';
      } catch (e) {
        console.error('Failed to fetch data from AsyncStorage', e);
      }
    }
    const fetchExercises = async()=>{
      try {
        const jsonValue = await AsyncStorage.getItem(`${days[num-1]}-exercises`)
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
    fetchDayWorkout()
    fetchExercises()
  },[])

  console.log(exercises)

  const setDone = (id)=>{
    setExercises(prev => {
      const newExercises = [...prev];
      newExercises[id].done += 1;
      return newExercises;
    });
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{days[num-1].toUpperCase()}</Text>
      <Text>{workout}</Text>
      <View>
          <FlatList
            data={exercises}
            renderItem={({ item, index })=>(
              <View>
                  <Text>{item.name}</Text>
                  <Text>{item.done}/{item.sets}</Text>
                  {item.done>=item.sets? '': <Text onPress={()=>setDone(index)}>➕</Text>}
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