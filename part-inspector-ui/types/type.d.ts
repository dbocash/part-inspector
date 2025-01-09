import { TextInputProps, TouchableOpacityProps } from "react-native";
import DropdownPicker from '@/components/DropdownPicker';

declare interface InputFieldProps extends TextInputProps {
    label: string;
    icon?: any;
    secureTextEntry?: boolean;
    labelStyle?: string;
    containerStyle?: string;
    inputStyle?: string;
    iconStyle?: string;
    className?: string;
}

interface PickerItems {
    label: string;
    value: string;
}

interface FormData {
    id: number,
    username: string;
    partNumber: string;
    disposition: string;
}

declare interface BarcodeScannerProps {
    onBarcodeScanned: (data: {type: string; data: string}) => void;
    scannerVisible: () => void;
}

declare interface DropdownPickerProps {
    dispoValue: (value: string | null) => void;
    items: PickerItems[];
}