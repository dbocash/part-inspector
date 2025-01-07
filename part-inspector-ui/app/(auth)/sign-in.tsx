import person from "../../assets/icons/person.png";
import lock from "../../assets/icons/lock.png";
import background from "@/assets/images/background.jpg"
import { useState } from "react";
import {View, Text, ScrollView, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, SafeAreaView} from 'react-native';
import { StatusBar } from "expo-status-bar";
import Toast from 'react-native-toast-message'
import axios from 'axios';
import Animated, { FadeInDown } from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { setUsername } from "@/components/Redux/UserSlice";
import { Redirect } from "expo-router";

const SignIn = () => {
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        username:'',
        password:''
    });

    const handleChange = (name, value) => {
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    {/* Handling of the submit button is done here*/}
    const handleSubmit = async () => {
        if (!form.username || !form.password) {
            return;
        }

        {/* For fetching data from the database (Will want to call after the submit button is pressed
        First the button is pressed
        Then this is called to get the data
        Then we check if the passwords align and the username exists and we reroute.*/}
        var response = null;
        try {
            response = await axios.get(`https://qrlxlcaja8.execute-api.us-east-1.amazonaws.com/Dev/api/User/GetUserName?username=${form.username}`);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'The Username or Password did not match',
            });
            return;
        }

        if (response == null) {
            Toast.show({
                type: 'error',
                text1: 'The Username or Password did not match',
            });
            throw console.error('The API did not respond with anything');
        }

        const username = response.data.username;
        const password = response.data.password;

        console.log(`The username is ${username} and password is ${password}`)
            
        if ((form.password != password)) {
            Toast.show({
                type: 'error',
                text1: 'The Username or Password did not match',
            });
        } else {
            // console.log('The data is:', data);
            dispatch(setUsername(form.username));
            alert(`Username: ${form.username}\nEmail: ${form.password}`);
            <Redirect href={"/(tabs)/form"} />
        }
    };


    {/*TODO: Add checking for account information */}
    {/* TODO: Add error handling */}
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }} >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" >
                <View className="bg-white h-full w-full">
                    <StatusBar style="light"/>
                    <Animated.Image className="h-full w-full absolute" source={background} resizeMode={"cover"}/>

                    <View className="h-full w-full flex justify-around pt-40 pb-10">
                        <View className="flex items-center mb-10 pt-20r">
                            <Animated.Text entering={FadeInDown.delay(200)} 
                            className="text-5xl font-extrabold text-white shadow-lg tracking-wide">Login</Animated.Text>
                        </View>
                        <SafeAreaView className="flex items-center mx-4 space-y-4">
                            <View className="flex flex-row items-center bg-gray-200 rounded-2xl border border-gray-900 p-3 mb-5">
                                <Animated.Image
                                    source={lock}
                                    entering={FadeInDown.delay(400)}
                                    className={"w-6 h-6 mr-3"}
                                />
                                <TextInput
                                className="flex-1 text-lg mb-1 text-gray-800 h-9" 
                                placeholder="Username"
                                keyboardAppearance="dark"
                                placeholderTextColor={'gray'}
                                value={form.username}
                                onChangeText={(text) => handleChange('username', text)}
                                />
                            </View>
                            <View className="flex flex-row items-center bg-gray-200 rounded-2xl border border-gray-900 p-3 mb-5">
                                <Animated.Image
                                    source={person}
                                    entering={FadeInDown.delay(400)}
                                    className={"w-6 h-6 mr-3"}
                                />
                                <TextInput
                                className="flex-1 text-lg text-gray-800 h-9"
                                keyboardAppearance="dark"
                                placeholder="Password" 
                                placeholderTextColor={'gray'} 
                                secureTextEntry
                                value={form.password} 
                                onChangeText={(text) => handleChange('password', text)}
                                />
                            </View>
                            <View className="w-full">
                                <TouchableOpacity className="w-full bg-sky-400 p-3 rounded-2xl mb-3"
                                onPress={handleSubmit}>
                                    <Text className="text-xl font-bold text-white text-center">Login</Text>
                                </TouchableOpacity>

                            </View>
                        </SafeAreaView>
                    </View>
                </View>
            </ScrollView>
            <Toast />
        </KeyboardAvoidingView>
    );
}

export default SignIn;