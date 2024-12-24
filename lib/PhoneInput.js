import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import CountryPicker from './CountryPicker';
import { AsYouType } from 'libphonenumber-js';
import { countries } from './constants';
const PhoneInput = ({ inputLabel = 'Phone number', countryPickerLabel = 'Country', inputPlaceholder = 'Phone number', defaultCountry = 'US', value = '', inputStyle, onChangePhone, withLabels = true, }) => {
    const theme = useTheme();
    const [selectedCountry, setSelectedCountry] = useState(countries.find(country => country.code === defaultCountry) || null);
    const [phoneNumber, setPhoneNumber] = useState(value);
    const [visible, setVisible] = useState(false);
    const handleFormatPhone = useCallback((raw) => {
        const formatter = new AsYouType(selectedCountry === null || selectedCountry === void 0 ? void 0 : selectedCountry.dialCode);
        const formatted = formatter.input(raw);
        return formatted;
    }, [selectedCountry]);
    const onSelect = useCallback((country) => {
        setSelectedCountry(country);
        setVisible(false);
    }, []);
    const handleChangeText = (text) => {
        const formatted = handleFormatPhone(text);
        setPhoneNumber(formatted);
        if (onChangePhone) {
            onChangePhone(formatted);
        }
    };
    return (React.createElement(View, { style: styles.container },
        React.createElement(CountryPicker, { visible: visible, onClose: () => setVisible(false), onSelect: onSelect }),
        React.createElement(View, { style: styles.row },
            React.createElement(TextInput, { mode: "outlined", label: withLabels ? countryPickerLabel : undefined, value: `${(selectedCountry === null || selectedCountry === void 0 ? void 0 : selectedCountry.emoji) || ''} ${(selectedCountry === null || selectedCountry === void 0 ? void 0 : selectedCountry.code) || ''}`, style: [styles.countryInput, { marginRight: 8 }], onFocus: () => setVisible(true), right: React.createElement(TextInput.Icon, { icon: "chevron-down", onPress: () => setVisible(true) }) }),
            React.createElement(TextInput, { mode: "outlined", label: withLabels ? inputLabel : undefined, placeholder: inputPlaceholder, value: phoneNumber, style: [styles.phoneInput, { flex: 1 }, inputStyle], onChangeText: handleChangeText, keyboardType: "phone-pad", selectionColor: theme.colors.primary, left: React.createElement(TextInput.Affix, { text: `${selectedCountry === null || selectedCountry === void 0 ? void 0 : selectedCountry.dialCode}` }) }))));
};
const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    countryInput: {
        width: 100,
    },
    phoneInput: {
        flex: 1,
        minWidth: 200,
    },
});
export default PhoneInput;
