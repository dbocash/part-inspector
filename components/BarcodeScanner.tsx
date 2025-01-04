import { BarcodeScannerProps } from "@/types/type";
import { Camera, CameraView } from "expo-camera";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BarCodeScanner: React.FC<BarcodeScannerProps> = ({ onBarcodeScanned, scannerVisible }) => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        };
        getCameraPermissions();
    }, []);

    const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
        setScanned(true);
        onBarcodeScanned({ type, data }); // Send data to parent component
    };

    if (hasPermission === null) {
        return (
            <View className='flex-1 justify-center items-center bg-gray-100'>
            <Text>Requesting for camera permission</Text>
            </View>
        );
    }

    if (hasPermission === false) {
        return (
            <View className='flex-1 justify-center items-center bg-gray-100'>
                <Text>No access to camera</Text>
            </View>
        );
    }

    return (
        <View className='static flex-1 items-center'>
            <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            barcodeScannerSettings={{
                barcodeTypes: ["qr", "code39"],
            }}
            style={StyleSheet.absoluteFillObject}
            />
            <TouchableOpacity
                onPress={() => scannerVisible()}
                className="bg-sky-400 rounded-2xl ml-5 mb-10"
                style={styles.button}
            >
                <Text className="text-white text-center font-semibold">Leave Scanner</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 40,  // Adjust to control the space from the bottom
        width: 250,  // Adjust width as needed
        paddingVertical: 12,  // Padding for the button
        backgroundColor: '#3b82f6',  // Tailwind blue
        borderRadius: 10,  // Rounded corners
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
});

export default BarCodeScanner;