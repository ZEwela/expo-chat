import { AntDesign, Octicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, {  useRef, useState } from 'react'
import { Alert, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Loading from '../components/Loading'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useAuth } from '../context/authContext'

export default function SignUp() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const emailRef = useRef('')
    const passwordRef = useRef('')
    const usernameRef = useRef('')


    const {register} = useAuth()

    const handleSignUp = async () => {
        if(!emailRef.current || !passwordRef.current || !usernameRef.current) {
            Alert.alert('Sign Up', 'Please fill in all the fields.')
            return;
        }

        setLoading(true)
        let response = await register(emailRef.current.trim(), passwordRef.current, usernameRef.current)
        setLoading(false)
        if(!response.success) {
            Alert.alert('Sign up', response.msg)
        }
    }
  return (
    <View className="flex-1">
        <StatusBar variant="dark"/>
        <View className="flex-1 justify-center ">
            <Text className="text-center" style={{fontSize: hp(4)}}>Sign Up</Text>
            <View className="my-2 flex-col gap-4 justify-center ">
                <View style={{height: hp(7)}} className="flex-row mx-4 gap-4 px-4 bg-neutral-50 items-center rounded-xl">
                    <AntDesign name="user" size={hp(2.7)} color="gray" />
                    <TextInput 
                        onChangeText={value => usernameRef.current = value}
                        style={{height: hp(2)}} 
                        className="flex-1 font-semibold text-neutral-700"
                        placeholder="Username"
                        placeholderTextColor={'gray'}
                    /> 
                </View>
                <View style={{height: hp(7)}} className="flex-row mx-4 gap-4 px-4 bg-neutral-50 items-center rounded-xl">
                    <Octicons name="mail" size={hp(2.7)} color="gray" />
                    <TextInput 
                        onChangeText={value => emailRef.current = value}
                        style={{height: hp(2)}} 
                        className="flex-1 font-semibold text-neutral-700"
                        placeholder="Email"
                        placeholderTextColor={'gray'}
                    /> 
                </View>
                <View style={{height: hp(7)}} className="flex-row mx-4 gap-4 px-4 bg-neutral-50 items-center rounded-xl">
                    <AntDesign name="lock" size={24} color="black" />
                    <TextInput 
                        onChangeText={value => passwordRef.current = value}
                        style={{height: hp(2)}} 
                        className="flex-1 font-semibold text-neutral-700"
                        placeholder="Password"
                        secureTextEntry
                        placeholderTextColor={'gray'}
                    />  
                </View>
            </View>
            <View>
                { loading ? 
                <View className="flex-row justify-center">
                    <Loading size={hp(6.5)}/>
                </View>
                : 
                 <TouchableOpacity onPress={handleSignUp} className='bg-indigo-500 rounded-xl justify-center items-center p-2 mt-5 mx-5'>
                    <Text className="text-neutral-200">Sign Up</Text>
                </TouchableOpacity> 
                }   
            </View>

             <View className="flex-row justify-center mt-4">
                <Text>Already have account? </Text>
                <Pressable onPress={() => router.push('signIn')}>
                    <Text style={{fontSize: hp(1.8)}}>Sign In</Text>
                </Pressable>
            </View>
        </View>

    </View>
  )
}
