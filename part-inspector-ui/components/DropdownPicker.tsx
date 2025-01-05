import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import { DropdownPickerProps } from "@/types/type";

const DropdownPicker: React.FC<DropdownPickerProps> = ({dispoValue}) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(null);
    const [items, setItems] = useState([
        {label: 'Accept', value: 'accept'},
        {label: 'Reject', value: 'reject'}
    ]);

    return (
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            onChangeValue={(value) => {
                setValue(value); // Update local state
                dispoValue(value); //Pass the value back to the parent
            }}
            setItems={setItems}
        />
    );
}

export default DropdownPicker;