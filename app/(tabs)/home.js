import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Home() {

  const Google_Gemini_API = 'AIzaSyDKE5GFsQKP_YDz8HHTh2kclbg7ApHfuuk'

  const genAI = new GoogleGenerativeAI(Google_Gemini_API)
  const model = genAI.getGenerativeModel({ model: "gemini-pro" })

  const [prompt,setPrompt] = useState('')
  const [res,setRes] = useState('')
  const [loading,setLoading] = useState(false)

  const AI = async()=>{
    if(prompt==='') return alert('ASK SOMETHING TO THE TRAINER')
    setLoading(true)
    try{
      const result = await model.generateContent(`${prompt},list the values, answer in points line by line, while answering dont use '**', use natural numbers`)
      const response = await result.response;
      const text = response.text();
      setRes(text)
    }
    catch(err){
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input} 
        placeholder='Try AI Trainer' 
        onChangeText={(val) => setPrompt(val)} 
      />
      <Text style={styles.buttonText} onPress={AI}>
        ASK TRAINER
      </Text>
      {loading && <Text>Generating...</Text>}
      <ScrollView style={styles.scrollView}>
        <Text style={styles.responseText}>
          {res}
        </Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    textAlign: 'center'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    backgroundColor: '#410C81',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  scrollView: {
    flex: 1,
    marginTop: 10,
  },
  responseText: {
    fontSize: 16,
    color: '#333',
  },
});