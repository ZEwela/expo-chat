import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import MessageItem from './MessageItem'

export default function MessageList({messages}) {
  return (
    <ScrollView showsVerticalScrollIndicator className="flex-1">
    <FlatList
      data={messages}
      contentContainersStyle={{flex: 1, paddingVerical: 25 }}
      keyExtractor={item => Math.random()}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => <MessageItem item={item} index={index}/>}
    />
  </ScrollView>
  )
}