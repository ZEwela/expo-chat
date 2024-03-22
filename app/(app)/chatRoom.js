import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import MessageList from '../../components/MessageList';
import { useAuth } from '../../context/authContext';
import { getRoomId } from '../../utilis/common';
import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function ChatRoom() {
    const item = useLocalSearchParams();
    const [messages, setMessages] = useState([])
    const {user} = useAuth()
    const textRef = useRef()
    const inputRef = useRef()
    
    useEffect(() => {
        createRoomIfNotExists();
        let roomId = getRoomId(user?.userId, item.userId);
        const docRef = doc(db, 'rooms', roomId);
        const messagesRef = collection(docRef, "messages");
        const q = query(messagesRef, orderBy('createdAt', 'asc'))

        let unsub = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map(doc => {
                return doc.data()
            })
            setMessages([...allMessages])
        })

    }, [])

    const createRoomIfNotExists = async() => {
        let roomId = getRoomId(user?.userId, item.userId);
        await setDoc(doc(db, "rooms", roomId), {
            roomId, 
            createdAt: Timestamp.fromDate(new Date())
        })
    }

    const handleSendMessage = async () => {
        let message = textRef.current.trim()
        if(!message) return;
        try{
            let roomId = getRoomId(user?.userId, item?.userId) 
            const docRef = doc(db, 'rooms', roomId);
            const messagesRef = collection(docRef, "messages");
            textRef.current= ""
            if(inputRef) inputRef?.current?.clear()

            const newDoc = await addDoc(messagesRef, {
                userId: user?.userId,
                text: message,
                senderName: user?.username,
                createdAt: Timestamp.fromDate(new Date())
            })
        }catch(err){
            Alert.alert('Message', err.message)
        }
    }
    
  return (
    <View className="flex-1">
        <View>
            <MessageList messages={messages} />
        </View>
        <View className="flex-1" >
            <View className="flex-row justify-between items-center mx-3">
                <View className="flex-row justify-between p-2 bg-white border ">
                    <TextInput
                        ref={inputRef}
                        placeholder="type message..."
                        className="flex-1"
                        onChangeText={value => textRef.current = value}
                    />
                    <TouchableOpacity onPress={handleSendMessage} className="bg-neutral-200 p-2 ">
                        <Text>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    </View>
  )
}