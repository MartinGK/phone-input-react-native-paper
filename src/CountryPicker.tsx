import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Country, CountryCode } from './types';
import { Icon } from 'react-native-paper';
import { countries } from './constants';
export { type CountryCode };
export type { Country };

export interface CountryPickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (country: Country) => void;
}

const CountryPickerModal: React.FC<CountryPickerProps> = ({ visible, onClose, onSelect }) => {
  const [searchText, setSearchText] = useState('');

  const filteredCountries = useMemo(() => {
    if (!searchText) return countries;
    return countries.filter((c) =>
      c.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  const handleSelect = (country: Country) => {
    onSelect(country);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent
    >
      <SafeAreaView style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Icon source="close" size={24} color="#c4c4c4" />
            </TouchableOpacity>
            <TextInput
              placeholder="Enter country name"
              style={styles.searchInput}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <FlatList
            data={filteredCountries}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.countryRow}
                onPress={() => handleSelect(item as Country)}
              >
                <Text style={styles.flag}>
                  {item.emoji ?? '🏳️'}
                  {/* fallback if no emoji found */}
                </Text>
                <Text style={styles.countryName}>{item.name}</Text>
                {item.dialCode && (
                  <Text style={styles.callingCode}>{item.dialCode}</Text>
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
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
