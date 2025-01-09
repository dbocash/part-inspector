import { FormData } from '@/types/type';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type TableRowProps = {
    item: FormData;
};

const TableRow: React.FC<TableRowProps> = ({ item }) => (
    <View style={styles.row}>
        <Text style={styles.cell}>{item.username}</Text>
        <Text style={styles.cell}>{item.partNumber}</Text>
        <Text style={styles.dispoCell}>{item.disposition}</Text>
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
        fontWeight: '500'
    }, 
    cell: {
        flex: 1,
        padding: 12,
        textAlign: 'center',
        borderRightWidth: 2,
        borderLeftWidth: 2,
        borderColor: '#2a1441', // Light gray borders\
        fontWeight: '500'
    }, 
    dispoCell: {
        textTransform: 'uppercase',
        fontWeight: '500',
        flex: 1,
        padding: 12,
        textAlign: 'center',
        borderRightWidth: 2,
        borderLeftWidth: 2,
        borderColor: '#2a1441', // Light gray borders\
    }
})

export default TableRow;