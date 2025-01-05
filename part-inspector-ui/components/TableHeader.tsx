import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TableHeader = () => (
    <View style={styles.header}>
        <Text style={styles.cell}>Name</Text>
        <Text style={styles.cell}>Email</Text>
        <Text style={styles.cell}>Phone</Text>
    </View>
);

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: '#f3f4f6',
        paddingVertical: 6,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3, // Shadow for Android
    },
    cell: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#374151', // Dark gray text
        textAlign: 'center',
        paddingHorizontal: 12,
    },
})

export default TableHeader;