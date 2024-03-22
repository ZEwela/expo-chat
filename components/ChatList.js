import { FlatList, View } from 'react-native'
import React from 'react'
import ChatItem from './ChatItem'
import { useRouter } from 'expo-router'

export default function ChatList({users}) {
    const router = useRouter()
  return (
    <View className="flex-1">
      <FlatList
        data={users}
        contentContainersStyle={{flex: 1, paddingVerical: 25 }}
        keyExtractor={item => Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => <ChatItem item={item} index={index} router={router}/>}
      />
    </View>
  )
}
