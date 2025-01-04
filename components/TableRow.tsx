import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type TableRowProps = {
    item: {name: string; age: number; city: string };
};

const TableRow: React.FC<TableRowProps> = ({ item }) => (
    <View style={styles.row}>
        <Text style={styles.cell}>{item.name}</Text>
        <Text style={styles.cell}>{item.age}</Text>
        <Text style={styles.cell}>{item.city}</Text>
    </View>
);

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        overflow: 'hidden', // Ensures content doesn't overflow
        marginBottom: 8,
        elevation: 2, // Adds shadow for Android
        shadowColor: '#000', // Adds shadow for iOS
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    }, 
    cell: {
        flex: 1,
        padding: 12,
        textAlign: 'center',
        borderRightWidth: 2,
        borderLeftWidth: 2,
        borderColor: '#2a1441', // Light gray borders\
    }
})

export default TableRow;