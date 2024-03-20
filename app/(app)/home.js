import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Home() {
  const {logout, user} = useAuth()
  const handleLogout = async() => {
    await logout()
  } 
  return (
    <View className="flex-1 justify-center items-center ">
      <Text style={{fontSize: hp(4.8)}} className="">Welcome {user.username}</Text>
      <TouchableOpacity className='rounded-xl bg-slate-500 justify-center items-center p-2 mt-5 mx-5' onPress={handleLogout}>
        <Text style={{fontSize: hp(3)}} className="text-neutral-50">Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}