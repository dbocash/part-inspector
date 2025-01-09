import { SetStateAction, useState } from "react";
import {View, Text, ScrollView, Image, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, LogBox} from 'react-native';
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown } from "react-native-reanimated";
import Toast from 'react-native-toast-message'
import camera from "@/assets/icons/camera.png"
import background from "@/assets/images/form-back.jpg"
import BarcodeScanner from '@/components/BarcodeScanner';
import DropdownPicker from "@/components/DropdownPicker";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/components/Redux/store";
import { PickerItems } from "@/types/type";
import axios from "axios";

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

export default function Form() {

  // For global variable usage (Validating username matches scanned)
  const username = useSelector((state: RootState) => state.user.username);
  const dispatch = useDispatch();

  // The items for the DropdownPicker to be able to select
  const itemsArray: PickerItems[] = [
    { label: 'Accept', value: 'accept' },
    { label: 'Reject', value: 'reject' },
  ];

  // Disposition Data from the dropdownpicker component (null or string)
  const [dispostionData, setDisposition] = useState<string | null>(null)

  // Manual entering of the badge number
  const [badgeNumber, setBadgeNumber] = useState('');

  // Sets scanner to visible or not
  // Used in toggleVisiblity
  const [scannerVisible, setIsVisible] = useState(false);

  // Sets the part number from the text-box
  const [partNumber, setPartNumber] = useState('')

  // Handles the disposition being changed from the dropdown component
  // disposition - The value of the dropdown list being returned
  const handleDisposition = (value: string | null) => {
    setDisposition(value)
  }

  // Toggles visibility of the scanner
  const toggleVisibility = () => {
      setIsVisible(!scannerVisible);
  }

  // Handles the scanned data
  // type - is the barcode type 
  // data - is the data scanned in by the badge
  const handleScannedData = (data: { type: string; data: string }) => {
    setBadgeNumber(data.data);
    setIsVisible(false);
  }

  // Validates the form
  // badgeNumber - must be 8 digits
  // partNumber - must be 8 digits and numbers
  // disposition - cannot be null
  const validateForm = () => {
    if (!badgeNumber || badgeNumber.length !== 8) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Badge number must be exactly 8 digits',
      });
      return false;
    }
    if (!partNumber || partNumber.length !== 8) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Part number must be exactly 8 digits.',
      })
      return false;
    }
    if (!dispostionData) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Please select a disposition',
      })
      return false;
    }
    return true;
  }

  // For handling the data from the forms and scanner
  const handleData = async() => {
    if (validateForm()) {
      var userInfo = null;

      try {
          userInfo = (await axios.get(`https://qrlxlcaja8.execute-api.us-east-1.amazonaws.com/Dev/api/User/GetUserName?username=${username}`)).data;
      } catch (error) {
        console.error(error);
        throw error;
      }

      if (userInfo.badgeId != badgeNumber) {
        Toast.show({
            type: 'error',
            text1: 'The Badge Id does not match',
        });
        return;
      }

      const data = {
        badgeId: badgeNumber,
        partNumber: partNumber,
        acceptOrReject: dispostionData,
        username: username
      }

      try {
        (await axios.post(`https://qrlxlcaja8.execute-api.us-east-1.amazonaws.com/Dev/PartInspection/InsertPart`, data));
      } catch (error) {
        console.error('There was an error inserting the data');
        throw error;
      }

      Toast.show({
        type: 'success',
        text1: 'Information Successfully inserted',
      });
      return;
    }
  }



  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }} >
        {scannerVisible ? (
          // Scans barcodes and inputs the data into handleScannedData
          <BarcodeScanner onBarcodeScanned={handleScannedData} scannerVisible={toggleVisibility} />
        ) : (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" >
                <View className="bg-white h-full w-full">
                    <StatusBar style="light"/>
                    <Animated.Image source={background} className="h-full w-full absolute" resizeMode={"cover"}/>
                        <View className="flex items-center mt-64">
                              <Animated.Text entering={FadeInDown.delay(200)} 
                              className="text-5xl text-black shadow-lg tracking-wide">Inspection Form</Animated.Text>
                        </View>

                        <View className="flex items-center mx-4 space-y-4 my-20">
                          <View className="flex flex-row items-center bg-gray-100 rounded-2xl border border-gray-300 p-3 mb-5">
                              <TouchableOpacity
                                  onPress={toggleVisibility}>
                                    <Image source={camera} className="w-8 h-8 mr-4"/>
                                  </TouchableOpacity>
                                  <TextInput
                                  className="flex-1 text-lg text-gray-400 mb-2"
                                  keyboardAppearance="dark"
                                  placeholder="Badge Number" 
                                  placeholderTextColor={'gray'}
                                  value={badgeNumber}
                                  secureTextEntry
                                  onChangeText={(value) => setBadgeNumber(value)}
                                  />
                            </View>
                            <View className="flex flex-row items-center bg-gray-100 rounded-2xl border border-gray-300 p-3 mb-5">
                                  <TextInput
                                  className="flex-1 text-lg text-gray-400 mb-2"
                                  keyboardAppearance="dark"
                                  placeholder="Part Number" 
                                  placeholderTextColor={'gray'} 
                                  value={partNumber}
                                  onChangeText={(value) => setPartNumber(value)}
                                  />
                            </View>

                            <View className="flex flex-row items-center bg-gray-100 rounded-2xl border border-gray-300 p-3 mb-3">
                                <DropdownPicker dispoValue={handleDisposition} items={itemsArray} />
                            </View>
                            <View className="w-full">
                                <TouchableOpacity className="w-full bg-sky-400 p-3 rounded-2xl mb-3" onPress={handleData}>
                                    <Text className="text-xl font-bold text-white text-center">Submit Entry</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
            </ScrollView>
            )}
          <Toast />
        </KeyboardAvoidingView>
    );
}

{/*<BarcodeScanner onBarcodeScanned={handleScannedData}/>*/}