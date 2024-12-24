import React from 'react';
import { Country, CountryCode } from './types';
export { type CountryCode };
export type { Country };
export interface CountryPickerProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (country: Country) => void;
}
declare const CountryPickerModal: React.FC<CountryPickerProps>;
export default CountryPickerModal;
//# sourceMappingURL=CountryPicker.d.ts.map