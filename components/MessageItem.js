import { View, Text } from 'react-native'
import React from 'react'

export default function MessageItem({message}) {
  return (
    <View>
      <Text>{message}</Text>
    </View>
  )
}