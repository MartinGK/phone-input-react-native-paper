import { Country, CountryCode } from './types';
import countriesData from './data/countries.json';

export const countries: Country[] = countriesData.map((country) => ({
    name: country.name,
    dialCode: country.dialCode,
    code: country.code as CountryCode,
    emoji: country.emoji,
}));
