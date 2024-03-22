import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ChatItem({item, router}) {

    const handleOpenChat = () => {
        router.push({pathname: '/chatRoom', params: item})
    }

    return (
      <TouchableOpacity onPress={handleOpenChat} className="m-4">
        <Text>{item.username}</Text>

        <View className="flex-row gap-4">
          <Text>Name</Text>
          <Text>time</Text>
        </View>
        <Text>Last msg</Text>
      </TouchableOpacity>
    )
}