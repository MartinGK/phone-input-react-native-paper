import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { type CountryCode } from './CountryPicker';
interface PhoneInputProps {
    inputLabel?: string;
    defaultCountry?: CountryCode;
    value?: string;
    onChangePhone?: (phone: string) => void;
    inputStyle?: StyleProp<TextStyle>;
    countryPickerLabel?: string;
    inputPlaceholder?: string;
    withLabels?: boolean;
}
declare const PhoneInput: React.FC<PhoneInputProps>;
export default PhoneInput;
//# sourceMappingURL=PhoneInput.d.ts.map