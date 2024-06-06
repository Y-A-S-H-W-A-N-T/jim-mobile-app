import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Home() {

  const Google_Gemini_API = 'AIzaSyDKE5GFsQKP_YDz8HHTh2kclbg7ApHfuuk'
  const Google_Gemini = 'https://gemini.googleapis.com/v1/endpoint'

  const genAI = new GoogleGenerativeAI(Google_Gemini_API)
  const model = genAI.getGenerativeModel({ model: "gemini-pro" })

  const [prompt,setPrompt] = useState('')
  const [res,setRes] = useState('')

  const AI = async()=>{
    console.log(prompt)
    const result = await model.generateContent(prompt)
    const response = await result.response;
    const text = response.text();
    setRes(text)
    console.log(text)
  }

  return (
    <View>
      <TextInput placeholder='Try AI' onChangeText={(val)=>setPrompt(val)}/>
      <Text onPress={AI}>ASK</Text>
      <ScrollView>
        <Text>{res}</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})