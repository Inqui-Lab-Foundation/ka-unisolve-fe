export const languageOptions = [
    {
        code: 'en',
        name: 'English',
        country_code: 'in'
    },

    // {
    //     code: 'ta',
    //     name: 'Tamil',
    //     country_code: 'in'
    // },
    // {
    //     code: 'hi',
    //     name: 'Hindi',
    //     country_code: 'in'
    // },
    {
        code: 'tn',
        name: 'ಕನ್ನಡ',
        country_code: 'in'
    },
    
];

export const getLanguage = (lang)=>{
    return `locale=${lang?.code}`;
};