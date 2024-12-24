import React, { useState, useMemo } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, FlatList, SafeAreaView, } from 'react-native';
import { Icon } from 'react-native-paper';
import { countries } from './constants';
const CountryPickerModal = ({ visible, onClose, onSelect }) => {
    const [searchText, setSearchText] = useState('');
    const filteredCountries = useMemo(() => {
        if (!searchText)
            return countries;
        return countries.filter((c) => c.name.toLowerCase().includes(searchText.toLowerCase()));
    }, [searchText]);
    const handleSelect = (country) => {
        onSelect(country);
        onClose();
    };
    return (React.createElement(Modal, { visible: visible, animationType: "slide", onRequestClose: onClose, transparent: true },
        React.createElement(SafeAreaView, { style: styles.overlay },
            React.createElement(View, { style: styles.container },
                React.createElement(View, { style: styles.header },
                    React.createElement(TouchableOpacity, { onPress: onClose },
                        React.createElement(Icon, { source: "close", size: 24, color: "#c4c4c4" })),
                    React.createElement(TextInput, { placeholder: "Enter country name", style: styles.searchInput, value: searchText, onChangeText: setSearchText })),
                React.createElement(FlatList, { data: filteredCountries, keyExtractor: (item) => item.code, renderItem: ({ item }) => {
                        var _a;
                        return (React.createElement(TouchableOpacity, { style: styles.countryRow, onPress: () => handleSelect(item) },
                            React.createElement(Text, { style: styles.flag }, (_a = item.emoji) !== null && _a !== void 0 ? _a : '🏳️'),
                            React.createElement(Text, { style: styles.countryName }, item.name),
                            item.dialCode && (React.createElement(Text, { style: styles.callingCode }, item.dialCode))));
                    } })))));
};
export default CountryPickerModal;
const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    container: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 16,
        flex: 1,
    },
    title: {
        fontWeight: '600',
        fontSize: 18,
        marginBottom: 8,
        textAlign: 'center',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    closeText: {
        color: '#141414',
        fontWeight: 'bold',
    },
    searchInput: {
        flex: 1,
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 22,
    },
    countryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    flag: {
        fontSize: 30,
        marginRight: 12,
    },
    countryName: {
        flex: 1,
        fontSize: 22,
    },
    callingCode: {
        marginLeft: 8,
        fontSize: 18,
        color: '#666',
    },
    closeButton: {
        marginTop: 12,
        alignSelf: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#007AFF',
        borderRadius: 4,
    },
});
