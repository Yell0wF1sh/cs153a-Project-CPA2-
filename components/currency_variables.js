export const currencyInfo = [
    {
        currencyName: "Chinese Yuan",
        currencySymbol: "￥",
        currencyImage: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
        historyTitle: 'cny',

    },
    {
        currencyName: "US Dollar",
        currencySymbol: "$",
        currencyImage: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg',
        historyTitle: 'usd',
    },
    {
        currencyName: 'Japanese Yen',
        currencySymbol: '¥',
        currencyImage: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg',
        historyTitle: 'jpy',
    },
    {
        currencyName: 'Euro',
        currencySymbol: '€',
        currencyImage: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg',
        historyTitle: 'eur',
    },
    {
        currencyName: 'British Pound',
        currencySymbol: '£',
        currencyImage: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg',
        historyTitle: 'gbp',
    },
    {
        currencyName: 'South Korean Won',
        currencySymbol: '₩',
        currencyImage: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg',
        historyTitle: 'krw',
    },
    {
        currencyName: 'Canadian Dollar',
        currencySymbol: '$',
        currencyImage: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg',
        historyTitle: 'cad',
    },
    {
        currencyName: 'Argentine Peso',
        currencySymbol: '$',
        currencyImage: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg',
        historyTitle: 'ars',
    },
    {
        currencyName: 'Australian Dollar',
        currencySymbol: '$',
        currencyImage: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg',
        historyTitle: 'aud',
    },
    {
        currencyName: 'Russian Ruble',
        currencySymbol: '₽',
        currencyImage: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg',
        historyTitle: 'rub',
    },
]

export const findCurrency = (value) => {
    for (let i = 0; i < currencyInfo.length; i++) {
        if (value == currencyInfo[i].currencyName) {
            return i
        }
    }
}