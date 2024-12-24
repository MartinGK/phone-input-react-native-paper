import { PaperProvider } from 'react-native-paper';
// import { PhoneInput } from 'phone-input-react-native-paper';
import PhoneInput from './src/PhoneInput';
import { View } from 'react-native';

export default function App() {
  return (
    <PaperProvider>
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 30 }}>
            <PhoneInput
                defaultCountry="AR"
                inputPlaceholder="Phone number"
                onChangePhone={(phone: string) => console.log(phone)}
                withLabels={false}
            />
        </View>
    </PaperProvider>
  );
}
