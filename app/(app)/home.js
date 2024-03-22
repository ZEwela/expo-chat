import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ChatList from '../../components/ChatList';
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef } from '../../firebaseConfig';

export default function Home() {
  const {logout, user} = useAuth()
  const [users, setUsers] = useState([])
  const handleLogout = async() => {
    await logout()
  }

  useEffect(() => {
    if(user?.uid) {
      getUsers()
    }
  }, [])
  
  const getUsers = async () => {
    const q = query(usersRef, where('userId', '!=', user?.uid ));

    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach(doc=> {
      data.push({...doc.data()})
    })

    setUsers(data)
  }
  return (
    <View className="flex-1 justify-center items-center ">
      <Text style={{fontSize: hp(4.8)}} className="">Welcome {user.username}</Text>
      <TouchableOpacity className='rounded-xl bg-slate-500 justify-center items-center p-2 mt-5 mx-5' onPress={handleLogout}>
        <Text style={{fontSize: hp(3)}} className="text-neutral-50">Sign Out</Text>
      </TouchableOpacity>
      {users.length > 0 && (
        <View>
          <ChatList users={users} />
        </View>
      )}
    </View>
  )
}