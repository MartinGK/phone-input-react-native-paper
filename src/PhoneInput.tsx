import React, { useState, useCallback } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import CountryPicker, {
  type Country,
  type CountryCode,
  type CountryPickerProps,
} from './CountryPicker';

import { AsYouType, type CountryCode as LibPhoneNumberCountryCode } from 'libphonenumber-js';
import { countries } from './constants';

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

const PhoneInput: React.FC<PhoneInputProps> = ({
  inputLabel = 'Phone number',
  countryPickerLabel = 'Country',
  inputPlaceholder = 'Phone number',
  defaultCountry = 'US',
  value = '',
  inputStyle,
  onChangePhone,
  withLabels = true,
}) => {
  const theme = useTheme();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(countries.find(country => country.code === defaultCountry) || null);
  const [phoneNumber, setPhoneNumber] = useState(value);
  const [visible, setVisible] = useState(false);

  const handleFormatPhone = useCallback(
    (raw: string) => {
      const formatter = new AsYouType(selectedCountry?.dialCode as LibPhoneNumberCountryCode);
      const formatted = formatter.input(raw);
      return formatted;
    },
    [selectedCountry]
  );

  const onSelect = useCallback((country: Country) => {
    setSelectedCountry(country);
    setVisible(false);
  }, []);

  const handleChangeText = (text: string) => {
    const formatted = handleFormatPhone(text);
    setPhoneNumber(formatted);
    if (onChangePhone) {
      onChangePhone(formatted);
    }
  };

  return (
    <View style={styles.container}>
      <CountryPicker
        visible={visible}
        onClose={() => setVisible(false)}
        onSelect={onSelect}
      />
      <View style={styles.row}>
        <TextInput
          mode="outlined"
          label={withLabels ? countryPickerLabel : undefined}
          value={`${selectedCountry?.emoji || ''} ${selectedCountry?.code || ''}`}
          style={[styles.countryInput, { marginRight: 8 }]}
          onFocus={() => setVisible(true)}
          right={
            <TextInput.Icon
              icon="chevron-down"
              onPress={() => setVisible(true)}
            />
          }
        />
        <TextInput
          mode="outlined"
          label={withLabels ? inputLabel : undefined}
          placeholder={inputPlaceholder}
          value={phoneNumber}
          style={[styles.phoneInput, { flex: 1 }, inputStyle]}
          onChangeText={handleChangeText}
          keyboardType="phone-pad"
          selectionColor={theme.colors.primary}
          left={<TextInput.Affix text={`${selectedCountry?.dialCode}`} />}
        />
      </View>
    </View>
  );
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
