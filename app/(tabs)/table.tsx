import React from 'react';
import { ScrollView, Text, View, FlatList, StyleSheet, Platform } from 'react-native';
import TableHeader from '@/components/TableHeader';
import TableRow from '@/components/TableRow';

// Sample data for the table
// Need to have the id be unique so that we have a key
const data = [
    { id: '1', name: 'John Doe', age: 28, city: 'New York' },
    { id: '2', name: 'Jane Smith', age: 34, city: 'Los Angeles' },
    { id: '3', name: 'Sam Johnson', age: 22, city: 'Chicago' },
    { id: '4', name: 'Alice Brown', age: 30, city: 'San Francisco' },
    { id: '5', name: 'Bob White', age: 41, city: 'Miami' },
    { id: '6', name: 'Bob White', age: 41, city: 'Miami' },
    { id: '7', name: 'Bob White', age: 41, city: 'Miami' },
    { id: '8', name: 'Bob White', age: 41, city: 'Miami' },
    { id: '9', name: 'Bob White', age: 41, city: 'Miami' },
    { id: '10', name: 'Bob White', age: 41, city: 'Miami' },
    { id: '11', name: 'Bob White', age: 41, city: 'Miami' },
    { id: '12', name: 'Bob White', age: 41, city: 'Miami' },
    { id: '13', name: 'Bob White', age: 41, city: 'Miami' },
    { id: '14', name: 'Bob White', age: 41, city: 'Miami' },
    { id: '15', name: 'Bob White', age: 41, city: 'Miami' },
    { id: '16', name: 'Bob White', age: 41, city: 'Miami' },
  // Add more rows as needed
];

const renderRow = ({ item}: { item: { id: string; name: string; age: number; city: string }}) => (
    <TableRow key={item.id} item={item} />
);

const Table = () => {
    return (
        <View>
            <Text className='text-4xl font-bold text-center text-blue-500 mb-4 mt-32 shadow-lg'>User Table</Text>
            
            <View className='border-8 border-indigo-900/50 rounded-2xl border max-h-[71vh]'>
                    {/* Table Header */}
                <TableHeader />
                <ScrollView contentContainerClassName='flex-grow'
                keyboardShouldPersistTaps="handled">
                    <View>
                        {/* Display the hardcoded data */}
                        {data.length > 0 ? (
                            <FlatList 
                                data={data}
                                renderItem={renderRow}
                                keyExtractor={(item) => item.id}
                                className='mt-2'
                            />
                        ) : (
                            <Text className='text-center text-red-500 mt-4'>No data available</Text>
                        )}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default Table;