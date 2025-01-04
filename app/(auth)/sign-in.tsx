import person from "../../assets/icons/person.png";
import lock from "../../assets/icons/lock.png";
import company from "@/assets/images/company.png"
import background from "@/assets/images/background.jpg"
import { useState } from "react";
import {View, Text, ScrollView, Image, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView} from 'react-native';
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown } from "react-native-reanimated";

const SignIn = () => {
    const [form, setForm] = useState({
        username:'',
        password:''
    });

    const handleChange = (name, value) => {
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        console.log('Form Data:', form);
        alert(`Username: ${form.username}\nEmail: ${form.password}`);
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

                        <View className="flex items-center mx-4 space-y-4">
                            <View className="flex flex-row items-center bg-gray-100 rounded-2xl border border-gray-300 p-3 mb-3">
                                <Animated.Image
                                    source={lock}
                                    entering={FadeInDown.delay(400)}
                                    className={"w-6 h-6 mr-3"}
                                />
                                <TextInput
                                className="flex-1 text-lg text-gray-400" 
                                placeholder="Username"
                                keyboardAppearance="dark"
                                placeholderTextColor={'gray'}
                                value={form.username}
                                onChangeText={(text) => handleChange('username', text)}
                                />
                            </View>
                            <View className="flex flex-row items-center bg-gray-100 rounded-2xl border border-gray-300 p-3 mb-5">
                                <Animated.Image
                                    source={person}
                                    entering={FadeInDown.delay(400)}
                                    className={"w-6 h-6 mr-3"}
                                />
                                <TextInput
                                className="flex-1 text-lg text-gray-400"
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
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default SignIn;