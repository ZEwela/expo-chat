import { View, Text, Platform } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const ios = Platform.OS === 'ios'

export default function HomeHeader() {
    const {top} = useSafeAreaInsets();
  return (
    <View style={{paddingTop:  ios ? top : top +10 }}>
      <Text>Chats</Text>
    </View>
  )
}