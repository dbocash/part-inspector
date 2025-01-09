import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, FlatList, Image, ActivityIndicator} from 'react-native';
import TableHeader from '@/components/TableHeader';
import TableRow from '@/components/TableRow';
import background from "@/assets/images/form-back.jpg"
import axios from 'axios';
import { FormData, PickerItems } from '@/types/type';
import { useIsFocused } from '@react-navigation/native';

const Table = () => {
    // Sample data for the table
    // Need to have the id be unique so that we have a key
    // const formData: FormData[] = [];
    const [formData, setFormData] = useState<FormData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // So that we can reload when the page is refocused
    const isFocused = useIsFocused();

    //Gathers the data from the API
    const gatherData = async() => {
        try {
            const userInfo = (await axios.get(`https://qrlxlcaja8.execute-api.us-east-1.amazonaws.com/Dev/PartInspection/GetAllParts`)).data;
    
            const newFormData = userInfo.map(info => ({
                    id: info.id,
                    username: info.username,
                    partNumber: info.partNumber,
                    disposition: info.acceptOrReject,
            }));

            setFormData((prevFormData) => [...prevFormData, ...newFormData]);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
            throw error;
        }
    }

    useEffect(() => {
        if (isFocused) {
            setFormData([]);
            setLoading(true);
            gatherData();
        }
    }, [isFocused]);
    
    // Renders each of the rows that are used in the FlatList's
    const renderRow = ({ item }: { item: FormData }) => (
        <TableRow key={item.id} item={item} />
    );

    return (
        <View>
            { //Waits for the form to load the api data 
            loading ? (
                <ActivityIndicator size="large" color={"#0000ff"} className='mt-20' />
            ) : (
                <>
                    <Image source={background} className="h-full w-full absolute" resizeMode={"cover"} />
                    <Text className='text-4xl font-bold text-center text-blue-500 mb-4 mt-32 shadow-lg'>User Table</Text>
                    
                    <View className='border-8 border-indigo-900/50 rounded-2xl border max-h-[65vh]'>
                            {/* Table Header */}
                        <TableHeader />
                            <View className='max-h-[60vh]'>
                                {formData.length > 0 ? (
                                    <FlatList 
                                        data={formData}
                                        renderItem={renderRow}
                                        keyExtractor={(item) => item.id}
                                        className='mt-2'
                                        contentContainerClassName='flex-grow'
                                        keyboardShouldPersistTaps='handled'
                                    />
                                ) : (
                                    <View>
                                        <Text className='text-center text-red-500 mt-4'>No data available</Text>
                                    </View>
                                )}
                            </View>
                    </View>
                </>
            )}
        </View>
    );
}

export default Table;