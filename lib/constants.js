import countriesData from './data/countries.json';
export const countries = countriesData.map((country) => ({
    name: country.name,
    dialCode: country.dialCode,
    code: country.code,
    emoji: country.emoji,
}));
